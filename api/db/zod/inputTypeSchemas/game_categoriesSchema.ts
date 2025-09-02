import { z } from 'zod';

export const game_categoriesSchema = z.enum(['slots','fish','table','live','poker','lottery','virtual','other']);

export type game_categoriesType = `${z.infer<typeof game_categoriesSchema>}`

export default game_categoriesSchema;
