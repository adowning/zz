import { currency } from './currency';

export function formatMoney(currencyCode: string, amount: number | string): string {
  if (!currencyCode || amount === undefined || amount === null) {
    return '--';
  }

  try {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (isNaN(numAmount)) {
      return '--';
    }

    return currency(numAmount, currencyCode, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
    });
  } catch (error) {
    console.error('Error formatting money:', error);
    return '--';
  }
}

export function fBalance(balance: number | string, currencyCode: string = 'USD'): string {
  return formatMoney(currencyCode, balance);
}