<script setup>
// Define the 'winner' prop that this component accepts.
defineProps({
  winner: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <li
    class="relative flex-shrink-0 h-[70px] w-[280px] rounded-xl  p-1 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]"
  >
    <div
      class="h-full w-full bg-[#1a1436] rounded-[11px] flex items-center gap-3 p-1"
    >
      <div class="relative  flex-shrink-0">
        <img
          :src="winner.imageUrl"
          :alt="`Game: ${winner.gameName}`"
          class="w-16 h-16 rounded-lg object-cover border-2 border-slate-700"
          onerror="this.onerror=null;this.src='https://placehold.co/64x64/1a1436/ffffff?text=Game';"
        >
      </div>
      <div
        class="flex flex-col py-4 justify-center text-sm overflow-hidden whitespace-nowrap text-slate-300"
      >
        <div
          class="text-base pt-5 font-bold text-slate-50 text-ellipsis overflow-hidden"
        >
          {{ winner.name }} <span class="font-normal">won</span>
        </div>
        <div
          class="flex items-center  text-lg font-bold text-yellow-400 "
        >
          <!-- Coin Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
            />
            <path
              d="M13 14.262V16h-2v-1.738c-1.396-.484-2.381-1.724-2.527-3.262h2.014c.142.92.831 1.594 1.763 1.594.922 0 1.52-.523 1.52-1.199 0-.693-.465-1.148-1.52-1.666-1.39-.703-2.48-1.554-2.48-2.912 0-1.441 1.116-2.617 2.7-2.859V5h2v1.141c1.282.355 2.136 1.492 2.262 2.859h-2.014c-.109-.79-.654-1.432-1.512-1.432-.828 0-1.432.548-1.432 1.148s.604 1.08 1.432 1.52c1.658.842 2.568 1.693 2.568 3.018.001 1.543-1.141 2.748-2.977 2.977z"
            />
          </svg>
          {{ winner.amount }}
        </div>
        <div class="flex items-center gap-1 pb-6 text-xs text-slate-400">
          <!-- Location Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 2C7.589 2 4 5.589 4 10c0 4.411 8 12 8 12s8-7.589 8-12c0-4.411-3.589-8-8-8zm0 12c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"
            />
          </svg>
          {{ winner.location }}
        </div>
      </div>
    </div>
    <!-- Player Avatar Image -->
    <img
      :src="`/images/avatars/${winner.playerAvatar}`"
      :alt="`Avatar for ${winner.name}`"
      class="absolute bottom-2 right-2 w-9 h-9 rounded-full border-2 border-purple-400 object-cover shadow-lg"
      onerror="this.onerror=null;this.src='https://placehold.co/32x32/4b5563/ffffff?text=??';"
    >
  </li>
</template>

<style scoped>
/* No component-specific styles needed here as all are handled by Tailwind utility classes. */
</style>
