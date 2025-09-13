CREATE TYPE "public"."game_categories" AS ENUM('slots', 'fish', 'table', 'live', 'poker', 'lottery', 'virtual', 'other');--> statement-breakpoint
CREATE TYPE "public"."GameProviderName" AS ENUM('pragmaticplay', 'evoplay', 'netent', 'playngo', 'relaxgaming', 'hacksaw', 'bgaming', 'spribe', 'internal', 'redtiger', 'netgame', 'bigfishgames', 'cqnine', 'nolimit', 'kickass');--> statement-breakpoint
CREATE TYPE "public"."message_type" AS ENUM('update:wallet', 'update:vip', 'update:balance', 'update:gameSession');--> statement-breakpoint
CREATE TYPE "public"."PaymentMethod" AS ENUM('INSTORE_CASH', 'INSTORE_CARD', 'CASH_APP');--> statement-breakpoint
CREATE TYPE "public"."Permission" AS ENUM('read', 'write', 'upload', 'manage_users', 'manage_settings', 'launch_game');--> statement-breakpoint
CREATE TYPE "public"."Role" AS ENUM('USER', 'ADMIN', 'VIP', 'MODERATOR', 'SYSTEM', 'OWNER', 'MEMBER', 'OPERATOR', 'SUPPORT_AGENT');--> statement-breakpoint
CREATE TYPE "public"."session_status" AS ENUM('ACTIVE', 'COMPLETED', 'EXPIRED', 'ABANDONED', 'TIMEOUT', 'OTP_PENDING');--> statement-breakpoint
CREATE TYPE "public"."Status" AS ENUM('ACTIVE', 'INACTIVE', 'BANNED');--> statement-breakpoint
CREATE TYPE "public"."TournamentStatus" AS ENUM('PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "public"."TransactionStatus" AS ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED', 'EXPIRED', 'REJECTED', 'REQUIRES_ACTION', 'ON_HOLD');--> statement-breakpoint
CREATE TYPE "public"."TypeOfJackpot" AS ENUM('MINOR', 'MAJOR', 'GRAND');--> statement-breakpoint
CREATE TYPE "public"."TypeOfTransaction" AS ENUM('DEPOSIT', 'WITHDRAWAL', 'BET', 'WIN', 'TRANSFER_SENT', 'TRANSFER_RECEIVED', 'SYSTEM_ADJUSTMENT_CREDIT', 'SYSTEM_ADJUSTMENT_DEBIT', 'TOURNAMENT_BUYIN', 'TOURNAMENT_PRIZE', 'AFFILIATE_COMMISSION', 'REFUND', 'FEE', 'BONUS_AWARD', 'BET_PLACE', 'BET_WIN', 'BET_LOSE', 'BET_REFUND', 'BONUS_WAGER', 'BONUS_CONVERT', 'BONUS_EXPIRED', 'XP_AWARD', 'ADJUSTMENT_ADD', 'ADJUSTMENT_SUB', 'INTERNAL_TRANSFER', 'PRODUCT_PURCHASE', 'REBATE_PAYOUT', 'JACKPOT_WIN', 'JACKPOT_CONTRIBUTION');--> statement-breakpoint
CREATE TYPE "public"."update_type" AS ENUM('BINARY', 'OTA');--> statement-breakpoint
CREATE TYPE "public"."UserRole" AS ENUM('USER', 'ADMIN', 'MODERATOR', 'SUPPORT', 'BOT', 'SYSTEM');--> statement-breakpoint
CREATE TABLE "affiliate_logs" (
	"id" text PRIMARY KEY NOT NULL,
	"invitor_id" text NOT NULL,
	"child_id" text NOT NULL,
	"currency" text NOT NULL,
	"referral_code" text NOT NULL,
	"bet_amount" double precision DEFAULT 0 NOT NULL,
	"commission_amount" double precision DEFAULT 0 NOT NULL,
	"commission_wager" double precision DEFAULT 0 NOT NULL,
	"total_referral_amount" double precision DEFAULT 0 NOT NULL,
	"referral_amount" double precision DEFAULT 0 NOT NULL,
	"referral_wager" double precision DEFAULT 0 NOT NULL,
	"last_vip_level_amount" double precision DEFAULT 0 NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "affiliates" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"status" text NOT NULL,
	"email" text NOT NULL,
	"role" text NOT NULL,
	"referral_code" text NOT NULL,
	"parent_id" text,
	"path" text[] NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "app_versions" (
	"id" serial PRIMARY KEY NOT NULL,
	"app_id" text NOT NULL,
	"version" text NOT NULL,
	"platform" text NOT NULL,
	"update_type" text NOT NULL,
	"download_url" text NOT NULL,
	"changelog" text[] NOT NULL,
	"mandatory" boolean DEFAULT false NOT NULL,
	"release_date" timestamp (3) NOT NULL,
	"file_size" integer NOT NULL,
	"checksum" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auth_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"status" "session_status" DEFAULT 'ACTIVE' NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"device_id" text,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"expires_at" timestamp (3),
	"last_seen" timestamp (3) DEFAULT now() NOT NULL,
	"otp" text
);
--> statement-breakpoint
CREATE TABLE "balances" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"currency_id" text NOT NULL,
	"amount" double precision DEFAULT 0 NOT NULL,
	"pending" double precision DEFAULT 0 NOT NULL,
	"bonus" double precision DEFAULT 0 NOT NULL,
	"withdrawable" double precision DEFAULT 0 NOT NULL,
	"turnover" double precision DEFAULT 0 NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blackjack_bets" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"game_id" text NOT NULL,
	"seat" integer NOT NULL,
	"amount" jsonb NOT NULL,
	"cards" jsonb,
	"cards_left" jsonb,
	"cards_right" jsonb,
	"actions" jsonb,
	"created_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blackjack_games" (
	"id" text PRIMARY KEY NOT NULL,
	"table" integer NOT NULL,
	"type" text NOT NULL,
	"state" text NOT NULL,
	"deck" jsonb,
	"dealer_cards" jsonb,
	"fair" jsonb,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blackjack_message" (
	"id" text PRIMARY KEY NOT NULL,
	"event" text,
	"request_id" text,
	"payload" jsonb,
	"created_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "currencies" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"symbol" text,
	"icon" text,
	"status" boolean DEFAULT true NOT NULL,
	"exchange_rate" double precision DEFAULT 1 NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "deposits" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"amount" integer,
	"status" text,
	"id_number" text,
	"first_name" text,
	"last_name" text,
	"channels_id" text,
	"note" text,
	"currency" text,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "game_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"auth_session_id" text NOT NULL,
	"user_id" text NOT NULL,
	"game_id" text,
	"status" "session_status" DEFAULT 'ACTIVE' NOT NULL,
	"total_wagered" integer DEFAULT 0 NOT NULL,
	"total_won" integer DEFAULT 0 NOT NULL,
	"total_xp_gained" integer DEFAULT 0 NOT NULL,
	"rtp" numeric(65, 30),
	"duration" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"end_at" timestamp (3),
	"starting_balance" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "game_spins" (
	"id" text PRIMARY KEY NOT NULL,
	"player_name" text,
	"game_name" text,
	"game_id" text,
	"spin_data" text,
	"gross_win_amount" double precision NOT NULL,
	"wager_amount" double precision NOT NULL,
	"spin_number" integer DEFAULT 0 NOT NULL,
	"player_avatar" text,
	"currency_id" text,
	"session_id" text NOT NULL,
	"user_id" text,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"occurred_at" timestamp (3) NOT NULL,
	"sessionDataId" text,
	"type" text,
	"operator_id" text,
	"status" text,
	"player_balance_at_start" integer DEFAULT 0 NOT NULL,
	"player_balance" integer DEFAULT 0 NOT NULL,
	"game_player_win_total_todayid" integer DEFAULT 0 NOT NULL,
	"player_bet_total_today" integer DEFAULT 0 NOT NULL,
	"session_total_win_amount" integer DEFAULT 0 NOT NULL,
	"session_total_bet_amount" integer DEFAULT 0 NOT NULL,
	"game_session_rtp" integer DEFAULT 0 NOT NULL,
	"player_rtp_today" integer DEFAULT 0 NOT NULL,
	"win_amount" integer DEFAULT 0 NOT NULL,
	"bet_amount" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "games" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"category" text DEFAULT 'slots' NOT NULL,
	"tags" text NOT NULL,
	"thumbnail_url" text,
	"banner_url" text,
	"developer" text NOT NULL,
	"provider_id" text,
	"total_wagered" integer NOT NULL,
	"total_won" integer NOT NULL,
	"target_rtp" integer,
	"is_featured" boolean NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"operator_id" text,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"status" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jackpot_contributions" (
	"id" text PRIMARY KEY NOT NULL,
	"jackpot_id" text NOT NULL,
	"user_id" text,
	"game_spin_id" text NOT NULL,
	"contribution_amount_coins" integer NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jackpot_wins" (
	"id" text PRIMARY KEY NOT NULL,
	"jackpot_id" text NOT NULL,
	"winner_id" text NOT NULL,
	"win_amount_coins" integer NOT NULL,
	"game_spin_id" text NOT NULL,
	"transaction_id" text,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"session_data_id" text
);
--> statement-breakpoint
CREATE TABLE "jackpots" (
	"id" text PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"current_amount_coins" integer NOT NULL,
	"seed_amount_coins" integer NOT NULL,
	"minimum_bet_coins" integer DEFAULT 1 NOT NULL,
	"contribution_rate_basis_points" integer NOT NULL,
	"probability_per_million" integer NOT NULL,
	"minimum_time_between_wins_minutes" integer NOT NULL,
	"last_won_at" timestamp (3),
	"last_won_by" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "operator_switch_history" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"from_operator_id" text,
	"to_operator_id" text NOT NULL,
	"switched_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "operators" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"operator_secret" text NOT NULL,
	"operator_access" text NOT NULL,
	"callback_url" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"allowed_ips" text NOT NULL,
	"description" text,
	"product_ids" text,
	"balance" integer NOT NULL,
	"net_revenue" integer DEFAULT 0 NOT NULL,
	"accepted_payments" text[] NOT NULL,
	"owner_id" text,
	"last_used_at" timestamp (3),
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text DEFAULT 'default' NOT NULL,
	"product_type" text DEFAULT 'bundle' NOT NULL,
	"bonus_total_in_credits" integer NOT NULL,
	"is_active" boolean,
	"price_in_cents" integer NOT NULL,
	"amount_to_receive_in_credits" integer NOT NULL,
	"best_value" integer NOT NULL,
	"discount_in_cents" integer NOT NULL,
	"bonus_spins" integer NOT NULL,
	"is_promo" boolean,
	"total_discount_in_cents" integer NOT NULL,
	"operator_id" text,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "referral_codes" (
	"id" text PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"commissionRate" double precision NOT NULL,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3) NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text DEFAULT 'setting' NOT NULL,
	"referral_code_count" integer DEFAULT 20 NOT NULL,
	"referral_commission_rate" double precision DEFAULT 0.25 NOT NULL,
	"vip_level" jsonb DEFAULT '[{"min":0,"max":1,"vip":0,"name":"iron"}]'::jsonb NOT NULL,
	"commission" jsonb DEFAULT '{"master":30,"affiliate":20,"subAffiliate":10}'::jsonb NOT NULL,
	"rates" jsonb DEFAULT '{"USD":1}'::jsonb NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"processed_at" timestamp (3),
	"wallet_id" text,
	"type" text NOT NULL,
	"status" text DEFAULT 'PENDING' NOT NULL,
	"amount" integer NOT NULL,
	"net_amount" integer,
	"currency_name" text,
	"fee_amount" integer,
	"product_id" text,
	"payment_method" text,
	"balance_before" integer,
	"balance_after" integer,
	"bonus_balance_before" integer,
	"bonus_balance_after" integer,
	"bonus_amount" integer,
	"wagering_requirement" integer,
	"wagering_progress" integer,
	"description" text,
	"provider" text,
	"provider_tx_id" text,
	"related_game_id" text,
	"related_round_id" text,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"operator_id" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text,
	"password_hash" text,
	"access_token" text,
	"refresh_token" text,
	"access_token_expires_at" timestamp (3),
	"refresh_token_expires_at" timestamp (3),
	"current_game_session_data_id" text,
	"current_auth_session_data_id" text,
	"avatar_url" text DEFAULT 'avatar-01' NOT NULL,
	"role" text DEFAULT 'USER' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"last_login_at" timestamp (3),
	"total_xp_gained" integer NOT NULL,
	"vip_info_id" text,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"deleted_at" timestamp (3),
	"last_seen" timestamp (3),
	"rtg_block_time" integer DEFAULT 0 NOT NULL,
	"phone" text,
	"path" text[] NOT NULL,
	"invitor_id" text,
	"avatar" text DEFAULT 'avatar1.png' NOT NULL,
	"status" "Status" DEFAULT 'ACTIVE' NOT NULL,
	"active_wallet_id" text,
	"activeOperatorId" text,
	"inviteCode" text
);
--> statement-breakpoint
CREATE TABLE "vip_cashback" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"amount" integer NOT NULL,
	"currency" text NOT NULL,
	"tiers_name" text NOT NULL,
	"type" text NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vip_info" (
	"id" text PRIMARY KEY NOT NULL,
	"level" integer DEFAULT 1 NOT NULL,
	"xp" integer NOT NULL,
	"totalXp" integer NOT NULL,
	"userId" text NOT NULL,
	"currentRankid" integer,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vip_level_up_bonus" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"amount" integer NOT NULL,
	"level_name" text NOT NULL,
	"level_xp" integer NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vip_level_up_history" (
	"id" text PRIMARY KEY NOT NULL,
	"previous_level" integer NOT NULL,
	"new_level" integer NOT NULL,
	"timestamp" timestamp (3) DEFAULT now() NOT NULL,
	"VipInfo_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vip_levels" (
	"id" text PRIMARY KEY NOT NULL,
	"parent_id" text NOT NULL,
	"level_name" text NOT NULL,
	"xp" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vip_ranks" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"minXp" integer NOT NULL,
	"dailyBonusCoinPct" integer NOT NULL,
	"hourlyBonusCoinPct" integer NOT NULL,
	"purchaseBonusCoinPct" integer NOT NULL,
	"levelUpBonusCoinPct" integer NOT NULL,
	"hasConcierge" boolean NOT NULL,
	"hasVipLoungeAccess" boolean NOT NULL,
	"isInvitationOnly" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vip_spin_prizes" (
	"id" text PRIMARY KEY NOT NULL,
	"tiers_id" text NOT NULL,
	"prizes" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vip_spin_rewards" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"amount" integer NOT NULL,
	"currency" text NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vip_tiers" (
	"id" text PRIMARY KEY NOT NULL,
	"tiers_name" text NOT NULL,
	"icon" text NOT NULL,
	"order" integer NOT NULL,
	"weekly_cashback" boolean DEFAULT false NOT NULL,
	"weekly_cashback_min" integer DEFAULT 0 NOT NULL,
	"weekly_cashback_percent" integer DEFAULT 0 NOT NULL,
	"monthly_cashback" boolean DEFAULT false NOT NULL,
	"monthly_cashback_min" integer DEFAULT 0 NOT NULL,
	"monthly_cashback_percent" integer DEFAULT 0 NOT NULL,
	"level_up_bonus" integer DEFAULT 0 NOT NULL,
	"no_fee_withdrawal" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wallets" (
	"id" text PRIMARY KEY NOT NULL,
	"balance" integer DEFAULT 0 NOT NULL,
	"payment_method" text DEFAULT 'INSTORE_CASH' NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"address" text,
	"cashtag" text,
	"operator_id" text NOT NULL,
	"last_used_at" timestamp (3),
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "withdrawals" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"amount" integer,
	"status" text,
	"id_number" text,
	"first_name" text,
	"last_name" text,
	"channels_id" text,
	"note" text,
	"currency_type" text,
	"currency" text,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
