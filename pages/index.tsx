import React from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { formatInTimeZone, utcToZonedTime } from 'date-fns-tz';
import type { Lucky } from '../types/Lucky';
import { colorNameToRGB } from '../utils/colorNameToRGB';
import { dateToEmoji } from '../utils/dateToEmoji';
import { getTweetUrl } from '../utils/getTweetUrl';
import { dropEmoji } from '../utils/dropEmoji';
import styles from './index.module.css';
import './valentine.css';

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
  const today = utcToZonedTime(`${formatInTimeZone(new Date(), 'Asia/Tokyo', 'yyyy-MM-dd')} 09:01`, 'Asia/Tokyo');
  const todayResult = props.products[0];
  const emoji = dateToEmoji(today);
  const backgroundColor = todayResult.color === '白' ? '#888888' : '#FFFFFF';
  const handleOnClick = (event: any) => {
    event.stopPropagation(); // 親要素へのイベント伝播を防ぐ
    for (let i = 0; i < Math.random() * 5 + 5; i++) {
      dropEmoji(event.target.innerText);
    }
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>まぁじ占いweb版</title>
        <meta charSet="utf-8" />
        <meta name="author" content="まぁじ" />
        <meta name="description" content="⭐まぁじ占い⭐web版です。今日ラッキーな星座とラッキーカラーを占います。" />
        <meta name="keywords" content="まぁじ占い,まぁじ,占い,星座,ラッキーカラー" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="⭐まぁじ占い⭐web版" />
        <meta property="og:description" content="⭐まぁじ占い⭐web版です。今日ラッキーな星座とラッキーカラーを占います。" />
        <meta property="og:url" content="https://uranai.hals.one/" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="⭐まぁじ占い⭐web版" />
        <meta name="twitter:description" content="⭐まぁじ占い⭐web版です。今日ラッキーな星座とラッキーカラーを占います。" />
        <script type='application/ld+json'>{
          '{ "@context": "http://schema.org", "@type": "WebSite", "url": "https://uranai.hals.one/", "name": "まぁじ占いWeb版", "author": { "@type": "Person", "name":"まぁじ" }, "description": "⭐まぁじ占い⭐web版です。今日ラッキーな星座とラッキーカラーを占います。", "keywords": "まぁじ占い,まぁじ,占い,星座,ラッキーカラー"}'}
        </script>
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </Head>
      <h1>⭐まぁじ占い⭐</h1>
      <div>
        {formatInTimeZone(today, 'Asia/Tokyo', 'yyyy年MM月dd日')}
        <span id='clickable' style={{ cursor: 'pointer', position: 'absolute', zIndex: 'calc(Infinity)' }} onClick={handleOnClick} onKeyUp={handleOnClick} tabIndex={0}>{emoji}</span>
      </div>
      <span className={styles.box2}>
        今日もっとも運勢のいい星座は...
        <h2>{todayResult.seiza}</h2>
      </span>
      <span
        className={styles.box2}
        style={{
          color: colorNameToRGB(todayResult.color),
          background: backgroundColor,
          border: `solid 3px ${colorNameToRGB(todayResult.color)}`,
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
          <a href="https://uranai-api.hals.one/api/" style={{ opacity: 0 }}>
            API
          </a>
        </nav>
      </span>
      <a href="./omikuji" className={styles.all}>
        おみくじページへ
      </a>
      <a href="/unlucky" className={styles.all}>
        裏まぁじ占いへ
      </a>
      <details className={styles.all}>
        <summary className={styles.all}>※注意※</summary>
        ⭐まぁじ占い⭐は完全に適当でありこれによって生じたことについて責任を負いません。ご注意ください。
      </details>
      <p>
        不具合報告は<a href="https://github.com/HalsSC/maaji-uranai-web">GitHub</a>まで
      </p>
      <footer>
        <hr />
        <span>created by まぁじ</span>
      </footer>
    </div >
  );
}

export default IndexPage;