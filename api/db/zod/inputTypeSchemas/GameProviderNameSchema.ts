import { z } from 'zod';

export const GameProviderNameSchema = z.enum(['pragmaticplay','evoplay','netent','playngo','relaxgaming','hacksaw','bgaming','spribe','internal','redtiger','netgame','bigfishgames','cqnine','nolimit','kickass']);

export type GameProviderNameType = `${z.infer<typeof GameProviderNameSchema>}`

export default GameProviderNameSchema;
