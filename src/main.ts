import { createApp } from 'vue'
import { createBounceFixer } from '@varlet/bounce-fixer'
import dayjs from 'dayjs'
import { setupAppHeight } from '@/utils'
import App from './App.vue'
import { setupDesktopInMobile } from './composables/useDesktop'
import '@/styles/common.css'
import '@varlet/touch-emulator'
// import 'virtual:uno.css'
import 'virtual-icons'
import { setupStore } from './stores'
// import { convexVue } from 'convex-vue'

setupDesktopInMobile()
setupAppHeight()
createBounceFixer().enable()

const app = createApp(App)
// app.use(convexVue, {
//   url: 'http://127.0.0.1:3210'
// })

app.config.globalProperties.$dayjs = dayjs

// app.use(router).use(i18n).use(createPinia()).mount('#app')

async function start() {
    const app = createApp(App)
    await setupStore(app)
    // Install Pinia and Router BEFORE mounting so components using stores can render
    let piniaInstalled = false
    try {
        const [{ default: router }] = await Promise.all([
            // import('./stores'),
            import('./router'),
        ])
        // app.use(piniaPlugin)
        app.use(router)
        piniaInstalled = true
    } catch (e) {
        console.error('Failed to install core plugins (pinia/router):', e)
    }

    // Set GlobalLoading splash flag BEFORE mounting (ensures overlay is visible on hard refresh)
    try {
        if (piniaInstalled) {
            const { useAppStore } = await import('./stores/app.store')
            const appStore = useAppStore()
            appStore.globalLoading = true

            // Initialize device info early (non-blocking) and persist to localStorage
            // We call loadDeviceFromStorage first to have something available synchronously.
            appStore.loadDeviceFromStorage()
            // Fire and forget; do not block mount
            appStore.initDeviceInfo().catch((err: unknown) => {
                console.error('device info init failed', err)
            })
        }
    } catch (e) {
        console.error('Failed to prime global loading flag before mount:', e)
    }

    // Register performance tracking directive
    // registerPerformanceDirective(app)
app.mount('#app')

}
// Mount ASAP after core plugins


start()
// psql postgresql://user:asdfasdf@localhost:5439/cashinin -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';" -t | while read table; do echo "Exporting $table..."; psql postgresql://user:asdfasdf@localhost:5439/fuckzero -c "COPY (SELECT row_to_json(t) FROM $table t) TO STDOUT;" > "${table}.jsonl"; done