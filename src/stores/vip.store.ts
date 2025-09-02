/* eslint-disable @typescript-eslint/ban-ts-comment */
import { computed, ref } from 'vue'
// import { useOn } from '@/composables/EventManager'
import { defineStore } from 'pinia'
import { getApiVipLevels, getApiVipMe } from '@/gen/api/vip'
import { VipInfo, VipLevel, VipRank } from '~/types'

// type VipInfo = ApiVipInfo & { betExp?: number }
// type VipLevel = ApiVipLevel & { betExp?: number }

export const useVipStore = defineStore(
  'vip',

  () => {
    const totalXp = ref<number>(0)
    const xpForNextLevel = ref<number>(0)
    const vipInfo = ref<VipInfo>({} as VipInfo) // Keeping type assertion as in original
    const nextRank = ref<VipRank>() // Keeping type assertion as in original
    const vipRanks = ref<VipRank[]>() // Keeping type assertion as in original
    const vipRank = ref<VipRank>() // Keeping type assertion as in original
    const getTotalXp = computed(() => totalXp.value || 0)
    // const eventManager = useEventManager() // Get an instance of the event manager

    const updateXp = (newTotalXp: number, xpGained: number) => {
      if (vipInfo.value) {
        vipInfo.value.totalXp = newTotalXp
      }

      // Emit a global event that the PlayerAvatar component can listen to.
      // eventManager.emit('xp:gain', { xpGained })
      console.log(`VIP Store: Emitted xp:gain event with ${xpGained} XP.`)
    }

    const vipLevels = ref<VipLevel[]>([])

    const getVipInfo = computed(() => vipInfo.value)
    const getVipLevelsComputed = computed(() => vipLevels.value)
    const setAllVipData = (info: VipInfo, rank: VipRank, _xpForNextLevel: number) => {
      vipInfo.value = info
      vipRank.value = rank
      xpForNextLevel.value = _xpForNextLevel
      if (info) {
        totalXp.value = info.totalXp || 0 // Update totalXp based on vipInfo
      }
    }
    const setVipInfo = (info: VipInfo) => {
      vipInfo.value = info
      if (info) {
        totalXp.value = info.totalXp || 0 // Update totalXp based on vipInfo
      }
    }
    async function fetchAllVipLevels(): Promise<boolean> {
      try {
        const response = await getApiVipLevels()
        console.log('vip levels ', response.data)
        if (response.status === 200) {
          vipRanks.value = response.data as unknown as VipRank[]
          return true
        }
        return false
      } catch (error) {
        console.error('Failed to fetch VIP levels:', error)
        return false
      }
    }

    async function fetchVipInfo(): Promise<boolean> {
      try {
        const response = await getApiVipMe()
        if (response.status === 200) {
          console.log(response)
          //@ts-ignore
          setVipInfo(response.data.info, response.data.rank, response.data.xpForNextLevel)
          return true
        }
        return false
      } catch (error) {
        console.error('Failed to fetch VIP info:', error)
        return false
      }
    }

    function getPercentOfCurrentLevel() {
      const currentVipInfo = vipInfo.value
      if (!currentVipInfo) {
        return undefined
      }

      const levelInfo = vipLevels.value.find((level) => level.id === currentVipInfo.level)
      if (!levelInfo || !nextRank.value?.minXp) {
        return undefined
      }

      const currentExp = currentVipInfo.totalXp ?? 0
      const requiredExp = nextRank.value.minXp 

      const percentage = Math.floor((currentExp / requiredExp) * 100)
      return [percentage, currentExp, requiredExp]
    }

    return {
      getPercentOfCurrentLevel,
      updateXp,
      fetchAllVipLevels,
      fetchVipInfo,
      setAllVipData,
      getVipInfo,
      getTotalXp,
      setVipInfo,
      getVipLevels: getVipLevelsComputed,
    }
  },
)
