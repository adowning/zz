import { z } from 'zod';

export const TypeOfJackpotSchema = z.enum(['MINOR','MAJOR','GRAND']);

export type TypeOfJackpotType = `${z.infer<typeof TypeOfJackpotSchema>}`

export default TypeOfJackpotSchema;
