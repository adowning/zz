/**
 * Utility functions for referral module
 */

/**
 * Generate a random referral code
 * @param length - Length of the code
 * @param numericOnly - Whether to use only numeric characters
 * @returns Generated referral code
 */
export const generateReferral = (length: number, numericOnly: boolean = false): string => {
    const chars = numericOnly ? '0123456789' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};