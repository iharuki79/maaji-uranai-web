import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { formatInTimeZone, utcToZonedTime } from 'date-fns-tz';
import type { Lucky } from '../types/Lucky';
import { colorNameToRGB } from '../utils/colorNameToRGB';
import { dateToEmoji } from '../utils/dateToEmoji';
import { getTweetUrl } from '../utils/getTweetUrl';
import styles from './index.module.css';

const API_ENDPOINT = 'https://uranai-api.hals.one';

type Props = {
  products: Lucky[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const products: Lucky[] = await fetch(`${API_ENDPOINT}/api`)
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
      return [{ seiza: 'エラー座', color: 'エラー色' }];
    });
  return { props: { products } };
};

const IndexPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const today = utcToZonedTime(formatInTimeZone(new Date(), 'Asia/Tokyo', 'yyyy-MM-dd') + ' 09:01', 'Asia/Tokyo');
  const todayResult = props.products[0];
  const emoji = dateToEmoji(today);
  const backgroundColor = todayResult.color === '白' ? '#888888' : '#FFFFFF';

  return (
    <div className={styles.page}>
      <Head>
        <title>まぁじ占いweb版</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>⭐まぁじ占い⭐</h1>
      <span>
        {formatInTimeZone(today, 'Asia/Tokyo', 'yy年MM月dd日')} (0時更新) {emoji}
      </span>
      <span className={styles.box2}>
        今日もっとも運勢のいい星座は...
        <h2>{todayResult.seiza}</h2>
      </span>
      <span
        className={styles.box2}
        style={{
          color: colorNameToRGB(todayResult.color),
          background: backgroundColor,
          border: 'solid 3px ' + colorNameToRGB(todayResult.color),
        }}
      >
        今日のラッキーカラーは...
        <h2>{todayResult.color}</h2>
      </span>
      <span>
        <a
          href={getTweetUrl(`⭐まぁじ占い⭐\n今日もっとも運勢のいい星座は...${todayResult.seiza}！${emoji}\n`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          星座をツイート
        </a>
        &ensp;
        <a
          href={getTweetUrl(`⭐まぁじ占い⭐\n今日のラッキーカラーは…${todayResult.color}！${emoji}\n`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          ラッキーカラーをツイート
        </a>
        <nav className={styles.all}>
          <a href="https://uranai-api.hals.one/api/" style={{ color: 'white' }}>
            API
          </a>
        </nav>
      </span>
      <details className={styles.all}>
        <summary className={styles.all}>※注意※</summary>
        ⭐まぁじ占い⭐は完全に適当でありこれによって生じたことについて責任を負いません。ご注意ください。
      </details>
      <p>
        不具合報告は<a href="https://x.com/Hals_SC">Twitter</a>, もしくは
        <a href="https://github.com/HalsSC/maaji-uranai-web">GitHub</a>まで
      </p>
      <footer>
        <hr />
        <span>created by まぁじ</span>
      </footer>
    </div>
  );
}

export default IndexPage;