import React, { useState } from 'react';
import Head from 'next/head';
import { formatInTimeZone } from 'date-fns-tz';
import { colorNameToRGB } from '../utils/colorNameToRGB';
import { dateToEmoji } from '../utils/dateToEmoji';
import styles from "./index.module.css";

export async function getServerSideProps(context) {
  try {
    const host = context.req.headers.host || 'localhost:3000';
    const products = await fetch(`https://uranai-api.hals.one/api`).then(data => data.json());
    return { props: { products } };
  } catch (e) {
    console.error(e);
    return { props: { products: [{ seiza: 'エラー座', color: 'エラー色' },] } };
  }
}

const IndexPage = (props) => {
  const today_result = props['products'][0];
  const emoji = dateToEmoji(new Date());
  const date = formatInTimeZone(new Date(), 'Asia/Tokyo', 'yy年MM月dd日');

  const background_color = today_result.color === '白' ? '#888888' : '#FFFFFF';

  const tweetSeiza = () => {
    let href = 'https://twitter.com/intent/tweet?text=';
    href += encodeURIComponent('⭐まぁじ占い⭐\n今日もっとも運勢のいい星座は...' + today_result.seiza + '！' + emoji + '\n');
    href += '&url=https://uranai.hals.one/';
    return (
      <a href={href} target='_blank' rel="noopener noreferrer">
        星座をツイート
      </a>
    );
  };
  const tweetColor = () => {
    let href = 'https://twitter.com/intent/tweet?text=';
    href += encodeURIComponent('⭐まぁじ占い⭐\n今日のラッキーカラーは…' + today_result.color + '！' + emoji + '\n');
    href += '&url=https://uranai.hals.one/';
    return (
      <a href={href} target='_blank' rel="noopener noreferrer">
        ラッキーカラーをツイート
      </a>
    );
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>まぁじ占いweb版</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>⭐まぁじ占い⭐</h1>
      <span>{date} (0時更新) {emoji}</span>
      <span className={styles.box2}>
        今日もっとも運勢のいい星座は...
        <h2>{today_result.seiza}</h2>
      </span>
      <span className={styles.box2} style={{ color: colorNameToRGB(today_result.color), background: background_color, border: 'solid 3px ' + colorNameToRGB(today_result.color) }}>
        今日のラッキーカラーは...
        <h2>{today_result.color}</h2>
      </span>
      <span>
        {tweetSeiza()}&ensp;
        {tweetColor()}&ensp;
        <nav className={styles.all}>
          <a href="https://uranai-api.hals.one/api/" style={{ color: 'white' }}>API</a>
        </nav>
      </span>
      <details className={styles.all}>
        <summary className={styles.all}>※注意※</summary>
        ⭐まぁじ占い⭐は完全に適当でありこれによって生じたことについて責任を負いません。ご注意ください。
      </details>
      <p>
        不具合報告は<a href='https://x.com/Hals_SC'>Twitter</a>, もしくは<a href='https://github.com/HalsSC/maaji-uranai-web'>GitHub</a>まで
      </p>
      <footer>
        <hr />
        <span>created by まぁじ</span>
      </footer>
    </div>
  );
};

export default IndexPage;
