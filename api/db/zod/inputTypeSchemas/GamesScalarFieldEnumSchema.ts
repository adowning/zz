import { z } from 'zod';

export const GamesScalarFieldEnumSchema = z.enum(['id','name','title','description','category','tags','thumbnailUrl','bannerUrl','developer','providerId','totalWagered','totalWon','goldsvetData','targetRtp','isFeatured','isActive','operatorId','isHorizontal','createdAt','updatedAt','status']);

export default GamesScalarFieldEnumSchema;
