import html2canvas from 'html2canvas';
import Head from 'next/head';
import type React from 'react';
import { useState } from 'react';
import { getTweetUrlWithLink } from '../../utils/getTweetUrl';
import styled from './omikuji.module.scss';

const omikujiList = ['大吉🤩', '吉😁', '中吉😊', '小吉😀', '末吉🙂', '凶😨', '大凶😱'];

const IndexPage = () => {
  const [userName, setUserName] = useState('');
  const [resultTitle, setResultTitle] = useState('2025年の運勢🐍');
  const [omikujiResult, setOmikujiResult] = useState('');
  const [tweetUrl, setTweetUrl] = useState(
    getTweetUrlWithLink('⛩まぁじ神社⛩\n', 'https://uranai.hals.one/omikuji')
  );

  const onChangeUserName = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setUserName(event.target.value);

  const salt = Number(process.env.NEXT_PUBLIC_SALT);
  const start_idx = Number(process.env.NEXT_PUBLIC_START_IDX);
  const end_idx = Number(process.env.NEXT_PUBLIC_END_IDX);

  const onClickDrawOmikuji = (): void => {
    let tmpResult = '';
    if (userName.length === 0) {
      tmpResult = omikujiList[Math.floor(Math.random() * salt) % omikujiList.length];
    } else if (userName === 'まぁじ' || userName === 'Hals_SC' || userName === 'John Doe') {
      tmpResult = '超超超大吉！！！💪';
    } else {
      let count = salt;
      for (let i = start_idx; i < start_idx + end_idx; i++) {
        count += userName.codePointAt(i % userName.length) ?? 0;
      }
      tmpResult = omikujiList[count % omikujiList.length];
    }
    setOmikujiResult(tmpResult);

    const tmpTitle = `${userName.length === 0 ? '' : `${userName}さんの`}2025年の運勢🐍`;
    setResultTitle(tmpTitle);
    setTweetUrl(
      getTweetUrlWithLink(
        `⛩まぁじ神社⛩\n\n${tmpTitle}は…\n\n${tmpResult}！\n`,
        'https://uranai.hals.one/omikuji'
      )
    );
  };

  const onClickSave = () => {
    const omikujiArea = document.querySelector(`.${styled.omikujiArea}`) as HTMLElement | null;
    if (omikujiArea) {
      if (omikujiResult.length > 0) {
        html2canvas(omikujiArea).then((canvas) => {
          const link = document.createElement('a');
          link.download = 'omikuji.png';
          link.href = canvas.toDataURL();
          link.click();
        });
      } else {
        alert('先におみくじを引いてね');
      }
    } else {
      console.error('omikujiArea element not found');
    }
  };

  return (
    <div className={styled.all}>
      <Head>
        <title>まぁじ神社</title>
        <meta charSet="utf-8" />
        <meta name="author" content="まぁじ" />
        <meta
          name="description"
          content="⛩まぁじ神社⛩のおみくじです。名前を入力して引いてみよう！"
        />
        <meta name="keywords" content="まぁじ神社,まぁじ,おみくじ" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="まぁじ神社" />
        <meta
          property="og:description"
          content="⛩まぁじ神社⛩のおみくじです。名前を入力して引いてみよう！"
        />
        <meta property="og:image" content="https://uranai.hals.one/omikuji_box.png" />
        <meta property="og:url" content="https://uranai.hals.one/omikuji" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="まぁじ神社" />
        <meta name="twitter:description" content="まぁじ神社のおみくじ" />
        <meta name="twitter:image" content="https://uranai.hals.one/omikuji_box.png" />
        <script type="application/ld+json">
          {
            '{ "@context": "http://schema.org", "@type": "WebSite", "url": "https://uranai.hals.one/", "name": "まぁじ神社", "author": { "@type": "Person", "name":"まぁじ" }, "description": "⛩まぁじ神社⛩のおみくじです。名前を入力して引いてみよう！", "keywords": "まぁじ神社,まぁじ,おみくじ"}'
          }
        </script>
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </Head>
      <h1 className={styled.heading}>
        <span className={styled.emoji}>⛩</span>
        <span>まぁじ神社</span>
        <span className={styled.emoji}>⛩</span>
      </h1>
      <h2 className={styled.heading2}>おみくじ</h2>
      <div className={styled.inputArea}>
        <p>おみくじ箱をクリック</p>
        <p>名前を入力せずに何度も引くこともできます</p>
        <input
          className={styled.todoInputField}
          placeholder={'名前を入力'}
          type={'text'}
          value={userName}
          onChange={onChangeUserName}
        />
        <img
          className={styled.drawOmikujiButton}
          src="/omikuji_box.png"
          alt="おみくじを引く"
          onClick={onClickDrawOmikuji}
          onKeyUp={onClickDrawOmikuji}
        />
      </div>
      <div
        className={styled.omikujiArea}
        style={{ display: omikujiResult.length > 0 ? 'block' : 'none' }}
      >
        <div className={styled.omikujiCard}>
          <div className={styled.omikujiInner}>
            <hr />
            <h1 className={styled.heading}>
              <span className={styled.emoji}>⛩</span>
              <span>まぁじ神社</span>
              <span className={styled.emoji}>⛩</span>
            </h1>
            <h2 className={styled.heading2}>おみくじ</h2>
            <hr />
            <h2 className={styled.heading2}>{resultTitle}</h2>
            <div className={styled.omikujiResult}>{omikujiResult}</div>
            <hr />
          </div>
        </div>
      </div>
      <div className={styled.shareArea}>
        <a
          className={`${styled.shareButton} ${styled.twitter}`}
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          ツイートする
        </a>
        <button
          className={`${styled.shareButton}`}
          type="button"
          onClick={onClickSave}
          onKeyDown={onClickSave}
        >
          画像で保存する(png)
        </button>
      </div>
    </div>
  );
};

export default IndexPage;
