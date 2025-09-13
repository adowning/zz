import { customType, pgEnum, pgTable, serial, text, boolean, timestamp, integer, jsonb, decimal, doublePrecision } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { relations } from 'drizzle-orm';

export const customBytes = customType<{ data: Buffer }>({
	dataType() {
		return 'bytea';
	},
	fromDriver(value: unknown) {
		if (Buffer.isBuffer(value)) return value
		throw new Error('Expected Buffer')
	},
	toDriver(value: Buffer) {
		return value
	}
});

export const gameProviderNameEnum = pgEnum('GameProviderName', ['pragmaticplay', 'evoplay', 'netent', 'playngo', 'relaxgaming', 'hacksaw', 'bgaming', 'spribe', 'internal', 'redtiger', 'netgame', 'bigfishgames', 'cqnine', 'nolimit', 'kickass']);

export const paymentMethodEnum = pgEnum('PaymentMethod', ['INSTORE_CASH', 'INSTORE_CARD', 'CASH_APP']);

export const permissionEnum = pgEnum('Permission', ['read', 'write', 'upload', 'manage_users', 'manage_settings', 'launch_game']);

export const statusEnum = pgEnum('Status', ['ACTIVE', 'INACTIVE', 'BANNED']);

export const roleEnum = pgEnum('Role', ['USER', 'ADMIN', 'VIP', 'MODERATOR', 'SYSTEM', 'OWNER', 'MEMBER', 'OPERATOR', 'SUPPORT_AGENT']);

export const tournamentStatusEnum = pgEnum('TournamentStatus', ['PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED']);

export const transactionStatusEnum = pgEnum('TransactionStatus', ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED', 'EXPIRED', 'REJECTED', 'REQUIRES_ACTION', 'ON_HOLD']);

export const typeOfJackpotEnum = pgEnum('TypeOfJackpot', ['MINOR', 'MAJOR', 'GRAND']);

export const typeOfTransactionEnum = pgEnum('TypeOfTransaction', ['DEPOSIT', 'WITHDRAWAL', 'BET', 'WIN', 'TRANSFER_SENT', 'TRANSFER_RECEIVED', 'SYSTEM_ADJUSTMENT_CREDIT', 'SYSTEM_ADJUSTMENT_DEBIT', 'TOURNAMENT_BUYIN', 'TOURNAMENT_PRIZE', 'AFFILIATE_COMMISSION', 'REFUND', 'FEE', 'BONUS_AWARD', 'BET_PLACE', 'BET_WIN', 'BET_LOSE', 'BET_REFUND', 'BONUS_WAGER', 'BONUS_CONVERT', 'BONUS_EXPIRED', 'XP_AWARD', 'ADJUSTMENT_ADD', 'ADJUSTMENT_SUB', 'INTERNAL_TRANSFER', 'PRODUCT_PURCHASE', 'REBATE_PAYOUT', 'JACKPOT_WIN', 'JACKPOT_CONTRIBUTION']);

export const userRoleEnum = pgEnum('UserRole', ['USER', 'ADMIN', 'MODERATOR', 'SUPPORT', 'BOT', 'SYSTEM']);

export const gameCategoriesEnum = pgEnum('game_categories', ['slots', 'fish', 'table', 'live', 'poker', 'lottery', 'virtual', 'other']);

export const messageTypeEnum = pgEnum('message_type', ['update:wallet', 'update:vip', 'update:balance', 'update:gameSession']);

export const sessionStatusEnum = pgEnum('session_status', ['ACTIVE', 'COMPLETED', 'EXPIRED', 'ABANDONED', 'TIMEOUT', 'OTP_PENDING']);

export const updateTypeEnum = pgEnum('update_type', ['BINARY', 'OTA']);

export const appVersions = pgTable('app_versions', { id: serial('id').primaryKey(), appId: text('app_id').notNull(), version: text('version').notNull(), platform: text('platform').notNull(), updateType: text('update_type').notNull(), downloadUrl: text('download_url').notNull(), changelog: text('changelog').array().notNull(), mandatory: boolean('mandatory').default(false).notNull(), releaseDate: timestamp('release_date', { mode: 'date', precision: 3 }).notNull(), fileSize: integer('file_size').notNull(), checksum: text('checksum').notNull() });

export const authSessions = pgTable('auth_sessions', { id: text('id').$defaultFn(() => nanoid()).primaryKey(), userId: text('user_id').notNull(), status: sessionStatusEnum('status').default('ACTIVE').notNull(), ipAddress: text('ip_address'), userAgent: text('user_agent'), deviceId: text('device_id'), createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull(), expiresAt: timestamp('expires_at', { mode: 'date', precision: 3 }), lastSeen: timestamp('last_seen', { mode: 'date', precision: 3 }).defaultNow().notNull(), otp: text('otp') });

export const blackjackBets = pgTable('blackjack_bets', { id: text('id').$defaultFn(() => nanoid()).primaryKey(), userId: text('user_id').notNull(), gameId: text('game_id').notNull(), seat: integer('seat').notNull(), amount: jsonb('amount').notNull(), cards: jsonb('cards'), cardsLeft: jsonb('cards_left'), cardsRight: jsonb('cards_right'), actions: jsonb('actions'), createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull() });

export const blackjackGames = pgTable('blackjack_games', { id: text('id').$defaultFn(() => nanoid()).primaryKey(), table: integer('table').notNull(), type: text('type').notNull(), state: text('state').notNull(), deck: jsonb('deck'), dealerCards: jsonb('dealer_cards'), fair: jsonb('fair'), createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull(), updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).defaultNow().notNull() });

export const blackjackMessages = pgTable('blackjack_message', { id: text('id').$defaultFn(() => nanoid()).primaryKey(), event: text('event'), requestId: text('request_id'), payload: jsonb('payload'), createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull() });

export const deposits = pgTable('deposits', { id: text('id').$defaultFn(() => nanoid()).primaryKey(), userId: text('user_id'), amount: integer('amount'), status: text('status'), idNumber: text('id_number'), firstName: text('first_name'), lastName: text('last_name'), channelsId: text('channels_id'), note: text('note'), currency: text('currency'), createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull(), updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).defaultNow().notNull() });

export const gameSessions = pgTable('game_sessions', { id: text('id').$defaultFn(() => nanoid()).primaryKey(), authSessionId: text('auth_session_id').notNull(), userId: text('user_id').notNull(), gameId: text('game_id'), gameName: text('game_name'), status: sessionStatusEnum('status').default('ACTIVE').notNull(), totalWagered: integer('total_wagered').default(0).notNull(), totalWon: integer('total_won').default(0).notNull(), totalXpGained: integer('total_xp_gained').default(0).notNull(), rtp: decimal('rtp', { precision: 65, scale: 30 }), phpGameData: jsonb('php_game_data'), duration: integer('duration').default(0).notNull(), createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull(), endAt: timestamp('end_at', { mode: 'date', precision: 3 }), startingBalance: integer('starting_balance').default(0).notNull() });

export const gameSpins = pgTable('game_spins', { id: text('id').$defaultFn(() => nanoid()).primaryKey(), playerName: text('player_name'), gameName: text('game_name'), gameId: text('game_id'), spinData: text('spin_data'), grossWinAmount: doublePrecision('gross_win_amount').notNull(), wagerAmount: doublePrecision('wager_amount').notNull(), spinNumber: integer('spin_number').default(0).notNull(), playerAvatar: text('player_avatar'), currencyId: text('currency_id'), sessionId: text('session_id').notNull(), userId: text('user_id'), createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull(), updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).defaultNow().notNull(), occurredAt: timestamp('occurred_at', { mode: 'date', precision: 3 }).notNull(), sessionDataId: text('sessionDataId'), type: text('type'), operatorId: text('operator_id'), status: text('status'), playerBalanceAtStart: integer('player_balance_at_start').default(0).notNull(), playerBalance: integer('player_balance').default(0).notNull(), gamePlayerWinTotalTodayid: integer('game_player_win_total_todayid').default(0).notNull(), playerBetTotalToday: integer('player_bet_total_today').default(0).notNull(), sessionTotalWinAmount: integer('session_total_win_amount').default(0).notNull(), sessionTotalBetAmount: integer('session_total_bet_amount').default(0).notNull(), gameSessionRtp: integer('game_session_rtp').default(0).notNull(), playerRtpToday: integer('player_rtp_today').default(0).notNull(), winAmount: integer('win_amount').default(0).notNull(), betAmount: integer('bet_amount').default(0).notNull() });

export const games = pgTable('games', { id: text('id').$defaultFn(() => nanoid()).primaryKey(), name: text('name').notNull(), title: text('title').notNull(), description: text('description'), category: text('category').default('slots').notNull(), tags: text('tags').notNull(), thumbnailUrl: text('thumbnail_url'), bannerUrl: text('banner_url'), developer: text('developer').notNull(), providerId: text('provider_id'), totalWagered: integer('total_wagered').notNull(), totalWon: integer('total_won').notNull(), goldsvetData: jsonb('goldsvet_data'), targetRtp: integer('target_rtp'), isFeatured: boolean('is_featured').notNull(), isActive: boolean('is_active').default(true).notNull(), operatorId: text('operator_id'), isHorizontal: boolean('isHorizontal').default(false).notNull(), createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull(), updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).defaultNow().notNull(), status: integer('status').default(0).notNull() });

export const jackpotContributions = pgTable('jackpot_contributions', { id: text('id').$defaultFn(() => nanoid()).primaryKey(), jackpotId: text('jackpot_id').notNull(), userId: text('user_id'), gameSpinId: text('game_spin_id').notNull(), contributionAmountCoins: integer('contribution_amount_coins').notNull(), createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull() });

export const jackpotWins = pgTable('jackpot_wins', { id: text('id').$defaultFn(() => nanoid()).primaryKey(), jackpotId: text('jackpot_id').notNull(), winnerId: text('winner_id').notNull(), winAmountCoins: integer('win_amount_coins').notNull(), gameSpinId: text('game_spin_id').notNull(), transactionId: text('transaction_id'), createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull(), sessionDataId: text('session_data_id') });

export const jackpots = pgTable('jackpots', { id: text('id').$defaultFn(() => nanoid()).primaryKey(), type: text('type').notNull(), currentAmountCoins: integer('current_amount_coins').notNull(), seedAmountCoins: integer('seed_amount_coins').notNull(), minimumBetCoins: integer('minimum_bet_coins').default(1).notNull(), contributionRateBasisPoints: integer('contribution_rate_basis_points').notNull(), probabilityPerMillion: integer('probability_per_million').notNull(), minimumTimeBetweenWinsMinutes: integer('minimum_time_between_wins_minutes').notNull(), lastWonAt: timestamp('last_won_at', { mode: 'date', precision: 3 }), lastWonBy: text('last_won_by'), isActive: boolean('is_active').default(true).notNull(), createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull(), updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).defaultNow().notNull() });

export const operators = pgTable('operators', { id: text('id').$defaultFn(() => nanoid()).primaryKey(), name: text('name').notNull(), operatorSecret: text('operator_secret').notNull(), operatorAccess: text('operator_access').notNull(), callbackUrl: text('callback_url').notNull(), isActive: boolean('is_active').default(true).notNull(), allowedIps: text('allowed_ips').notNull(), description: text('description'), productIds: text('product_ids'), balance: integer('balance').notNull(), netRevenue: integer('net_revenue').default(0).notNull(), acceptedPayments: text('accepted_payments').array().notNull(), ownerId: text('owner_id'), lastUsedAt: timestamp('last_used_at', { mode: 'date', precision: 3 }), createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull(), updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).defaultNow().notNull(), goldsvetData: jsonb('goldsvet_data') });

export const operatorSwitchHistories = pgTable('operator_switch_history', { id: text('id').$defaultFn(() => nanoid()).primaryKey(), userId: text('user_id').notNull(), fromOperatorId: text('from_operator_id'), toOperatorId: text('to_operator_id').notNull(), switchedAt: timestamp('switched_at', { mode: 'date', precision: 3 }).defaultNow().notNull() });

export const products = pgTable('products', { id: text('id').$defaultFn(() => nanoid()).primaryKey(), title: text('title').default('default').notNull(), productType: text('product_type').default('bundle').notNull(), bonusTotalInCredits: integer('bonus_total_in_credits').notNull(), isActive: boolean('is_active'), priceInCents: integer('price_in_cents').notNull(), amountToReceiveInCredits: integer('amount_to_receive_in_credits').notNull(), bestValue: integer('best_value').notNull(), discountInCents: integer('discount_in_cents').notNull(), bonusSpins: integer('bonus_spins').notNull(), isPromo: boolean('is_promo'), totalDiscountInCents: integer('total_discount_in_cents').notNull(), operatorId: text('operator_id'), createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull(), updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).defaultNow().notNull() });

export const transactions = pgTable('transactions', { id: text('id').$defaultFn(() => nanoid()).primaryKey(), processedAt: timestamp('processed_at', { mode: 'date', precision: 3 }), walletId: text('wallet_id'), type: text('type').notNull(), status: text('status').default('PENDING').notNull(), amount: integer('amount').notNull(), netAmount: integer('net_amount'), currencyName: text('currency_name'), feeAmount: integer('fee_amount'), productId: text('product_id'), paymentMethod: text('payment_method'), balanceBefore: integer('balance_before'), balanceAfter: integer('balance_after'), bonusBalanceBefore: integer('bonus_balance_before'), bonusBalanceAfter: integer('bonus_balance_after'), bonusAmount: integer('bonus_amount'), wageringRequirement: integer('wagering_requirement'), wageringProgress: integer('wagering_progress'), description: text('description'), provider: text('provider'), providerTxId: text('provider_tx_id'), relatedGameId: text('related_game_id'), relatedRoundId: text('related_round_id'), createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull(), updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).defaultNow().notNull(), operatorId: text('operator_id'), userId: text('user_id').notNull() });

export const users = pgTable('users', { id: text('id').$defaultFn(() => nanoid()).primaryKey(), username: text('username').notNull(), email: text('email'), passwordHash: text('password_hash'), accessToken: text('access_token'), refreshToken: text('refresh_token'), accessTokenExpiresAt: timestamp('access_token_expires_at', { mode: 'date', precision: 3 }), refreshTokenExpiresAt: timestamp('refresh_token_expires_at', { mode: 'date', precision: 3 }), currentGameSessionDataId: text('current_game_session_data_id'), currentAuthSessionDataId: text('current_auth_session_data_id'), avatarUrl: text('avatar_url').default('avatar-01').notNull(), role: text('role').default('USER').notNull(), isActive: boolean('is_active').default(true).notNull(), lastLoginAt: timestamp('last_login_at', { mode: 'date', precision: 3 }), totalXpGained: integer('total_xp_gained').notNull(), vipInfoId: text('vip_info_id'), createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull(), updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).defaultNow().notNull(), deletedAt: timestamp('deleted_at', { mode: 'date', precision: 3 }), lastSeen: timestamp('last_seen', { mode: 'date', precision: 3 }), rtgBlockTime: integer('rtg_block_time').default(0).notNull(), phone: text('phone'), path: text('path').array().default([]).notNull(), invitorId: text('invitor_id'), avatar: text('avatar').default('avatar1.png').notNull(), status: statusEnum('status').default('ACTIVE').notNull(), activeWalletId: text('active_wallet_id'), activeOperatorId: text('activeOperatorId'), inviteCode: text('inviteCode') });

export const referralCodes = pgTable('referral_codes', { id: text('id').primaryKey(), code: text('code').notNull(), name: text('name').default('').notNull(), commissionRate: doublePrecision('commissionRate').notNull(), createdAt: timestamp('createdAt', { mode: 'date', precision: 3 }).defaultNow().notNull(), updatedAt: timestamp('updatedAt', { mode: 'date', precision: 3 }).notNull(), userId: text('userId').notNull() });

export const vipRanks = pgTable('vip_ranks', { id: integer('id').primaryKey(), name: text('name').notNull(), minXp: integer('minXp').notNull(), dailyBonusCoinPct: integer('dailyBonusCoinPct').notNull(), hourlyBonusCoinPct: integer('hourlyBonusCoinPct').notNull(), purchaseBonusCoinPct: integer('purchaseBonusCoinPct').notNull(), levelUpBonusCoinPct: integer('levelUpBonusCoinPct').notNull(), hasConcierge: boolean('hasConcierge').notNull(), hasVipLoungeAccess: boolean('hasVipLoungeAccess').notNull(), isInvitationOnly: boolean('isInvitationOnly').notNull() });

export const vipInfos = pgTable('vip_info', { id: text('id').$defaultFn(() => nanoid()).primaryKey(), level: integer('level').default(1).notNull(), xp: integer('xp').notNull(), totalXp: integer('totalXp').notNull(), userId: text('userId').notNull(), currentRankid: integer('currentRankid'), createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull(), updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).defaultNow().notNull() });

export const vipLevelUpHistories = pgTable('vip_level_up_history', { id: text('id').$defaultFn(() => nanoid()).primaryKey(), previousLevel: integer('previous_level').notNull(), newLevel: integer('new_level').notNull(), timestamp: timestamp('timestamp', { mode: 'date', precision: 3 }).defaultNow().notNull(), VipInfoId: text('VipInfo_id').notNull() });

export const wallets = pgTable('wallets', { id: text('id').$defaultFn(() => nanoid()).primaryKey(), balance: integer('balance').default(0).notNull(), paymentMethod: text('payment_method').default('INSTORE_CASH').notNull(), currency: text('currency').default('USD').notNull(), address: text('address'), cashtag: text('cashtag'), operatorId: text('operator_id').notNull(), lastUsedAt: timestamp('last_used_at', { mode: 'date', precision: 3 }), createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull(), updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).defaultNow().notNull(), userId: text('user_id').notNull() });

export const withdrawals = pgTable('withdrawals', { id: text('id').$defaultFn(() => nanoid()).primaryKey(), userId: text('user_id'), amount: integer('amount'), status: text('status'), idNumber: text('id_number'), firstName: text('first_name'), lastName: text('last_name'), channelsId: text('channels_id'), note: text('note'), currencyType: text('currency_type'), currency: text('currency'), createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull(), updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).defaultNow().notNull() });

export const vipTiers = pgTable('vip_tiers', { id: text('id').primaryKey(), tiersName: text('tiers_name').notNull(), icon: text('icon').notNull(), order: integer('order').notNull(), weeklyCashback: boolean('weekly_cashback').default(false).notNull(), weeklyCashbackMin: integer('weekly_cashback_min').default(0).notNull(), weeklyCashbackPercent: integer('weekly_cashback_percent').default(0).notNull(), monthlyCashback: boolean('monthly_cashback').default(false).notNull(), monthlyCashbackMin: integer('monthly_cashback_min').default(0).notNull(), monthlyCashbackPercent: integer('monthly_cashback_percent').default(0).notNull(), levelUpBonus: integer('level_up_bonus').default(0).notNull(), noFeeWithdrawal: boolean('no_fee_withdrawal').default(false).notNull() });

export const vipLevels = pgTable('vip_levels', { id: text('id').primaryKey(), parentId: text('parent_id').notNull(), levelName: text('level_name').notNull(), xp: integer('xp').notNull(), settingId: integer('settingId').notNull() });

export const vipCashbacks = pgTable('vip_cashback', { id: text('id').primaryKey(), userId: text('user_id').notNull(), amount: integer('amount').notNull(), currency: text('currency').notNull(), tiersName: text('tiers_name').notNull(), type: text('type').notNull(), createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull() });

export const vipLevelUpBonuses = pgTable('vip_level_up_bonus', { id: text('id').primaryKey(), userId: text('user_id').notNull(), amount: integer('amount').notNull(), levelName: text('level_name').notNull(), levelXp: integer('level_xp').notNull(), createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull() });

export const vipSpinPrizes = pgTable('vip_spin_prizes', { id: text('id').primaryKey(), tiersId: text('tiers_id').notNull(), prizes: jsonb('prizes').notNull() });

export const vipSpinRewards = pgTable('vip_spin_rewards', { id: text('id').primaryKey(), userId: text('user_id').notNull(), amount: integer('amount').notNull(), currency: text('currency').notNull(), createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull() });

export const affiliates = pgTable('affiliates', { id: text('id').primaryKey(), username: text('username').notNull(), firstName: text('first_name').notNull(), lastName: text('last_name').notNull(), status: text('status').notNull(), email: text('email').notNull(), role: text('role').notNull(), referralCode: text('referral_code').notNull(), parentId: text('parent_id'), path: text('path').array().default([]).notNull(), password: text('password').notNull(), createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull(), updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).notNull() });

export const affiliateLogs = pgTable('affiliate_logs', { id: text('id').primaryKey(), invitorId: text('invitor_id').notNull(), childId: text('child_id').notNull(), currency: text('currency').notNull(), referralCode: text('referral_code').notNull(), betAmount: doublePrecision('bet_amount').default(0).notNull(), commissionAmount: doublePrecision('commission_amount').default(0).notNull(), commissionWager: doublePrecision('commission_wager').default(0).notNull(), totalReferralAmount: doublePrecision('total_referral_amount').default(0).notNull(), referralAmount: doublePrecision('referral_amount').default(0).notNull(), referralWager: doublePrecision('referral_wager').default(0).notNull(), lastVipLevelAmount: doublePrecision('last_vip_level_amount').default(0).notNull(), createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull(), updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).notNull() });

export const settings = pgTable('settings', { id: serial('id').primaryKey(), name: text('name').default('setting').notNull(), referralCodeCount: integer('referralCodeCount').default(20).notNull(), referralCommissionRate: doublePrecision('referralCommissionRate').default(0.25).notNull(), rates: jsonb('rates').default([{"USD": 1}]).notNull(), createdAt: timestamp('createdAt', { mode: 'date', precision: 3 }).defaultNow().notNull(), updatedAt: timestamp('updatedAt', { mode: 'date', precision: 3 }).notNull() });

export const commissions = pgTable('commissions', { id: serial('id').primaryKey(), master: doublePrecision('master').default(30).notNull(), affiliate: doublePrecision('affiliate').default(20).notNull(), subAffiliate: doublePrecision('subAffiliate').default(10).notNull(), settingId: integer('settingId').notNull() });

export const currencies = pgTable('Currency', { id: text('id').primaryKey() });

export const balances = pgTable('balances', { id: serial('id').primaryKey(), amount: integer('amount').default(0).notNull(), pending: integer('pending').default(0).notNull(), bonus: integer('bonus').default(0).notNull(), withdrawable: integer('withdrawable').default(0).notNull(), turnover: integer('turnover').default(0).notNull(), createdAt: timestamp('createdAt', { mode: 'date', precision: 3 }).defaultNow().notNull(), updatedAt: timestamp('updatedAt', { mode: 'date', precision: 3 }).notNull(), userId: text('userId').notNull(), currencyId: text('currencyId').notNull() });

export const authSessionsRelations = relations(authSessions, (helpers) => ({ users: helpers.one(users, { relationName: 'AuthSessionsToUsers', fields: [ authSessions.userId ], references: [ users.id ] }), gameSessions: helpers.many(gameSessions, { relationName: 'AuthSessionsToGameSessions' }) }));

export const blackjackBetsRelations = relations(blackjackBets, (helpers) => ({ blackjackGames: helpers.one(blackjackGames, { relationName: 'BlackjackBetsToBlackjackGames', fields: [ blackjackBets.gameId ], references: [ blackjackGames.id ] }), users: helpers.one(users, { relationName: 'BlackjackBetsToUsers', fields: [ blackjackBets.userId ], references: [ users.id ] }) }));

export const blackjackGamesRelations = relations(blackjackGames, (helpers) => ({ blackjackBets: helpers.many(blackjackBets, { relationName: 'BlackjackBetsToBlackjackGames' }) }));

export const depositsRelations = relations(deposits, (helpers) => ({ users: helpers.one(users, { relationName: 'DepositsToUsers', fields: [ deposits.userId ], references: [ users.id ] }) }));

export const gameSessionsRelations = relations(gameSessions, (helpers) => ({ authSessions: helpers.one(authSessions, { relationName: 'AuthSessionsToGameSessions', fields: [ gameSessions.authSessionId ], references: [ authSessions.id ] }), users: helpers.one(users, { relationName: 'GameSessionsToUsers', fields: [ gameSessions.userId ], references: [ users.id ] }) }));

export const gameSpinsRelations = relations(gameSpins, (helpers) => ({ jackpotContributions: helpers.many(jackpotContributions, { relationName: 'GameSpinsToJackpotContributions' }), jackpotWins: helpers.one(jackpotWins) }));

export const gamesRelations = relations(games, (helpers) => ({ operators: helpers.one(operators, { relationName: 'GamesToOperators', fields: [ games.operatorId ], references: [ operators.id ] }) }));

export const jackpotContributionsRelations = relations(jackpotContributions, (helpers) => ({ gameSpins: helpers.one(gameSpins, { relationName: 'GameSpinsToJackpotContributions', fields: [ jackpotContributions.gameSpinId ], references: [ gameSpins.id ] }), jackpots: helpers.one(jackpots, { relationName: 'JackpotContributionsToJackpots', fields: [ jackpotContributions.jackpotId ], references: [ jackpots.id ] }) }));

export const jackpotWinsRelations = relations(jackpotWins, (helpers) => ({ gameSpins: helpers.one(gameSpins, { relationName: 'GameSpinsToJackpotWins', fields: [ jackpotWins.gameSpinId ], references: [ gameSpins.id ] }), jackpots: helpers.one(jackpots, { relationName: 'JackpotWinsToJackpots', fields: [ jackpotWins.jackpotId ], references: [ jackpots.id ] }), user: helpers.one(users, { relationName: 'JackpotWinsToUsers', fields: [ jackpotWins.winnerId ], references: [ users.id ] }) }));

export const jackpotsRelations = relations(jackpots, (helpers) => ({ jackpotContributions: helpers.many(jackpotContributions, { relationName: 'JackpotContributionsToJackpots' }), jackpotWins: helpers.many(jackpotWins, { relationName: 'JackpotWinsToJackpots' }) }));

export const operatorsRelations = relations(operators, (helpers) => ({ games: helpers.many(games, { relationName: 'GamesToOperators' }), products: helpers.many(products, { relationName: 'OperatorsToProducts' }), users: helpers.many(users, { relationName: 'OperatorsToUsers' }), switchedFromHistory: helpers.many(operatorSwitchHistories, { relationName: 'SwitchedFrom' }), switchedToHistory: helpers.many(operatorSwitchHistories, { relationName: 'SwitchedTo' }), Wallets: helpers.many(wallets, { relationName: 'OperatorsToWallets' }) }));

export const operatorSwitchHistoriesRelations = relations(operatorSwitchHistories, (helpers) => ({ user: helpers.one(users, { relationName: 'OperatorSwitchHistoryToUsers', fields: [ operatorSwitchHistories.userId ], references: [ users.id ] }), fromOperator: helpers.one(operators, { relationName: 'SwitchedFrom', fields: [ operatorSwitchHistories.fromOperatorId ], references: [ operators.id ] }), toOperator: helpers.one(operators, { relationName: 'SwitchedTo', fields: [ operatorSwitchHistories.toOperatorId ], references: [ operators.id ] }) }));

export const productsRelations = relations(products, (helpers) => ({ operators: helpers.one(operators, { relationName: 'OperatorsToProducts', fields: [ products.operatorId ], references: [ operators.id ] }), transactions: helpers.many(transactions, { relationName: 'ProductsToTransactions' }) }));

export const transactionsRelations = relations(transactions, (helpers) => ({ products: helpers.one(products, { relationName: 'ProductsToTransactions', fields: [ transactions.productId ], references: [ products.id ] }), wallets: helpers.one(wallets, { relationName: 'TransactionsToWallets', fields: [ transactions.walletId ], references: [ wallets.id ] }) }));

export const usersRelations = relations(users, (helpers) => ({ authSessions: helpers.many(authSessions, { relationName: 'AuthSessionsToUsers' }), blackjackBets: helpers.many(blackjackBets, { relationName: 'BlackjackBetsToUsers' }), deposits: helpers.many(deposits, { relationName: 'DepositsToUsers' }), gameSessions: helpers.many(gameSessions, { relationName: 'GameSessionsToUsers' }), jackpotWins: helpers.many(jackpotWins, { relationName: 'JackpotWinsToUsers' }), activeWallet: helpers.one(wallets, { relationName: 'ActiveWalletForUser', fields: [ users.activeWalletId ], references: [ wallets.id ] }), wallets: helpers.many(wallets, { relationName: 'AllWalletsForUser' }), vipInfo: helpers.one(vipInfos), withdrawals: helpers.many(withdrawals, { relationName: 'UsersToWithdrawals' }), ops: helpers.one(operators, { relationName: 'OperatorsToUsers', fields: [ users.activeOperatorId ], references: [ operators.id ] }), operatorSwitchHistory: helpers.many(operatorSwitchHistories, { relationName: 'OperatorSwitchHistoryToUsers' }), vipCashbacks: helpers.many(vipCashbacks, { relationName: 'UsersToVipCashback' }), vipLevelUpBonuses: helpers.many(vipLevelUpBonuses, { relationName: 'UsersToVipLevelUpBonus' }), vipSpinRewards: helpers.many(vipSpinRewards, { relationName: 'UsersToVipSpinReward' }), affiliateLogsInvited: helpers.many(affiliateLogs, { relationName: 'Invitor' }), affiliateLogsReferred: helpers.many(affiliateLogs, { relationName: 'Child' }), referralCodes: helpers.many(referralCodes, { relationName: 'ReferralCodeToUsers' }), balances: helpers.many(balances, { relationName: 'BalanceToUsers' }) }));

export const referralCodesRelations = relations(referralCodes, (helpers) => ({ user: helpers.one(users, { relationName: 'ReferralCodeToUsers', fields: [ referralCodes.userId ], references: [ users.id ] }) }));

export const vipRanksRelations = relations(vipRanks, (helpers) => ({ VipInfo: helpers.many(vipInfos, { relationName: 'VipInfoToVipRank' }) }));

export const vipInfosRelations = relations(vipInfos, (helpers) => ({ vipRank: helpers.one(vipRanks, { relationName: 'VipInfoToVipRank', fields: [ vipInfos.currentRankid ], references: [ vipRanks.id ] }), users: helpers.one(users, { relationName: 'UsersToVipInfo', fields: [ vipInfos.userId ], references: [ users.id ] }), vipLevelUpHistory: helpers.many(vipLevelUpHistories, { relationName: 'VipInfoToVipLevelUpHistory' }) }));

export const vipLevelUpHistoriesRelations = relations(vipLevelUpHistories, (helpers) => ({ VipInfo: helpers.one(vipInfos, { relationName: 'VipInfoToVipLevelUpHistory', fields: [ vipLevelUpHistories.VipInfoId ], references: [ vipInfos.id ] }) }));

export const walletsRelations = relations(wallets, (helpers) => ({ operator: helpers.one(operators, { relationName: 'OperatorsToWallets', fields: [ wallets.operatorId ], references: [ operators.id ] }), transactions: helpers.many(transactions, { relationName: 'TransactionsToWallets' }), user: helpers.one(users, { relationName: 'AllWalletsForUser', fields: [ wallets.userId ], references: [ users.id ] }), activeForUser: helpers.one(users) }));

export const withdrawalsRelations = relations(withdrawals, (helpers) => ({ users: helpers.one(users, { relationName: 'UsersToWithdrawals', fields: [ withdrawals.userId ], references: [ users.id ] }) }));

export const vipTiersRelations = relations(vipTiers, (helpers) => ({ levels: helpers.many(vipLevels, { relationName: 'VipLevelToVipTiers' }), spinPrizes: helpers.many(vipSpinPrizes, { relationName: 'VipSpinPrizeToVipTiers' }) }));

export const vipLevelsRelations = relations(vipLevels, (helpers) => ({ parent: helpers.one(vipTiers, { relationName: 'VipLevelToVipTiers', fields: [ vipLevels.parentId ], references: [ vipTiers.id ] }), setting: helpers.one(settings, { relationName: 'SettingToVipLevel', fields: [ vipLevels.settingId ], references: [ settings.id ] }) }));

export const vipCashbacksRelations = relations(vipCashbacks, (helpers) => ({ user: helpers.one(users, { relationName: 'UsersToVipCashback', fields: [ vipCashbacks.userId ], references: [ users.id ] }) }));

export const vipLevelUpBonusesRelations = relations(vipLevelUpBonuses, (helpers) => ({ user: helpers.one(users, { relationName: 'UsersToVipLevelUpBonus', fields: [ vipLevelUpBonuses.userId ], references: [ users.id ] }) }));

export const vipSpinPrizesRelations = relations(vipSpinPrizes, (helpers) => ({ tiers: helpers.one(vipTiers, { relationName: 'VipSpinPrizeToVipTiers', fields: [ vipSpinPrizes.tiersId ], references: [ vipTiers.id ] }) }));

export const vipSpinRewardsRelations = relations(vipSpinRewards, (helpers) => ({ user: helpers.one(users, { relationName: 'UsersToVipSpinReward', fields: [ vipSpinRewards.userId ], references: [ users.id ] }) }));

export const affiliatesRelations = relations(affiliates, (helpers) => ({ parent: helpers.one(affiliates, { relationName: 'AffiliateTree', fields: [ affiliates.parentId ], references: [ affiliates.id ] }), children: helpers.many(affiliates, { relationName: 'AffiliateTree' }) }));

export const affiliateLogsRelations = relations(affiliateLogs, (helpers) => ({ invitor: helpers.one(users, { relationName: 'Invitor', fields: [ affiliateLogs.invitorId ], references: [ users.id ] }), child: helpers.one(users, { relationName: 'Child', fields: [ affiliateLogs.childId ], references: [ users.id ] }) }));

export const settingsRelations = relations(settings, (helpers) => ({ vipLevels: helpers.many(vipLevels, { relationName: 'SettingToVipLevel' }), commission: helpers.one(commissions) }));

export const commissionsRelations = relations(commissions, (helpers) => ({ setting: helpers.one(settings, { relationName: 'CommissionToSetting', fields: [ commissions.settingId ], references: [ settings.id ] }) }));

export const currenciesRelations = relations(currencies, (helpers) => ({ balances: helpers.many(balances, { relationName: 'BalanceToCurrency' }) }));

export const balancesRelations = relations(balances, (helpers) => ({ user: helpers.one(users, { relationName: 'BalanceToUsers', fields: [ balances.userId ], references: [ users.id ] }), currency: helpers.one(currencies, { relationName: 'BalanceToCurrency', fields: [ balances.currencyId ], references: [ currencies.id ] }) }));