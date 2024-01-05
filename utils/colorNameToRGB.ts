const colors: Record<string, string> = {
  オレンジ: '#ee7800',
  青: '#0095d9',
  灰: '#808080',
  ピンク: '#f5b2b2',
  白: '#FFFFFF',
  黒: '#000000',
  紫: '#884898',
  黄色: '#ffd900',
  緑: '#4db56a',
  茶: '#734e30',
  赤: '#e60033',
  水色: '#a9ceec',
} as const;

export const colorNameToRGB = (name: string): string => {
  return colors[name];
};
