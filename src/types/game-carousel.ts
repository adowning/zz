import type { GameType } from '~/types'

export type Temperature = 'hot' | 'cold' | 'none'

export type PartialGameWithId = Partial<GameType> & { id: string | number }

/**
 * Local normalized shape used by the carousel to avoid unsafe 'any' across sources.
 */
export type LocalGame = Omit<Partial<GameType>, 'id'> & {
  id: string | number
  temperature: Temperature
  featured?: boolean
  developer: string
  tags?: string[]
}

/**
 * Props contract for GameCarousel and its items.
 */
export type GameCarouselProps = {
  games?: Array<Partial<GameType> & { id: string | number }>
}

/**
 * Event names for CustomScrollbar
 */
export type ScrollbarEmits = {
  (e: 'trackClick' | 'dragRatio', ratio: number): void
}