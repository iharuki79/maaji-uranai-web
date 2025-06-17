/**
 * 日付を日本語形式でフォーマットする
 * 例: 2024年3月15日金曜日
 */
export const formatJapaneseDate = (date: Date): string => {
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timeZone: 'Asia/Tokyo',
  });
};

/**
 * 日付文字列が有効な日付かどうかを検証する
 */
export const validateDateString = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  return date instanceof Date && !Number.isNaN(date.getTime());
};

/**
 * 現在の日付をYYYY-MM-DD形式で取得する
 */
export const getTodayDateString = (): string => {
  const now = new Date();
  const jstDate = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC+9
  return jstDate.toISOString().split('T')[0];
};

/**
 * URLパラメータから日付を取得し、検証する
 * 無効な日付の場合はnullを返す
 */
export const parseDateFromUrlParam = (dateParam: string): Date | null => {
  if (!validateDateString(dateParam)) {
    return null;
  }
  const date = new Date(dateParam);
  return new Date(date.getTime() + 9 * 60 * 60 * 1000); // UTC+9
};
