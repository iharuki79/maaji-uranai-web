import Head from 'next/head';
import Link from 'next/link';
import { getTodayDateString } from '../utils/dateUtils';
import styled from './index.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>まぁじ占いWeb版</title>
        <meta
          name="description"
          content="まぁじ占いで今日の運勢を占いましょう。運勢のいい星座とラッキーカラーをお知らせします。"
        />
        {/* OGP */}
        <meta property="og:title" content="⭐まぁじ占い⭐Web版" />
        <meta
          property="og:description"
          content="まぁじ占いで今日の運勢を占いましょう。運勢のいい星座とラッキーカラーをお知らせします。"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://uranai.hals.one" />
        <meta property="og:site_name" content="⭐まぁじ占い⭐Web版" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="⭐まぁじ占い⭐Web版" />
        <meta
          name="twitter:description"
          content="まぁじ占いで今日の運勢を占いましょう。運勢のいい星座とラッキーカラーをお知らせします。"
        />
      </Head>

      <main className={styled.main}>
        <h1 className={styled.title}>⭐まぁじ占い⭐</h1>
        <p className={styled.description}>今日の運勢を占いましょう</p>
        <div className={styled.buttons}>
          <Link href={`/${getTodayDateString()}`} className={styled.button}>
            今日の運勢を占う
          </Link>
          <Link href="/omikuji" className={styled.button}>
            おみくじを引く
          </Link>
        </div>
        <div className={styled.links}>
          <a
            href="https://github.com/iharuki79/maaji-uranai-web"
            target="_blank"
            rel="noopener noreferrer"
            className={styled.link}
          >
            何かあればGitHubへ
          </a>
        </div>
      </main>
    </>
  );
}
