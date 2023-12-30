import React, { useState } from 'react';
import Head from 'next/head';
import { Color2RGB } from '../interfaces';
import styles from "./index.module.css";

export async function getServerSideProps(context) {
  try {
    const host = context.req.headers.host || 'localhost:3000';
    const products = await fetch(`https://uranai-api.hals.one/api`).then(data => data.json());
    return { props: { products } };
  } catch (e) {
    console.log(e);
    return { props: { products: [{ seiza: 'エラー座', color: 'エラー色' },] } };
  }
}

const IndexPage = (props) => {
  const today = new Date();
  const today_result = props['products'][0];
  let emoji = ['⛄', '⛄', '🌸', '🌸', '🌸', '🌻', '🌻', '🌻', '🍂', '🍂', '🍂', '⛄'][today.getMonth()];
  if (today.getMonth() == 6 && today.getDate() == 9) emoji = '🎂'
  else if (today.getMonth() == 0 && today.getDate() == 1) emoji = '🎍';
  else if (today.getMonth() == 11 && today.getDate() == 25) emoji = '🎄';
  const [date, setToday] = useState<string>(today.getFullYear() + '年' + (today.getMonth() + 1) + '月' + today.getDate() + '日 (0時更新)' + emoji);

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
      {date}
      <span className={styles.box2}>
        今日もっとも運勢のいい星座は...
        <h2>{today_result.seiza}</h2>
      </span>
      <span className={styles.box2} style={{ color: Color2RGB[today_result.color], background: background_color, border: 'solid 3px ' + Color2RGB[today_result.color] }}>
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
