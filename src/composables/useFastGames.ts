import fastGames from '@/assets/fast_games/fastgames.json'
import type { LocalGame } from '@/types/game-carousel'

/**
 * Resolve a local AVIF URL for a fast game using Vite's URL handling.
 * Uses the rule: lowercase(game.name) + '.avif' inside ./fast_games.
 * Falls back to empty string if the asset does not exist at build time.
 *
 * Note: Vite cannot import dynamic arbitrary paths reliably without globbing.
 * We handle known filenames by constructing URLs with import.meta.url which
 * allows bundlers to include the asset when referenced statically.
 */
function resolveLocalImageUrlByNameLower(name?: string): string {
  if (!name){ return ''}
  const filename = `${name.toLowerCase()}.avif`
  try {
    // Construct a URL relative to this module using Vite-safe pattern
    // This will work when the asset exists; otherwise it throws.
    return new URL(`../../assets/fast_games/${filename}`, import.meta.url).toString()
  } catch {
    return ''
  }
}

/**
 * Convert JSON entries to LocalGame with a local image hint property.
 * We keep the object compatible with LocalGame and add a non-breaking field
 * __localImageUrl that can be picked up by getGameImageUrl wrapper logic.
 */
export function buildFastLocalGames(): LocalGame[] {
  return (fastGames as Array<Record<string, unknown>>).map((g) => {
    const id = String(g.id ?? '')
    const name = String(g.name ?? '')
    // Prefer explicit title, then name, then a friendly fallback
    const title = String(g.title ?? (name || 'Untitled Game'))
    const category = String(g.category ?? 'other')
    const developer = String(g.developer ?? '').toLowerCase()
    const isActive = g.isActive !== false

    const localUrl = resolveLocalImageUrlByNameLower(name)

    // Build a strongly-typed LocalGame using all required fields with sensible defaults
    const base: LocalGame = {
      id,
      // Some parts of the app require 'name' (Game shape). Prefer explicit name, fallback to title.
      name: name || title,
      title,
      category,
      developer,
      isActive,
      featured: false,
      temperature: 'none',
      // configuration: g.configuration ?? {},
      description: g.description !== undefined ? String(g.description) : null,
      thumbnailUrl: g.thumbnailUrl !== undefined ? String(g.thumbnailUrl) : null,
      bannerUrl: g.bannerUrl !== undefined ? String(g.bannerUrl) : null,
      status: g.status !== undefined ? Number(g.status) : 1,
      // Add required LocalGame fields with sensible defaults
      providerId: g.providerId !== undefined ? String(g.providerId) : '',
      totalWagered: g.totalWagered !== undefined ? Number(g.totalWagered) : 0,
      totalWon: g.totalWon !== undefined ? Number(g.totalWon) : 0,
      targetRtp: g.targetRtp !== undefined ? Number(g.targetRtp) : 0,
    }

    // Merge any additional fields from the JSON into a separate object first,
    // then attach our LocalGame fields. This keeps the LocalGame shape intact.
    const merged = {
      ...(g as Record<string, unknown>),
      ...base,
    } as LocalGame

    // Attach a hint field to prefer local assets during image resolution.
    ;(merged as unknown as { __localImageUrl?: string }).__localImageUrl = localUrl

    return merged
  })
}

/**
 * Merge fast local games first, followed by a network games list,
 * while removing duplicates by id (preferring the fast-local entry).
 */
export function mergeFastFirst(fast: LocalGame[], network: LocalGame[]): LocalGame[] {
  const seen = new Set<string>()
  const out: LocalGame[] = []

  for (const g of fast) {
    const key = String(g.id)
    if (!seen.has(key)) {
      seen.add(key)
      out.push(g)
    }
  }
  for (const g of network) {
    const key = String(g.id)
    if (!seen.has(key)) {
      seen.add(key)
      out.push(g)
    }
  }
  return out
}