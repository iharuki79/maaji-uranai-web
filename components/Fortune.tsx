import type React from 'react';
import { colorNameToRGB } from '../utils/colorNameToRGB';
import { getTweetUrl, getTweetUrlWithLink } from '../utils/getTweetUrl';
import styled from './Fortune.module.scss';

type FortuneProps = {
  date: string;
  emoji: string;
  seiza: string;
  color: string;
  isUnlucky?: boolean;
  noDate?: boolean;
};

export const Fortune: React.FC<FortuneProps> = ({
  date,
  emoji,
  seiza,
  color,
  isUnlucky = false,
  noDate = false,
}) => {
  const backgroundColor =
    color === (isUnlucky ? '黒' : '白')
      ? isUnlucky
        ? '#aa0000'
        : '#888888'
      : isUnlucky
        ? '#000000'
        : '#FFFFFF';

  const prefix = isUnlucky ? '👾裏まぁじ占い👾' : '⭐まぁじ占い⭐';
  const seizaText = isUnlucky ? '運勢の悪い星座' : '運勢のいい星座';
  const colorText = isUnlucky ? 'アンラッキーカラー' : 'ラッキーカラー';

  return (
    <div className={styled.fortune}>
      {!noDate && (
        <div className={styled.date}>
          {date} {emoji}
        </div>
      )}
      <div className={styled.box}>
        {`今日もっとも${seizaText}は...`}
        <h2>{seiza}</h2>
      </div>
      <div
        className={styled.box}
        style={{
          color: colorNameToRGB(color),
          background: backgroundColor,
          border: `solid 3px ${colorNameToRGB(color)}`,
        }}
      >
        {`今日の${colorText}は...`}
        <h2>{color}</h2>
      </div>
      <div className={styled.share}>
        <a
          href={getTweetUrl(`${prefix}\n${date}の${seizaText}は...${seiza}！${emoji}\n`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {`${seizaText}をツイート`}
        </a>
        &ensp;
        <a
          href={getTweetUrl(`${prefix}\n${date}の${colorText}は…${color}！${emoji}\n`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {`${colorText}をツイート`}
        </a>
      </div>
    </div>
  );
};
