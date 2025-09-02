<script setup lang="ts">
 defineProps({
  name: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  color1: {
    type: String,
    default: '',
  },
  color2: {
    type: String,
    default: '',
  }
})

</script>

<template>
  <svg v-if="name === 'LockIcon'" width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M66 41.25H62.3333V30.25C62.3333 18.5273 53.056 9.16663 41.3333 9.16663C29.6107 9.16663 20.3333 18.5273 20.3333 30.25V41.25H16.6667C14.1533 41.25 12.1111 43.3323 12.1111 45.875V70.375C12.1111 72.9177 14.1533 75 16.6667 75H66C68.5133 75 70.5556 72.9177 70.5556 70.375V45.875C70.5556 43.3323 68.5133 41.25 66 41.25ZM47.6667 59.5416V64.125C47.6667 65.5721 46.5221 66.75 45 66.75H37.6667C36.1446 66.75 35 65.5721 35 64.125V59.5416C33.1933 58.5208 32.1111 56.5729 32.1111 54.3125C32.1111 50.8021 34.8299 47.9375 38.2222 47.9375C41.6146 47.9375 44.3333 50.8021 44.3333 54.3125C44.3333 56.5729 43.251 58.5208 41.3333 59.5416H47.6667V59.5416ZM27.6667 41.25V30.25C27.6667 22.2552 33.8385 15.8333 41.3333 15.8333C48.8281 15.8333 55 22.2552 55 30.25V41.25H27.6667Z" fill="url(#paint0_linear_1_2)" />
    <defs>
      <linearGradient id="paint0_linear_1_2" x1="41.3333" y1="9.16663" x2="41.3333" y2="75" gradientUnits="userSpaceOnUse">
        <stop stop-color="#C46CFE" />
        <stop offset="1" stop-color="#9543E4" />
      </linearGradient>
    </defs>
  </svg>

  <svg v-if="name === 'CoinsIcon'" :class="className" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5 7.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-4.5-3a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="#fde047" />
    <path d="M12 11.25a6 6 0 00-6 6v1.5a.75.75 0 00.75.75h10.5a.75.75 0 00.75-.75v-1.5a6 6 0 00-6-6zM8.25 18a.75.75 0 010-1.5h7.5a.75.75 0 010 1.5h-7.5z" fill="#fbbf24" />
  </svg>

  <svg v-if="name === 'CloverIcon'" :class="className" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21a9 9 0 000-18A9 9 0 003 12a9 9 0 009 9zm0-2a7 7 0 100-14 7 7 0 000 14zm-2.29-6.71a.75.75 0 011.06 0l.94.94.94-.94a.75.75 0 111.06 1.06l-.94.94.94.94a.75.75 0 11-1.06 1.06l-.94-.94-.94.94a.75.75 0 11-1.06-1.06l.94-.94-.94-.94a.75.75 0 010-1.06z" fill="#4ade80" />
  </svg>

  <svg v-if="name === 'GiftBoxIcon'" :class="className" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v2.036a2.5 2.5 0 01-1 .964V18a3 3 0 01-3 3H7a3 3 0 01-3-3V9a2.5 2.5 0 01-1-.964V6zm3-1a1 1 0 011-1h10a1 1 0 011 1v1H6V5zm13 3.464A4.5 4.5 0 0012 10a4.5 4.5 0 00-7 1.464V18a1 1 0 001 1h12a1 1 0 001-1V8.464z" fill="#fb923c" />
  </svg>

  <svg v-if="name === 'PercentIcon'" :class="className" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21a9 9 0 100-18 9 9 0 000 18zm-2.25-10.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm5.12-2.12a.75.75 0 011.06 1.06l-6 6a.75.75 0 01-1.06-1.06l6-6zm2.13 6.62a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="#c084fc" />
  </svg>

  <svg v-if="name === 'ArrowLeftIcon'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>

  <svg v-if="name === 'ArrowRightIcon'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18L15 12L9 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>

  <svg v-if="name === 'CheckIcon'" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.6667 5.83325L7.5 14.9999L3.33333 10.8333" stroke="#4ADE80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>

  <svg v-if="name === 'CoinStackIcon'" :class="className" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4C8.68629 4 6 5.567 6 7.5C6 9.433 8.68629 11 12 11C15.3137 11 18 9.433 18 7.5C18 5.567 15.3137 4 12 4Z" fill="#FBBF24" />
    <path d="M6 12C6 10.067 8.68629 8.5 12 8.5C15.3137 8.5 18 10.067 18 12V16.5C18 18.433 15.3137 20 12 20C8.68629 20 6 18.433 6 16.5V12Z" fill="#F59E0B" />
    <path d="M6 12C6 13.933 8.68629 15.5 12 15.5C15.3137 15.5 18 13.933 18 12V10.5C18 8.567 15.3137 7 12 7C8.68629 7 6 8.567 6 10.5V12Z" fill="#FBBF24" opacity="0.6" />
  </svg>

  <svg v-if="name === 'GemIcon'" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.34298 2.3725L12 1L17.657 2.3725L22 8.5L12 23L2 8.5L6.34298 2.3725Z" stroke="#818CF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M2 8.5H22" stroke="#818CF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M12 23L17.657 8.5" stroke="#818CF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M12 23L6.34302 8.5" stroke="#818CF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M12 1L12 23" stroke="#818CF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>

  <template v-if="name === 'TierIconBase'">
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <defs>
        <linearGradient :id="`${id}_grad`" x1="32" y1="0" x2="32" y2="64" gradientUnits="userSpaceOnUse">
          <stop :stop-color="color1" />
          <stop offset="1" :stop-color="color2" />
        </linearGradient>
      </defs>
      <path d="M54.4 12.8L32 2 9.6 12.8 2 32l7.6 19.2L32 62l22.4-19.2L62 32l-7.6-19.2z" :fill="`url(#${id}_grad)`" />
      <slot />
    </svg>
  </template>

  <template v-if="name === 'BronzeIcon'">
    <TierIconBase id="bronze" color1="#E09E6E" color2="#B36A44">
      <path d="M54.4 12.8L32 2 9.6 12.8 2 32l7.6 19.2L32 62l22.4-19.2L62 32l-7.6-19.2z" stroke="#FCE2D2" stroke-width="2" stroke-miterlimit="10" />
    </TierIconBase>
  </template>

  <template v-if="name === 'SilverIcon'">
    <TierIconBase id="silver" color1="#B0B9D9" color2="#7B89B6">
      <path d="M54.4 12.8L32 2 9.6 12.8 2 32l7.6 19.2L32 62l22.4-19.2L62 32l-7.6-19.2z" stroke="#E2E6F2" stroke-width="2" stroke-miterlimit="10" />
    </TierIconBase>
  </template>

  <template v-if="name === 'GoldIcon'">
    <TierIconBase id="gold" color1="#F9D771" color2="#E3A836">
      <path d="M54.4 12.8L32 2 9.6 12.8 2 32l7.6 19.2L32 62l22.4-19.2L62 32l-7.6-19.2z" stroke="#FFF5DA" stroke-width="2" stroke-miterlimit="10" />
      <path d="M32 21l-4.5 9.1-10 .8 7.8 6.9-2.3 9.9L32 43l8.9 5.3-2.3-9.9 7.8-6.9-10-.8L32 21z" fill="#D47525" />
    </TierIconBase>
  </template>

  <template v-if="name === 'PlatinumIcon'">
    <TierIconBase id="plat" color1="#D697FF" color2="#A767E9">
      <path d="M54.4 12.8L32 2 9.6 12.8 2 32l7.6 19.2L32 62l22.4-19.2L62 32l-7.6-19.2z" stroke="#F5E4FF" stroke-width="2" stroke-miterlimit="10" />
      <path d="M41 14.3L32 18l-9-3.7V9.7L32 6l9 3.7v4.6z M23 54.3L32 58l9-3.7v-4.6L32 54l-9-3.7v4.6z" fill="#9543E4" />
    </TierIconBase>
  </template>

  <template v-if="name === 'SapphireIcon'">
    <TierIconBase id="sapphire" color1="#7CA0FF" color2="#5575D9">
      <path d="M54.4 12.8L32 2 9.6 12.8 2 32l7.6 19.2L32 62l22.4-19.2L62 32l-7.6-19.2z" stroke="#DDE5FF" stroke-width="2" stroke-miterlimit="10" />
    </TierIconBase>
  </template>

  <svg v-if="name === 'SevenIcon'" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.5 15H37.5L30 45" stroke="url(#paint0_linear_icon)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
    <defs>
      <linearGradient id="paint0_linear_icon" x1="30" y1="15" x2="30" y2="45" gradientUnits="userSpaceOnUse">
        <stop stop-color="#F472B6" />
        <stop offset="1" stop-color="#EC4899" />
      </linearGradient>
    </defs>
  </svg>

  <svg v-if="name === 'LightningIcon'" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M27.5 7.5L17.5 30H30L25 52.5L42.5 22.5H30L27.5 7.5Z" stroke="url(#paint0_linear_icon2)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
    <defs>
      <linearGradient id="paint0_linear_icon2" x1="30" y1="7.5" x2="30" y2="52.5" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FBBF24" />
        <stop offset="1" stop-color="#F59E0B" />
      </linearGradient>
    </defs>
  </svg>

  <svg v-if="name === 'TargetIcon'" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="25" stroke="url(#paint0_linear_icon3)" stroke-width="6" />
    <circle cx="30" cy="30" r="15" stroke="url(#paint1_linear_icon3)" stroke-width="6" />
    <circle cx="30" cy="30" r="5" fill="url(#paint2_linear_icon3)" />
    <defs>
      <linearGradient id="paint0_linear_icon3" x1="30" y1="5" x2="30" y2="55" gradientUnits="userSpaceOnUse">
        <stop stop-color="#818CF8" />
        <stop offset="1" stop-color="#6366F1" />
      </linearGradient>
      <linearGradient id="paint1_linear_icon3" x1="30" y1="15" x2="30" y2="45" gradientUnits="userSpaceOnUse">
        <stop stop-color="#A78BFA" />
        <stop offset="1" stop-color="#8B5CF6" />
      </linearGradient>
      <linearGradient id="paint2_linear_icon3" x1="30" y1="25" x2="30" y2="35" gradientUnits="userSpaceOnUse">
        <stop stop-color="#C4B5FD" />
        <stop offset="1" stop-color="#A78BFA" />
      </linearGradient>
    </defs>
  </svg>

  <svg v-if="name === 'GiftIcon'" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7.5" y="20" width="45" height="32.5" rx="5" fill="url(#paint0_linear_icon4)" />
    <path d="M30 20V52.5" stroke="#A855F7" stroke-width="5" />
    <rect x="15" y="7.5" width="30" height="12.5" rx="3" fill="url(#paint1_linear_icon4)" />
    <path d="M22.5 7.5C22.5 2.5 30 -2.5 30 7.5C30 -2.5 37.5 2.5 37.5 7.5" stroke="#A855F7" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
    <defs>
      <linearGradient id="paint0_linear_icon4" x1="30" y1="20" x2="30" y2="52.5" gradientUnits="userSpaceOnUse">
        <stop stop-color="#C084FC" />
        <stop offset="1" stop-color="#A855F7" />
      </linearGradient>
      <linearGradient id="paint1_linear_icon4" x1="30" y1="7.5" x2="30" y2="20" gradientUnits="userSpaceOnUse">
        <stop stop-color="#D8B4FE" />
        <stop offset="1" stop-color="#C084FC" />
      </linearGradient>
    </defs>
  </svg>
</template>