<script setup lang="ts">
const levels = [
    { level: 1, xp: '0 XP', active: true },
{ level: 2, xp: '200 XP', active: false },
    { level: 3, xp: '500 XP', active: false },
{ level: 4, xp: '850 XP', active: false },
    { level: 5, xp: '1K XP', active: false },
{ level: 6, xp: '2K XP', active: false },
    { level: 7, xp: '3K XP', active: false },
{ level: 8, xp: '4K XP', active: false },
    { level: 9, xp: '5K XP', active: false },
{ level: 10, xp: '7K XP', active: false },
    { level: 11, xp: '10K XP', active: false },
]
</script>

<template>
    <div class="flex flex-col onacona justify-center w-full">
        <h2 class="onacona text-white">
Funrize Club progress
</h2>
        <p class="mt-2 text-gray-400 text-xs no-wrap">
Unlock <span class="text-pink-500 font-semibold">Funrize Club</span> to get exclusive rewards!
</p>

        <div class="mt-8">
            <p class="text-md text-white mb-4">
Your level
</p>
            <div class="relative">
                <div class="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-gray-700" style="top: 12px" />
                <div class="absolute top-1/2 -translate-y-1/2 left-0 w-0 h-0.5 bg-[#E91E8A]" style="top: 12px" />
                <div class="relative flex justify-between items-start">
                    <div v-for="{ level, xp, active } in levels" :key="level" class="flex flex-col items-center z-10 w-14">
                       <div class="w-6 h-6 rounded-full flex items-center justify-center font-bold" :class="[active ? 'bg-gradient-to-br from-[#9791d6] to-[#6059a7]' : 'bg-[#26254E]']">
                         <div class="w-4 h-4 rounded-full flex items-center justify-center" :class="[active ? 'bg-gradient-to-br from-[#c4c0e9] to-[#8680c6]' : 'bg-[#3b3a61]']">
                            <span class="text-xs text-white">{{ level }}</span>
                         </div>
                        </div>
                       <p class="mt-2 text-xs text-gray-400 text-center">
{{ xp }}
</p>
                    </div>
                </div>
            </div>
        </div>

        <button class="mt-12 w-full sm:w-auto sm:self-start bg-gradient-to-r from-[#E91E8A] to-[#A21E7A] hover:from-[#d01a7a] hover:to-[#8f1a6a] text-white font-bold py-4 px-12 rounded-full text-lg shadow-[0_5px_20px_rgba(233,30,138,0.3)] transition-all duration-300 transform hover:scale-105">
            UNLOCK REWARDS
        </button>
    </div>
</template>
