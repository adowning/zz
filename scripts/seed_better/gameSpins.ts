import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { gameSessions, gameSpins,  } from '../../api/db';
import * as schema from '../../api/db';
import { rand, randFloat, randNumber, randPastDate } from '@ngneat/falso';

export async function seedGameSpins(db: NodePgDatabase<typeof schema>) {
    console.log('🔄 Seeding game sessions and spins...');

    const allAuthSessions = await db.query.authSessions.findMany();
    const allGames = await db.query.games.findMany({
        columns: { id: true, name: true },
    });

    if (allAuthSessions.length === 0 || allGames.length === 0) {
        console.log('⚠️ Cannot seed game sessions without auth sessions and games. Skipping.');
        return;
    }

    const sessionsToInsert: (typeof gameSessions.$inferInsert)[] = [];
    for (const authSession of allAuthSessions) {
        const sessionCount = randNumber({ min: 1, max: 5 });
        for (let i = 0; i < sessionCount; i++) {
            const createdAt = randPastDate({ years: 1 });
            
            const sessionData: typeof gameSessions.$inferInsert = {
                userId: authSession.userId,
                authSessionId: authSession.id,
                gameId: rand(allGames).id,
                status: 'COMPLETED',
                createdAt: createdAt,

                endAt: new Date(createdAt.getTime() + randNumber({ min: 60000, max: 3600000 })),
            };
            sessionsToInsert.push(sessionData);
        }
    }

    if (sessionsToInsert.length === 0) {
        console.log('ℹ️ No new game sessions to seed.');
        return;
    }
    
    console.log(`🌱 Creating ${sessionsToInsert.length} game sessions...`);
    const createdSessions = await db
        .insert(gameSessions)
        .values(sessionsToInsert)
        .returning();

    const spinsToInsert: (typeof gameSpins.$inferInsert)[] = [];
    for (const session of createdSessions) {
        const spinCount = randNumber({ min: 5, max: 50 });
        const user = await db.query.users.findFirst({ where: (users, { eq }) => eq(users.id, session.userId) });
        const game = allGames.find((g) => g.id === session.gameId);

        if (!user || !game) continue;

        for (let i = 0; i < spinCount; i++) {
            const wagerAmount = randFloat({ min: 0.1, max: 5, fraction: 2 });
            const grossWinAmount = rand([
                0, 0, 0,
                randFloat({ min: 0.01, max: wagerAmount * 100, fraction: 2 }),
            ]);

            spinsToInsert.push({
                playerName: user.username,
                gameName: game.name,
                spinData: `${game.name}::${grossWinAmount}`, //{ lines: 10, multiplier: grossWinAmount > 0 ? grossWinAmount / wagerAmount : 0 },
                grossWinAmount,
                wagerAmount,
                spinNumber: i + 1,
                playerAvatar: user.avatarUrl,
                sessionId: session.id,
                userId: user.id,
                occurredAt: randPastDate({ years: 1 }),
            });
        }
    }
    
    if (spinsToInsert.length > 0) {
        await db.insert(gameSpins).values(spinsToInsert);
        console.log(`✅ Seeded ${spinsToInsert.length} game spins.`);
    } else {
        console.log('ℹ️  No new game spins to seed.');
    }
}
