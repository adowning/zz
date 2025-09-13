<!-- src/components/GameHost.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps, defineEmits, defineExpose } from 'vue'
import GameLauncher from '@/services/GameLauncher'
import Header from '@/components/Header.vue'
import VHeader from '@/components/games/VHeader.vue'
import { BalanceChangeMessage } from '@/composables/useEventManager'
const appStore = useAppStore()
const eventBus = useEventManager()
const portrait = ref(false)
// --- Props and Emits ---
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'messageFromGame', data: Record<string, unknown>): void;
}>()

const showTopBar = ref(false)

// --- Type Definitions for Props and Emits ---
interface Props {
  launchOptions: {
    gameName: string;
    gameConfig?: {
      authToken?: string;
      gameSessionId?: string;
      userId?: string;
      [key: string]: string | number | boolean | undefined;
    };
    [key: string]: unknown;
  };
}

// --- State ---
const gameContainer = ref<HTMLElement | null>(null)
let launcher: GameLauncher | null = null // Store the launcher instance

// --- Methods ---
function handleMessageFromGame(data: any | string) {
  const authStore = useAuthStore()
  console.log('Message received from iframe:', data)
  if (data === 'gameEnabled') {
    showTopBar.value = true
  }
  // *** NEW LOGIC: HANDSHAKE ***
  // When the loader is ready, send the auth token back to it.
  if (data === 'RTG_LOADER_READY' || data === 'NLC_LOADER_READY') {
    console.log('dropping showtopbar')
    if (data === 'NLC_LOADER_READY') { showTopBar.value = true }
    console.log(props.launchOptions.gameConfig)
    const gameConfig = props.launchOptions.gameConfig
    if (launcher && gameConfig) {
      const authPayload = {
        type: 'SET_AUTH_TOKEN',
        token: authStore.getAccessToken,
        gameSessionId: gameConfig.gameSessionId,
        userId: gameConfig.userId,
      }
      console.log('Sending SET_AUTH_TOKEN to iframe:', authPayload)

      launcher.sendMessage(authPayload)
    } else {
      console.log(
        'GameHost: Launcher not initialized or gameConfig missing in launchOptions.'
      )
    }
  }
  if (data === 'NLC_LOADED') { return showTopBar.value = true }
  if (typeof data !== 'string') {
    data = data as unknown as BalanceChangeMessage
    // console.log('here')
    // // const parsedData = JSON.parse(data)
    // if (data.event === 'balance') {
    //   const tranStore = useTransactionStore()
    //   console.log('Setting balance from game message:', data)
    //   tranStore.setBalance(data as number)
    // }
    console.log('here')
    if (data.type === 'balanceChange') {
      eventBus.emit('balanceChange', data as unknown as BalanceChangeMessage)
      const tranStore = useTransactionStore()
      //   console.log('Setting balance from game message:', data)
      tranStore.setBalance(data.newBalance)
    }
  }
  // Emit all other messages to the parent component
  emit('messageFromGame', { data })
}

// --- Lifecycle Hooks ---
onMounted(() => {
  if (gameContainer.value) {
    launcher = new GameLauncher(gameContainer.value, {
      onMessage: handleMessageFromGame,
    })

    // Ensure we send SET_AUTH_TOKEN regardless of loader ready timing.
    // 1) Proactively send INIT_GAME immediately (contains authToken via props.launchOptions.launch_options)
    try {
      const cfg = (props.launchOptions as any)?.launch_options ?? {}
      if (launcher && Object.keys(cfg).length > 0) {
        launcher.sendMessage({
          type: 'INIT_GAME',
          config: cfg,
        })
      }
    } catch (e) {
      console.warn('[GameLoader] proactive INIT_GAME send failed', e)
    }

    // 2) Also attach a short-lived retry to send SET_AUTH_TOKEN after a brief delay,
    // in case loader did not yet finish initializing postMessage listeners.
    try {
      const cfg = (props.launchOptions as any)?.launch_options ?? {}
      const payload =
        cfg?.authToken || cfg?.token
          ? {
            type: 'SET_AUTH_TOKEN',
            token: cfg.authToken ?? cfg.token,
            gameName: cfg.gameName,
            gameSessionId: cfg.gameSessionId,
            userId: cfg.userId,
          }
          : null

      if (payload && launcher) {
        // send once after 200ms
        setTimeout(() => {
          try {
            launcher?.sendMessage(payload)
          } catch { }
        }, 200)
        // send again after 1000ms as a backup
        setTimeout(() => {
          try {
            launcher?.sendMessage(payload)
          } catch { }
        }, 1000)
      }
    } catch (e) {
      console.warn('[GameLoader] proactive SET_AUTH_TOKEN send failed', e)
    }

    console.log(props.launchOptions)
    launcher.launch(props.launchOptions)
  }
})

onUnmounted(() => {
  if (launcher) {
    launcher.destroy()
  }
  appStore.hideLoading()

})

// Expose the sendMessage method so the parent component can call it
defineExpose({
  sendMessage: (message: Record<string, unknown>) => {
    launcher?.sendMessage(message)
  },
})
</script>

<template>
  <!-- Fixed header overlays the game (no spacer).
       Ensure it can receive clicks even when iframe underneath tries to capture input. -->
  <component :is="Header" v-if="showTopBar && portrait"
    class="fixed inset-x-0 top-0 z-[10000] pointer-events-auto will-change-transform"
    style="transform: translateZ(0); -webkit-transform: translateZ(0)" />
  <component :is="VHeader" v-if="showTopBar && !portrait"
    class="fixed  top-0 right-0 z-[10000] pointer-events-auto will-change-transform"
    style="transform: translateZ(0); -webkit-transform: translateZ(0)" />
  <!-- Game container kept below header and explicitly lower in stacking -->
  <div ref="gameContainer" class="game-host-container">
    <!--
      The GameLauncher will inject both the loading indicator and the iframe here.
      No extra template code is needed for the loader.
    -->
  </div>
</template>

<style scoped>
.game-host-container {
  width: 100%;
  height: 100vh;
  position: relative;
  /* keep stacking context local */
  z-index: 1;
  /* below header (z 10000) so header overlays */
  overflow: hidden;
}

/* Ensure header overlays even if vendor sets transforms that create new stacking contexts */
:host,
:root,
body,
#app {
  isolation: auto;
}

/* If vendor injects full-viewport overlays, keep them below header */
.game-host-container :is(.overlay, .fullscreen, .mask, .loader, .backdrop, [data-overlay], [data-fullscreen]) {
  z-index: 10 !important;
  /* Header is z 10000 */
}

/* Normalize any injected iframe/canvas stacking */
.game-host-container :is(iframe, canvas) {
  position: relative;
  z-index: 0 !important;
  pointer-events: auto;
  /* When settings modal is open, we will temporarily disable pointer events on the iframe via a body class */
}

/* Guard against vendor full-screen overlays eclipsing the header */
.game-host-container :is(.overlay, .fullscreen, .mask, .loader, .backdrop) {
  z-index: 10 !important;
}

/* When settings is open (HomeView toggles class on body), block iframe from eating clicks */
:global(body.settings-open) .game-host-container iframe {
  pointer-events: none !important;
}

/* Optional: create a click shield under the Header (but above iframe) during settings to ensure consistent UX */
:global(body.settings-open) .game-host-container::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 20;
  /* below Header (10000) but above iframe(0) and vendor overlays(10) */
  pointer-events: auto;
  background: transparent;
  /* invisible shield */
}
</style>
