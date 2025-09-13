 
// src/services/GameLauncher.ts

// --- Type Definitions ---
/*
window.addEventListener('load', () => {
  window.parent.postMessage({ type: 'clientReady' }, '*'); // Use a specific origin in production
});
*/
/**
 * Defines the structure for the launch options object.
 */
interface LaunchOptions {
    gameName: string,
    launch_url?: string
    target_element?: string
    launch_options?: {
        game_launcher_url?: string
        [key: string]: string | number | boolean | undefined
    }
    [key: string]: unknown
}

/**
 * Defines the options that can be passed to the GameLauncher constructor.
 */
interface GameLauncherConstructorOptions {
    onMessage?: (data: Record<string, unknown>) => void
    [key: string]: unknown
}

/**
 * @class GameLauncher
 * @description Manages the creation, loading, and communication for a game iframe.
 */
class GameLauncher {
    // --- Public and Private Properties ---
    public iframe: HTMLIFrameElement | null = null
    public targetContainer: HTMLElement

    private iframeAttributes: Record<string, string | string[]> = {
        frameBorder: '0',
        allow: 'autoplay',
        
        scroll: 'false',
        height: '100%',
        width: '100%',
        style: 'border: none; z-index: 9991',
    }

    private targetOrigin: string = ''
    private onMessageCallback:
        | ((data: Record<string, unknown>) => void)
        | undefined

    private messageListener: ((event: MessageEvent) => void) | null = null
    private loadingIndicator: HTMLElement | null = null
    private launchOptions: LaunchOptions | null = null // Store launch options
    private vueApp: any = null // Store Vue app instance for cleanup

    /**
     * Creates an instance of GameLauncher.
     * @param target The DOM element or its ID where the iframe will be injected.
     * @param options Configuration options including message callbacks and custom iframe attributes.
     */
    constructor(
        target: HTMLElement | string,
        options: GameLauncherConstructorOptions = {}
    ) {
        const { onMessage, ...customIframeAttributes } = options
        this.iframeAttributes = {
            ...this.iframeAttributes,
            ...(customIframeAttributes as Record<string, string>),
        }
        this.onMessageCallback = onMessage

        if (typeof target === 'string') {
            const element = document.getElementById(target)
            if (!element) {
                throw new Error(
                    `GameLauncher error: Could not find target container with ID "${target}".`
                )
            }
            this.targetContainer = element
        } else {
            this.targetContainer = target
        }
    }

    // --- Loading Indicator Methods ---

    /**
     * Displays the loading indicator over the target container using Vue SpriteAnimator component.
     * @private
     */
    private async showLoadingIndicator(): Promise<void> {
        if (this.loadingIndicator) {return}

        // Ensure the target container can host an absolutely positioned element
        if (getComputedStyle(this.targetContainer).position === 'static') {
            this.targetContainer.style.position = 'relative'
        }

        // Create container for the Vue component
        this.loadingIndicator = document.createElement('div')
        this.loadingIndicator.style.position = 'absolute'
        this.loadingIndicator.style.top = '0'
        this.loadingIndicator.style.left = '0'
        this.loadingIndicator.style.width = '100%'
        this.loadingIndicator.style.height = '100vh'
        this.loadingIndicator.style.display = 'flex'
        this.loadingIndicator.style.justifyContent = 'center'
        this.loadingIndicator.style.alignItems = 'center'
        this.loadingIndicator.style.backgroundColor = 'transparent'
        this.loadingIndicator.style.zIndex = '9992'

        // Dynamically import Vue and SpriteAnimator
        try {
            const [{ createApp }, SpriteAnimator] = await Promise.all([
                import('vue'),
                import('../components/SpriteAnimator.vue')
            ])

            // Create and mount Vue app with SpriteAnimator component
            this.vueApp = createApp(SpriteAnimator.default, {
                imageUrl: 'logo_shine_sheet',
                width: 80,
                height: 80,
                initialDelay: 5,
                loopDelay: 7
            })

            this.vueApp.mount(this.loadingIndicator)
            this.targetContainer.appendChild(this.loadingIndicator)
        } catch (error) {
            console.error('Failed to load SpriteAnimator component:', error)
            // Fallback to simple loading text
            this.loadingIndicator.innerHTML = '<div style="color: white; font-size: 16px;">Loading...</div>'
            this.targetContainer.appendChild(this.loadingIndicator)
        }
    }

    /**
     * Hides and removes the loading indicator, properly unmounting Vue app.
     * @private
     */
    private hideLoadingIndicator(): void {
        if (this.loadingIndicator) {
            // Unmount Vue app if it exists
            if (this.vueApp) {
                this.vueApp.unmount()
                this.vueApp = null
            }

            this.loadingIndicator.remove()
            this.loadingIndicator = null
        }
    }

    // --- Core Methods ---

    private createIframe(): HTMLIFrameElement {
        const iframe = document.createElement('iframe')
        for (const [key, value] of Object.entries(this.iframeAttributes)) {
            iframe.setAttribute(key, value)
        }
        return iframe
    }

    private buildUrl(options: LaunchOptions, gameName: string): URL {
        const gameLauncherUrl = options.launch_options?.game_launcher_url
        const launchUrl = options.launch_url
        console.log(options)
        if (!gameLauncherUrl && !launchUrl) {
            throw new Error(
                'GameLauncher error: game_launcher_url or launch_url must be set.'
            )
        }
        if (gameLauncherUrl && launchUrl) {
            throw new Error(
                'GameLauncher error: Both game_launcher_url and launch_url are set. Only one is allowed.'
            )
        }

        const urlString = gameLauncherUrl || launchUrl!
        const url = new URL(urlString, window.location.origin)
        this.targetOrigin = url.origin
        console.log(launchUrl)
        console.log(gameLauncherUrl)
        if (gameLauncherUrl) {
            const encodedOptions = btoa(
                unescape(encodeURIComponent(JSON.stringify(options)))
            )
            url.searchParams.append('options', encodedOptions)
            url.searchParams.append('gameName', gameName)
        }
        return url
    }

    public sendMessage(message: Record<string, unknown>): void {
        if (this.iframe?.contentWindow) {
            // FIX: Convert the message to a plain object to remove Vue proxies,
            // which cannot be cloned for postMessage.
            const plainMessage = JSON.parse(JSON.stringify(message))
            this.iframe.contentWindow.postMessage(
                plainMessage,
                this.targetOrigin || '*'
            )
        } else {
            console.warn('GameLauncher: Iframe not available to send message.')
        }
    }

    private setupMessageListener(): void {
        this.messageListener = (event: MessageEvent) => {
            // Basic security checks
            if (event.source !== this.iframe?.contentWindow) {
                return
            }
            if (event.data === 'NLC_LOADED') {this.hideLoadingIndicator()}

            // When the loader is ready, send it the game config
            if (event.data === 'RTG_LOADER_READY' || event.data === 'NLC_LOADER_READY') {
                this.hideLoadingIndicator()
                if (this.launchOptions && this.launchOptions.launch_options) {
                    this.sendMessage({
                        type: 'INIT_GAME',
                        config: this.launchOptions.launch_options,
                    })
                } else {
                    console.error(
                        'GameLauncher Error: Received ready signal, but no gameConfig is available.'
                    )
                }
            }

            // Forward all messages to the main callback
            this.onMessageCallback?.(event.data)
        }
        window.addEventListener('message', this.messageListener)
    }

    public destroy(): void {
        this.hideLoadingIndicator() // Ensure loader is removed on destroy
        if (this.messageListener) {
            window.removeEventListener('message', this.messageListener)
            this.messageListener = null
        }
        if (this.targetContainer) {
            this.targetContainer.innerHTML = ''
        }
        console.log('GameLauncher instance destroyed.')
    }

    public async run(
        launchOptions: LaunchOptions | string,
        onSuccess?: () => void,
        onError: (error: Error) => void = (error) => {
            throw error
        }
    ): Promise<void> {
        try {
            await this.showLoadingIndicator() // Show loader at the start of the launch process

            let options: LaunchOptions

            if (typeof launchOptions === 'string') {
                options = JSON.parse(launchOptions)
            } else {
                options = launchOptions
            }
            console.log(options)
            this.launchOptions = options // Store the options

            // Normalize input so buildUrl always receives a LaunchOptions object
            // with either launch_url or launch_options.game_launcher_url set.
            if (!options.launch_url && !options.launch_options) {
                // Treat plain object as launch_options payload (legacy shape)
                options = { launch_options: options as any, gameName: options.gameName }
            }

            // If caller provided only launch_options without game_launcher_url but with a top-level launch_url,
            // promote that URL into launch_options.game_launcher_url so buildUrl passes validation.
            if (options.launch_url && options.launch_options && !options.launch_options.game_launcher_url) {
                options.launch_options.game_launcher_url = options.launch_url as string
            }

            // If caller provided only launch_options with game_launcher_url, ensure launch_url is unset to avoid "both set" error.
            if (options.launch_options?.game_launcher_url && options.launch_url) {
                // Prefer game_launcher_url path, which encodes full options into URL param
                delete (options as any).launch_url
            }

            const url = this.buildUrl(options, options.gameName.replace('RTG', ''))

            if (!this.iframe) {
                this.iframe = this.createIframe()
            }
            console.log(url.toString())
            this.iframe.src = url.toString()

            if (!this.targetContainer.contains(this.iframe)) {
                this.targetContainer.innerHTML = '' // Clear container before adding
                this.targetContainer.appendChild(this.iframe)
                this.targetContainer.appendChild(this.loadingIndicator!) // Re-append loader on top
            }

            this.setupMessageListener()
            onSuccess?.()
        } catch (error) {
            this.hideLoadingIndicator() // Hide loader on error
            onError(error as Error)
        }
    }

    public launch = this.run
}

export default GameLauncher
