import { defineStore } from 'pinia'
import { ref } from 'vue'

import { GameType,  GameSpinType } from '~/types'
import { postApiGamesLeave, postApiGamesIdEnter, getApiGamesAll, } from '@/gen/api/games'
import { getAccessToken } from '@/utils/accessToken'
import { getApiGamespinsTopwins } from '@/gen/api/game-spins'
import { GameConfig } from '@/gen/models'

export const useGameStore = defineStore('game', () => {

    // State
    const games = ref<GameType[]>([])
    const categories = ref<string[]>([]) // Changed from GameCategory[] to string[]
    const currentGame = ref<string | null>(null)
    const gameSession = ref<unknown>(null)
    const favorites = ref<string[]>([])
    const topWins = ref<GameSpinType[]>([])
    const currentGameOptions = ref<GameConfig>()
    // Actions
    async function fetchAllGames(): Promise<boolean> {
        try {
            const response = await getApiGamesAll()
            if (response.data) {
                // Transform the response to match our Game type
                if(response.status === 200) {
                const uniqueGames = response.data.reduce<GameType[]>(
                    (acc, game) => {
                        if (!acc.some((g) => g.id === game.id)) {
                            acc.push({
                                ...game,
                                // Ensure all required fields are present
                                category: game.category || 'slots',
                                tags: Array.isArray(game.tags) ? game.tags : [],
                            } as unknown as GameType)
                        }
                        return acc
                    },
                    []
                )
                games.value = uniqueGames
                return true
            }
            }
            return false

        } catch (error) {
            console.error('Failed to fetch games:', error)
            return false
        }
    }

    const enterGame = async (id: string) => {
        const accessToken = getAccessToken()
        // If already in this game but we have cached options, return them immediately.
        if (currentGame.value === id && currentGameOptions.value) {
            return currentGameOptions.value
        }

        try {
            const response = await postApiGamesIdEnter(id)
            if (response.status === 200 && response.data) {
                // Inject token into gameConfig if available
                console.log(response.data.gameConfig)
                if (response.data.gameConfig && accessToken) {
                    response.data.gameConfig.authToken = accessToken
                }
                currentGame.value = id
                currentGameOptions.value = response.data.gameConfig
                return response.data
            } else {
                console.warn('[game.store][enterGame] Empty response body for id:', id)
                currentGameOptions.value = undefined
                return undefined
            }
        } catch (error) {
            console.error('Error entering game:', error)
            currentGameOptions.value = undefined
            throw error
        }
    }

    const leaveGame = async () => {
        const leaveGame = await postApiGamesLeave()
        console.log(leaveGame)
    }
    // const spin = (params: any) => spinMutation.mutate(params)
    async function fetchTopWins(): Promise<boolean> {
        try {
            const result = await getApiGamespinsTopwins()
            if (result.status !== 200) {return false}
            topWins.value = result.data.map((item: any) => ({
                ...item,
                createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
                updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
                occurredAt: item.occurredAt ? new Date(item.occurredAt) : undefined,
            }))
            return true
        } catch (error: any) {
            // Safe fallback without external dependency to avoid ReferenceError
            topWins.value = []
            return false
        } 
    }

    return {
        games, // State
        categories, // State
        currentGame, // State
        gameSession, // State
        currentGameOptions,
        favorites,
        fetchAllGames, // Expose the new action
        enterGame,
        leaveGame,
        fetchTopWins,
        topWins
    }
})
