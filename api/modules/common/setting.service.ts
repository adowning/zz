// Drizzle
import db from '../../db';
import { settings } from '../../db/schema';
import { eq } from 'drizzle-orm';

const getSetting = async () => {
    return await db.query.settings.findFirst({
        where: eq(settings.name, 'setting')
    });
};

const updateSetting = async (data: any) => {
    return await db.update(settings)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(settings.name, 'setting'))
        .returning();
};

export default {
    getSetting,
    updateSetting
};
