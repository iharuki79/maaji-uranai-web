import { formatInTimeZone, utcToZonedTime } from "date-fns-tz";

const dateEmoji = {
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

export const dateToEmoji = (date : Date): string => {
    const zonedDate = utcToZonedTime(formatInTimeZone(new Date(), 'Asia/Tokyo', 'yyyy-MM-dd') + ' 09:01', 'Asia/Tokyo');
    return dateEmoji[formatInTimeZone(date, 'Asia/Tokyo', 'MMdd')] ?? monthEmoji[zonedDate.getMonth()];
}
