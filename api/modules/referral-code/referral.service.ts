import { eq, count, desc } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import db from '#/db';
import { referralCodes, users } from '#/db/schema';

export const getReferralCodes = async (userId: string) => {
    return await db
        .select({
            id: referralCodes.id,
            code: referralCodes.code,
            name: referralCodes.name,
            commissionRate: referralCodes.commissionRate,
            userId: referralCodes.userId,
            createdAt: referralCodes.createdAt,
            updatedAt: referralCodes.updatedAt,
        })
        .from(referralCodes)
        .where(eq(referralCodes.userId, userId))
        .leftJoin(users, eq(referralCodes.code, users.inviteCode))
        .groupBy(referralCodes.id)
        .orderBy(desc(referralCodes.createdAt))
        .then(results => {
            return results.map(result => ({
                ...result,
                referralCount: 0, // We'll compute this dynamically since user.inviteCode might not be indexed properly
            }));
        });
};

export const createReferralCode = async (data: {
    name: string;
    code: string;
    userId: string;
    commissionRate: number;
}) => {
    const result = await db.insert(referralCodes).values({
        id: nanoid(),
        name: data.name,
        code: data.code,
        userId: data.userId,
        commissionRate: data.commissionRate,
        updatedAt: new Date(),
    }).returning();

    return result[0];
};

export const getReferralCodeById = async (id: string) => {
    return await db.query.referralCodes.findFirst({
        where: eq(referralCodes.id, id),
    });
};

export const getReferralCodeByCode = async (code: string) => {
    return await db.query.referralCodes.findFirst({
        where: eq(referralCodes.code, code),
    });
};

export const deleteReferralCodeById = async (id: string) => {
    const result = await db.delete(referralCodes).where(eq(referralCodes.id, id)).returning();
    return result.length > 0;
};

export const getReferralCodesCount = async (userId: string) => {
    const result = await db.select({ value: count() })
        .from(referralCodes)
        .where(eq(referralCodes.userId, userId));
    return result[0]?.value || 0;
};

// Helper function to get user by invitorId (used for friend count)
export const getUsersByInvitorId = async (invitorId: string) => {
    return await db.query.users.findMany({
        where: eq(users.invitorId, invitorId),
    });
};

export default {
    getReferralCodes,
    getReferralCodeById,
    getReferralCodeByCode,
    createReferralCode,
    deleteReferralCodeById,
    getReferralCodesCount,
    getUsersByInvitorId,
};