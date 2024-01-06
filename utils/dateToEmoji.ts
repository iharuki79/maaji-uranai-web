import { formatInTimeZone, utcToZonedTime } from 'date-fns-tz';

const dateEmoji: Record<string, string> = {
  '0101': '🎍',
  '0111': '🐶',
  '0203': '👹',
  '0209': '🍖',
  '0214': '🍫',
  '0222': '🐱',
  '0303': '🍑',
  '0401': '😜',
  '0501': '💐',
  '0505': '🎏',
  '0707': '🎋',
  '0709': '🎂',
  '1129': '🦄',
  '1131': '🎃',
  '1225': '🎄',
  '1231': '🛎️',
} as const;

const monthEmoji = ['⛄', '⛄', '🌸', '🌸', '🌸', '🌻', '🌻', '🌻', '🍂', '🍂', '🍂', '⛄'] as const;

export const dateToEmoji = (date: Date): string => {
  return dateEmoji[formatInTimeZone(date, 'Asia/Tokyo', 'MMdd')] ?? monthEmoji[date.getMonth()] ?? '⚠️';
};
