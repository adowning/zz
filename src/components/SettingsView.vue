<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

defineProps({
  hasCancel: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
})
const eventBus = useEventManager()
const router = useRouter()
const isVisible = ref(true)

// const emit = defineEmits(['update:modelValue'])
function logout() {
  console.log('Logout button clicked')
  const authStore = useAuthStore()
  try {
    authStore.logout()
    // router.push('/login')
   eventBus.emit('settingsModal', false)
  router.replace('/login')

    console.log('Logout successful')
  } catch (e) {
    console.error('Logout failed:', e)
  }
}
// const isOpen = ref(false)
const customElementsForm = reactive({
  checkbox: ['lorem'],
  radio: 'one',
  switch: ['one', 'two', 'three'],
  file: null,
})

function gotoAgent() {
  eventBus.emit('settingsModal', false)
  router.replace('/agent')
}

</script>

<template>
  <Transition name="global-loading-fade" appear>
      <div v-if="isVisible" ref="loadingElement" class="loading-container" data-testid="global-loading"
 :style="{ zIndex: 9999 }">

    <div class="flex-col relative max-h-modal  w-11/12 md:w-3/5 lg:w-2/5 xl:w-4/12 z-50" style="
        background-repeat: no-repeat;
        margin: auto;
        border-image: url('/images/common/cell-2.png') 30 30 30 30 fill / 30px 30px 30px 30px;
        padding: 30px 30px 30px 30px;
      " @click.stop>
      
       <!-- <div class="absolute right-0 top-0 justify-end" style="" @click="eventBus.emit('settingsModal', false)"> -->
        
      <!-- </div> -->
      <div class="flex justify-between w-full">

       <div class="flex justify-start text-white font-bold">
        version: 1.08
      </div>
      <div class="absolute right-0 top-0 justify-end" style="transform: translateY(-16px) translateX(16px)" @click="eventBus.emit('settingsModal', false)">
      <CloseButton  class=" justify-end" width="40" height="40" idle-image="/images/common/close.png"
          pressed-image="/images/common/close-pressed.png" />
      </div>
      </div>
     
      <div class="flex justify-between w-full glow px-4 gap-2 pb-1">
        Full Screen
        <FormCheckRadioGroup v-model="customElementsForm.switch" name="sample-switch" type="switch"
          :options="{ one: '' }" />
        <!-- <MazSwitch size="large" color="success" /> -->
      </div>
      <div class="flex justify-between w-full glow px-4 pb-1">
        Sound Effects
        <FormCheckRadioGroup v-model="customElementsForm.switch" name="sample-switch" type="switch"
          :options="{ two: '' }" />
        <!-- <MazSwitch /> -->
      </div>
      <div class="flex justify-between w-full glow px-4 pb-1">
        Music
        <FormCheckRadioGroup v-model="customElementsForm.switch" name="sample-switch" type="switch"
          :options="{ three: '' }" />
        <!-- <MazSwitch color="primary" /> -->
      </div>
      <div class="flex justify-around items-center w-full glow px-4 "
        style="margin-top: 30px; margin-bottom: 0px; padding-bottom: 0px">
        <GlassButton color="red" :shine="false" @click="logout">
          LOG OUT
        </GlassButton>
        <GlassButton :shine="false" @click="gotoAgent">
          AGENT
        </GlassButton>
      </div>
    </div>
    </div>
    <!-- <div class="flex my-12 h-[80px]" /> -->
  </Transition>
</template>

<style>
:global(body.loading-active) {
  overflow: hidden !important;
  position: fixed;
  width: 100%;
  height: 100%;
}

/* Update the loading container styles */
.overlay-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  transition: opacity 140ms ease-out;
  /* ensures container has baseline transition too */
  z-index: 9999;
  pointer-events: auto;
  /* Ensure it's above everything except modals */
  isolation: isolate;
}

/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
