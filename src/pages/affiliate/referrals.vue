<template>
    <div class="referrals-page-container fugazone">
        
        <div class="px-6 space-y-8 text-white">
            
            <!-- <header class="flex items-start justify-end "> -->
                   <div class="absolute right-0 top-1 flex" @click="close()">
          <img :src="`${closePressed ? '/images/common/close.png' : '/images/common/close.png'}`"
            style="z-index: 999; width: 40px; height: 40px; right: 0px; top: 0px" @click="close()">
        </div>
                <!-- <span class=" fugazone">Home</span> -->
            <!-- </header> -->

            <main class="space-y-12">
                
                <section>
                    <h1 class="text-3xl font-bold mb-3">Invite Friends</h1>
                    <p class="text-lg font-semibold leading-tight">
                        Share <span class="text-[#facc15]">900,000 Coins</span> and
                        <span class="text-[#00ff9d]">25.00 Free Entries</span> with Your Qualified Friend!
                    </p>
                    <ul class="mt-6 space-y-4 text-gray-300">
                        <li class="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="#00ff9d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
                                class="mr-3 mt-0.5 flex-shrink-0">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span>Let your friends scan the QR code below.</span>
                        </li>
                        <li class="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="#00ff9d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
                                class="mr-3 mt-0.5 flex-shrink-0">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span>Copy the promo code and share it with your friends so they can use it during
                                registration on Funrize.</span>
                        </li>
                        <li class="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="#00ff9d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
                                class="mr-3 mt-0.5 flex-shrink-0">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span>Copy the link (which includes the promo code) and send it to your friends.</span>
                        </li>
                    </ul>
                    <p class="mt-6 text-sm text-gray-400">
                        You can send invitations directly to your friends and also share your referral link, promo code or
                        a QR code on your Facebook, Instagram, TikTok, etc.
                    </p>
                    <p class="mt-4 font-medium">
                        You receive <span class="text-[#facc15]">500,000 Coins</span> and <span
                            class="text-[#00ff9d]">20.00 Free Entries.</span> Your friend gets a reward of <span
                            class="text-[#facc15]">400,000 Coins</span> and <span class="text-[#00ff9d]">5.00 Free
                            Entries.</span>
                    </p>
                    <p class="mt-4 text-sm font-semibold text-gray-300">
                        And remember: the bigger your network is, the more rewards you get!
                    </p>
                </section>

                
                <section class="flex flex-col items-center">
                    <div class="w-full max-w-xs rounded-3xl p-6 relative overflow-hidden"
                        style="background: radial-gradient(circle, #4c1d95 0%, #1e1b4b 70%);">
                        <div ref="qrcodeElement" class="flex justify-center items-center bg-white p-3 rounded-2xl relative">
                        </div>
                        <img src="https://pub-022106cc43ba48029b838941ed7c6daa.r2.dev/referrals/games.webp"
                            class="w-12 h-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+40px)] rounded-full border-4 border-white bg-[#1a0f3a]"
                            alt="Logo">
                        <p class="text-center mt-4 text-sm text-gray-300">Your promo code is</p>
                        <div class="flex items-center justify-center space-x-2 mt-1">
                            <span id="promo-code" class="text-xl font-bold text-white tracking-widest">{{ promoCode }}</span>
                            <button @click="copyCode(promoCode, 'promo')" title="Copy code">
                                <svg v-if="!promoCopied" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round"
                                    class="text-gray-400 hover:text-white transition-colors">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                    fill="none" stroke="#00ff9d" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <button @click="copyCode(referralLink,'link')"
                        class="mx-2 w-[90%] max-w-xs mt-6 font-semibold rounded-full border border-transparent bg-clip-border text-white transition-all duration-300"
                        style="background-image: linear-gradient(#1a0f3a, #1a0f3a), linear-gradient(to right, #a855f7, #6366f1); background-origin: border-box; background-clip: content-box, border-box;">
                        <div class="py-2">{{ linkCopied ? 'COPIED!' : 'COPY LINK' }}</div>
                    </button>

                    <div class="flex items-center justify-center w-full max-w-xs my-4">
                        <div class="flex-grow h-px bg-gray-700"></div>
                        <span class="mx-4 text-sm text-gray-500">OR</span>
                        <div class="flex-grow h-px bg-gray-700"></div>
                    </div>
                    <button
                        class="w-full max-w-xs bg-[#ec4899] text-white font-bold py-3.5 rounded-full flex items-center justify-center space-x-2 hover:bg-pink-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                            fill="currentColor">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                        <span>SHARE ON FACEBOOK</span>
                    </button>
                </section>

                
                <section class="space-y-6">
                    <div class="flex items-start space-x-5">
                        <div class="p-3 rounded-full bg-indigo-900/50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
                                stroke="#a78bfa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-bold text-lg">You send an invitation</h3>
                            <p class="text-sm text-gray-300 mt-1">Invite your friend to join Funrize using referral link,
                                QR-code, or promo code.</p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-5">
                        <img src="https://pub-022106cc43ba48029b838941ed7c6daa.r2.dev/referrals/goal.webp"
                            class="w-14 h-14 object-contain" alt="Goal Icon">
                        <div>
                            <h3 class="font-bold text-lg">Your friend joins and get qualified</h3>
                            <p class="text-sm text-gray-300 mt-1">Your friend should join Funrize by clicking on the link
                                shared by you and purchase Tournament Coin packages worth $29.99 in total.</p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-5">
                        <img src="https://pub-022106cc43ba48029b838941ed7c6daa.r2.dev/referrals/prize.webp"
                            class="w-14 h-14 object-contain" alt="Prize Icon">
                        <div>
                            <h3 class="font-bold text-lg">You both get rewarded!</h3>
                            <p class="text-sm text-gray-300 mt-1">You receive <span
                                    class="font-bold text-yellow-400">500,000</span> Coins and <span
                                    class="font-bold text-green-400">20.00</span> Free Entries. Your friend gets a reward
                                of <span class="font-bold text-yellow-400">400,000</span> Coins and <span
                                    class="font-bold text-green-400">5.00</span> Free Entries.</p>
                        </div>
                    </div>
                </section>

                
                <section class="bg-indigo-900/30 p-5 rounded-2xl">
                    <h2 class="text-center font-extrabold text-lg tracking-wider mb-6">FRIENDS STATISTICS</h2>
                    <div class="grid grid-cols-2 gap-x-6 gap-y-8">
                        <div class="flex items-center space-x-3">
                            <img src="https://pub-022106cc43ba48029b838941ed7c6daa.r2.dev/referrals/games.webp"
                                class="w-12 h-12" alt="">
                            <div>
                                <p class="text-2xl font-bold">0</p>
                                <p class="text-xs text-gray-400">Friends invited</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-3">
                            <img src="https://pub-022106cc43ba48029b838941ed7c6daa.r2.dev/referrals/target.webp"
                                class="w-12 h-12" alt="">
                            <div>
                                <p class="text-2xl font-bold">0</p>
                                <p class="text-xs text-gray-400">Friends qualified</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-3">
                            <img src="https://pub-022106cc43ba48029b838941ed7c6daa.r2.dev/referrals/coins.webp"
                                class="w-12 h-12" alt="">
                            <div>
                                <p class="text-2xl font-bold">0</p>
                                <p class="text-xs text-gray-400">Coins earned</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-3">
                            <img src="https://pub-022106cc43ba48029b838941ed7c6daa.r2.dev/referrals/entries.webp"
                                class="w-12 h-12" alt="">
                            <div>
                                <p class="text-2xl font-bold text-[#00ff9d]">0.00</p>
                                <p class="text-xs text-gray-400">Entries earned</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>

        
        <div v-if="toast.show"
            :class="['absolute bottom-4 left-1/2 -translate-x-1/2 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300', toast.isError ? 'bg-red-500' : 'bg-green-500']">
            {{ toast.message }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { responseTimeoutInterceptor } from '@varlet/axle';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useCopyToClipboard } from '../../composables/useCopyToClipboard'


const { enqueueSnackbar } = useSnackbar()
const { copy } = useCopyToClipboard()

// Stores
const affiliateStore = useAffiliateStore()
// const authStore = useAuthStore()

// Reactive state
const activeFaq = ref(-1)

// Computed properties
// const user = computed(() => authStore.user)
const reward = computed(() => affiliateStore.rewardData)
// const referralCodes = computed(() => affiliateStore.referralCodes)
// const isLoading = computed(() => affiliateStore.isLoading)
declare const QRCode: any;
const router = useRouter()


const qrcodeElement = ref<HTMLDivElement | null>(null);
const promoCode = 'FEZV6O';
const referralLink = `https://funrize.com/register?promo_code=${promoCode}`;

const promoCopied = ref(false);
const linkCopied = ref(false);

const toast = ref({
    show: false,
    message: '',
    isError: false,
});

let toastTimeout: number | undefined;

 function close() {
 router.push('/')
}
const showToast = (message: string, isError = false) => {
    if (toastTimeout) clearTimeout(toastTimeout);

    toast.value = { show: true, message, isError };

    toastTimeout = window.setTimeout(() => {
        toast.value.show = false;
    }, 2000);
};
const shareLink = computed(() => affiliateStore.shareLink || '')
const totalReward = computed(() =>
  Number(reward.value?.totalCommissionAmount || 0) + Number(reward.value?.totalReferralAmount || 0)
)

// Methods
const copyShareLink = async () => {
  if (shareLink.value) {
    const success = await copy(shareLink.value)
    if (success) {
      enqueueSnackbar('Link copied to clipboard!', { variant: 'success' })
    }
  }
}

// const copyCode = async (code?: string) => {
//   const codeToCopy = code || reward.value.code
//   if (codeToCopy) {
//     const success = await copy(`p-${codeToCopy}`)
//     if (success) {
//       enqueueSnackbar('Code copied to clipboard!', { variant: 'success' })
//     }
//   }
// }

const toggleFaq = (index: number) => {
  activeFaq.value = activeFaq.value === index ? -1 : index
}

const copyCode = async (text: string, type: 'promo' | 'link') => {
    try {
        await navigator.clipboard.writeText(text);
        showToast('Copied to clipboard!');

        if (type === 'promo') {
            promoCopied.value = true;
            setTimeout(() => promoCopied.value = false, 2000);
        } else if (type === 'link') {
            linkCopied.value = true;
            setTimeout(() => linkCopied.value = false, 2000);
        }

    } catch (err) {
        console.error('Failed to copy: ', err);
        showToast('Failed to copy!', true);
    }
};

const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.body.appendChild(script);
    });
};


onMounted(async () => {
    try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js');

        if (qrcodeElement.value) {
            new QRCode(qrcodeElement.value, {
                text: referralLink,
                width: 200,
                height: 200,
                colorDark: "#250b8b",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        }
    } catch (error) {
        console.error(error);
        showToast('Could not load QR Code generator.', true);
    }
});
</script>

<style scoped>
.referrals-page-container {
    background-color: #1a0f3a;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    position: relative; 
    padding-top: 2rem;
    padding-bottom: 3rem;
    font-family: 'FugazOne';
}

.referrals-page-container::-webkit-scrollbar {
    width: 4px;
}

.referrals-page-container::-webkit-scrollbar-track {
    background: transparent;
}

.referrals-page-container::-webkit-scrollbar-thumb {
    background: #4a3f7a;
    border-radius: 2px;
}

.referrals-page-container::-webkit-scrollbar-thumb:hover {
    background: #6c5f9d;
}
</style>