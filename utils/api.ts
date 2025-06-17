import { ApiError, InvalidResponseError } from './errors';
import { dateToEmoji } from './dateToEmoji';

const API_ENDPOINT = 'https://uranai-api.hals.one';

// ラッキー情報の型定義
type LuckyInfo = {
  seiza: string;
  color: string;
};

// アンラッキー情報の型定義
type UnluckyInfo = {
  seiza: string;
  color: string;
};

// 最終的な占い結果の型定義
export type FortuneResult = {
  seiza: string;
  color: string;
  unluckySeiza: string;
  unluckyColor: string;
};

// アンラッキー情報の型定義
export type UnluckyResult = {
  unluckySeiza: string;
  unluckyColor: string;
};

// 型ガード関数
const isValidLuckyInfo = (data: unknown): data is LuckyInfo => {
  if (typeof data !== 'object' || data === null) return false;
  const result = data as LuckyInfo;
  return typeof result.seiza === 'string' && typeof result.color === 'string';
};

const isValidUnluckyInfo = (data: unknown): data is UnluckyInfo => {
  if (typeof data !== 'object' || data === null) return false;
  const result = data as UnluckyInfo;
  return typeof result.seiza === 'string' && typeof result.color === 'string';
};

/**
 * 指定された日付の占い結果を取得する
 * @param date 日付
 * @returns 占い結果
 * @throws ApiError APIリクエストが失敗した場合
 * @throws InvalidResponseError APIレスポンスの形式が不正な場合
 */
export const getFortune = async (date: Date): Promise<FortuneResult & { emoji: string }> => {
  const dateStr = date.toISOString().split('T')[0];

  // ラッキー情報の取得
  const luckyResponse = await fetch(`${API_ENDPOINT}/api?date=${dateStr}`);
  if (!luckyResponse.ok) {
    throw new ApiError(
      `API request failed: ${luckyResponse.statusText}`,
      luckyResponse.status,
      luckyResponse
    );
  }
  const luckyData = await luckyResponse.json();

  if (!Array.isArray(luckyData) || luckyData.length === 0 || !isValidLuckyInfo(luckyData[0])) {
    throw new InvalidResponseError('Invalid lucky info response format');
  }
  const luckyInfo = luckyData[0];

  // アンラッキー情報の取得
  const unluckyResponse = await fetch(`${API_ENDPOINT}/api/unlucky`);
  if (!unluckyResponse.ok) {
    throw new ApiError(
      `API request failed: ${unluckyResponse.statusText}`,
      unluckyResponse.status,
      unluckyResponse
    );
  }
  const unluckyData = await unluckyResponse.json();

  if (
    !Array.isArray(unluckyData) ||
    unluckyData.length === 0 ||
    !isValidUnluckyInfo(unluckyData[0])
  ) {
    throw new InvalidResponseError('Invalid unlucky info response format');
  }
  const unluckyInfo = unluckyData[0];

  return {
    seiza: luckyInfo.seiza,
    color: luckyInfo.color,
    unluckySeiza: unluckyInfo.seiza,
    unluckyColor: unluckyInfo.color,
    emoji: dateToEmoji(date),
  };
};

/**
 * アンラッキー情報を取得する
 * @returns アンラッキー情報
 * @throws ApiError APIリクエストが失敗した場合
 * @throws InvalidResponseError APIレスポンスの形式が不正な場合
 */
export const getUnlucky = async (): Promise<UnluckyResult> => {
  const response = await fetch(`${API_ENDPOINT}/api/unlucky`);

  if (!response.ok) {
    throw new ApiError(`API request failed: ${response.statusText}`, response.status, response);
  }

  const data = await response.json();

  if (!Array.isArray(data) || data.length === 0 || !isValidUnluckyInfo(data[0])) {
    throw new InvalidResponseError('Invalid API response format');
  }

  const unluckyInfo = data[0];
  return {
    unluckySeiza: unluckyInfo.seiza,
    unluckyColor: unluckyInfo.color,
  };
};
