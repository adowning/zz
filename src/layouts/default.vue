<script setup lang="ts">
import { ref, watch } from 'vue'
import StarField from './starfield.vue'


const eventManager = useEventManager()

const {  route } = useAppRouter()
const active = ref()
const settingsModal = ref(false)
const isSettingsOpen = computed(() => settingsModal.value)

function setSettingsOpen(v: unknown) {
  settingsModal.value = v === true
  if (typeof document !== 'undefined') {
    document.body.classList.toggle('settings-open', settingsModal.value === true)
  }
}
eventManager.on('settingsModal', handleSettingsModal)
function handleSettingsModal(value: unknown): void {
  setSettingsOpen(value)
}
watch(
  () => route.path,
  (newValue) => {
    active.value = newValue
  },
  { immediate: true },
)


</script>

<template>
  <div class="h-[var(--app-height)] overflow-y-aut0 overflow-x-hidden  pb-[51px] onacona">
    <StarField class="starField absolute top-0 left-0 w-full h-full" />
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <Header />
    <div safe-area fixed class="bottomNav bg-transparent items-end" style="background: transaparent !important">
      <Footer />
    <SettingsView v-if="isSettingsOpen" v-model="settingsModal" />

    </div>
  </div>
</template>
<style scoped>
.starField {
  background-image: url('/images/starsbg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  overflow: hidden;
}

.bottomNav {
  width: 100%;
  height: var(--bottom-navigation-height);
  display: flex;
  position: relative;
  background-color: var(--bottom-navigation-background-color);
  transition:
    background-color 250ms,
    border-color 250ms;
  -webkit-tap-highlight-color: transparent;
}
</style>
