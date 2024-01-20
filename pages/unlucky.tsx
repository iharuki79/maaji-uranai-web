import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { formatInTimeZone, utcToZonedTime } from 'date-fns-tz';
import type { Lucky } from '../types/Lucky';
import { colorNameToRGB } from '../utils/colorNameToRGB';
import { dateToEmoji } from '../utils/dateToEmoji';
import { getTweetUrl } from '../utils/getTweetUrl';
import './unlucky.css';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Component {...pageProps} />
  </>
);

const API_ENDPOINT = 'https://uranai-api.hals.one';

type Props = {
  products: Lucky[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const products: Lucky[] = await fetch(`${API_ENDPOINT}/api/unlucky`)
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
  const backgroundColor = todayResult.color === '黒' ? '#aa0000' : '#000000';

  return (
    <div className='page'>
      <Head>
        <title>裏まぁじ占いweb版</title>
        <meta charSet="utf-8" />
        <meta name="author" content="まぁじ" />
        <meta name="description" content="👾裏まぁじ占い👾web版です。" />
        <meta name="keywords" content="まぁじ占い,まぁじ,占い,星座,ラッキーカラー" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script type='application/ld+json'>{
          '{ "@context": "http://schema.org", "@type": "WebSite", "url": "https://uranai.hals.one/", "name": "まぁじ占いWeb版", "author": { "@type": "Person", "name":"まぁじ" }, "description": "⭐まぁじ占い⭐web版です。今日ラッキーな星座とラッキーカラーを占います。", "keywords": "まぁじ占い,まぁじ,占い,星座,ラッキーカラー"}'}
        </script>
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </Head>
      <h1>👾裏まぁじ占い👾</h1>
      <span>
        {formatInTimeZone(today, 'Asia/Tokyo', 'yyyy年MM月dd日')} (0時更新) {emoji}
      </span>
      <span className='box'>
        今日もっとも運勢の悪い星座は...
        <h2>{todayResult.seiza}</h2>
      </span>
      <span
        className='box'
        style={{
          color: colorNameToRGB(todayResult.color),
          background: backgroundColor,
          border: 'solid 3px ' + colorNameToRGB(todayResult.color),
        }}
      >
        今日のアンラッキーカラーは...
        <h2>{todayResult.color}</h2>
      </span>
      <span>
        <a
          href={getTweetUrl(`👾裏まぁじ占い👾\n今日もっとも運勢の悪い星座は...${todayResult.seiza}！${emoji}\n`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          星座をツイート
        </a>
        &ensp;
        <a
          href={getTweetUrl(`👾裏まぁじ占い👾\n今日のアンラッキーカラーは…${todayResult.color}！${emoji}\n`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          アンラッキーカラーをツイート
        </a>
        <nav>
          <a href="https://uranai-api.hals.one/api/unlucky" style={{ opacity: 0 }}>
            API
          </a>
        </nav>
      </span>
      <details>
        <summary>※注意※</summary>
        👾裏まぁじ占い👾は適当じゃない。
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