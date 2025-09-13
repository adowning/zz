import { format } from 'date-fns';

export function fDateTime(date: string | Date | number): string {
  if (!date) return '--';
  return format(new Date(date), 'MMM dd, yyyy HH:mm');
}