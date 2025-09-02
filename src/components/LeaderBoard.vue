<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

const eventManager = useEventManager()

const authStore = useAuthStore()
const gameStore = useGameStore()
const currentUser = authStore.currentUser
// let templist = sourceWinners.value
// templist = templist.sort((a: any, b: any) => b.score - a.score)
// const botList = ref(templist)
const target = ref()

function clickClose() {
  console.log('clickClose')
  target!.value!.classList.add(`animate__animated`, 'animate__bounceOut')
  setTimeout(() => {
    eventManager.emit('leaderBoardOpen', false)
  }, 300)
}

onMounted(async () => {
  // await gameStore.fetchTopWins()
})
</script>

<template>
  <div
    ref="target"
    class="animate__animated animate__bounceIn  zIndex-99999 absolute top-0 left-0 flex h-screen w-screen flex-col items-center justify-start overflow-y-hidden"
  >
    <div
      class="  fixed top-14 left-0 flex flex-col w-[100%] items-center justify-start overflow-y-hidden"
      style="
        width: 100%;
        margin: auto;
        height: 85vh;
        background-repeat: no-repeat;
        border-image: url('/images/common/cell-2.png') 20 20 20 20 fill / 20px 20px 20px 20px;
        padding: 20px 20px 20px 20px;
        max-width: 480px;
        z-index: 99999999;

        background-repeat: no-repeat;
        background-size: 100% 100%;
      "
    >
      <img
        src="/images/common/close.png"
        style="z-index: 999; width: 50px; height: 50px; position: absolute; right: -4px; top: 0px"
        @click="clickClose()"
      />
      <div v-if="gameStore.topWins.length > 0" class="max-w-[90%] flex flex-col items-start justify-start ">
        <div style="margin: auto; font-size: 32px" class="glow py-3">BETA BATTLE</div>
        <div class="flex w-full justify-center" style="">
          <div
            class="flex"
            :style="`background-image: url('/images/avatars/${gameStore.topWins[1].playerAvatar}'); background-repeat: no-repeat;
        background-size: 70% 48%;
        border-radius: 22px;
        background-position-x: 10px;
          background-position-y: 32px; `"
          >
            <img
              src="/images/leaderboard/leader2.avif"
              style="position: relative; height: 100px; top: 0px; bottom: 0px; left: 0px"
            />
          </div>
          <div
            class="flex"
            style="transform: scale(1.3)"
            :style="`background-image: url('/images/avatars/${gameStore.topWins[0].playerAvatar}');
        background-repeat: no-repeat;
          background-size: 50% 45%;
          border-radius: 22px;
          clip: rect(1px, 10em, 3rem, 2ch);
           background-position-x: 20px;
          background-position-y: 30px; `"
          >
            <img src="/images/leaderboard/leader1.avif" style="height: 100px" />
          </div>
          <div
            class="flex"
            style="transform: scale(1.3)"
            :style="`background-image: url('/images/avatars/${gameStore.topWins[2].playerAvatar}');
        background-repeat: no-repeat;
        background-size: 55% 40%;
        clip: rect(10em, 10em, 3rem, 2em);
        border-radius: 20% 20% 20% 20%;
        background-position-x: 10px;
          background-position-y: 32px; `"
          >
            <img
              src="/images/leaderboard/leader3.avif"
              style="
                position: relative;
                padding-top: 20px;
                height: 100px;
                bottom: 0px;
                left: 0px;
                transform: scale(0.9) translateY(-12px);
              "
            />
          </div>
        </div>
        <div
          v-if="currentUser !== undefined && currentUser !== null && gameStore.topWins.length > 0"
          class="mt-0  flex flex-col justify-start"
          style="
            height: calc(60vh);
            margin-bottom: 20px;
            overflow-y: scroll;
            width: 100%;
            /* padding-left: 2%;
                        padding-right: 2%; */
          "
        >
          <div
            v-for="(user, i) of gameStore.topWins"
            :key="user.id"
            style="min-width: 83vw"
            class="my-1 items-start justify-start py-3"
            :style="` background-image: url(${user.playerName !== currentUser.username ? '/images/leaderboard/leaderrow.avif' : '/images/leaderboard/leaderbar-user.avif'});
        content-start  border-radius: 12px; width: 100%;background-repeat: no-repeat;
          background-size:  100% 100%; background-position-y: center;background-position-x: start;`"
          >
            <div class="flex flex-row items-center justify-start gap-1 mx-3" style="height: 46px;">
              <div
                v-if="i < 10"
                class="ml-1"
                style="
                  background-image: url('/images/leaderboard/leaderboard-flag.avif');
                  background-repeat: no-repeat;
                  background-size: cover;
                  height: 130%;
                  width: 34px;
                  color: white;
                  font-weight: bold;
                  margin-top: -13px;
                  padding: 6px;
                  font-family: bungeecolor;
                  font-size: 18px;
                "
              >
                {{ i + 1 }}
              </div>
              <div
                v-else
                style="
                  background-repeat: no-repeat;
                  background-size: cover;
                  height: 100%;
                  width: 30px;
                  color: white;
                  font-weight: bold;
                  padding: 6px;
                  font-family: bungeecolor;
                  font-size: 18px;
                "
              >
                {{ i + 1 }}
              </div>
              <div>
                <img
                  :src="`/images/avatars/${user.playerAvatar}`"
                  round
                  style="width: 86px; border-radius: 999px"
                  class="mx-1"
                />
              </div>
              <div style="margin-left: 12px; width: 90px; text-align: left" class="not-glow mt-2 mr-5 ml-2">
                {{ user.playerName }}
              </div>
              <div class="color-white flex w-[90vw] items-center justify-end pr-5">
                <img src="/images/leaderboard/coinicon.avif" style="width: 30px; height: 30px" class="mb-2" />
                <div style="font-size: 20px; color: yellow; opacity: 1" class="mb-2 ml-1 py-0">
                  {{ (user.grossWinAmount * 100) / 100 }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex">
          <img
            src="/images/leaderboard/leaderboard-prizes.avif"
            style="
              margin: auto;
              margin-bottom: 10px;
              height: 200px;
              width: 100%;
              position: absolute;
              bottom: 0px;
              left: 0px;
            "
            class="mt-5 py-0"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.my-rolling-text {
  /* --van-rolling-text-background: #1989fa; */
  --van-rolling-text-color: white;
  --van-rolling-text-font-size: 12px;
  --van-rolling-text-gap: 0px;
  --van-rolling-text-item-border-radius: 5px;
  --van-rolling-text-item-width: 7px;
}

.not-glow {
  font-size: 15px;
  font-weight: 900;
  color: #fff;
  text-align: center;
  /* -webkit-animation: glow 1s ease-in-out infinite alternate;
    -moz-animation: glow 1s ease-in-out infinite alternate;
    animation: glow 1s ease-in-out infinite alternate; */
}

@keyframes glow {
  from {
    text-shadow:
      0 0 10px #fff,
      0 0 20px #fff,
      0 0 30px #e60073,
      0 0 40px #e60073,
      0 0 50px #e60073,
      0 0 60px #e60073,
      0 0 70px #e60073;
  }

  to {
    text-shadow:
      0 0 20px #fff,
      0 0 30px #ff4da6,
      0 0 40px #ff4da6,
      0 0 50px #ff4da6,
      0 0 60px #ff4da6,
      0 0 70px #ff4da6,
      0 0 80px #ff4da6;
  }
}
</style>
