import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getUnlucky } from '../utils/api';
import { dateToEmoji } from '../utils/dateToEmoji';
import { Fortune } from '../components/Fortune';
import { ApiError, InvalidResponseError } from '../utils/errors';
import './unlucky.css';
import { formatJapaneseDate, getTodayDateString } from '../utils/dateUtils';

type Props = {
  unluckySeiza: string;
  unluckyColor: string;
  error?: string;
};

export default function UnluckyPage({ unluckySeiza, unluckyColor, error }: Props) {
  if (error) {
    return <div className="box">{error}</div>;
  }

  const emoji = dateToEmoji(new Date());
  const formattedDate = formatJapaneseDate(new Date());

  return (
    <div className="page">
      <Head>
        <title>裏まぁじ占い</title>
        <meta name="description" content="今日の運勢の悪い星座とアンラッキーカラーを占います" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="page">
        <Fortune
          date={formattedDate}
          emoji={emoji}
          seiza={unluckySeiza}
          color={unluckyColor}
          isUnlucky
        />
      </main>

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

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const result = await getUnlucky();
    return {
      props: {
        unluckySeiza: result.unluckySeiza,
        unluckyColor: result.unluckyColor,
      },
    };
  } catch (error) {
    console.error('Error fetching unlucky fortune:', error);
    if (error instanceof ApiError) {
      return {
        props: {
          unluckySeiza: '',
          unluckyColor: '',
          error: `APIエラー: ${error.message}`,
        },
      };
    }
    if (error instanceof InvalidResponseError) {
      return {
        props: {
          unluckySeiza: '',
          unluckyColor: '',
          error: 'APIレスポンスの形式が不正です',
        },
      };
    }
    return {
      props: {
        unluckySeiza: '',
        unluckyColor: '',
        error: '予期せぬエラーが発生しました',
      },
    };
  }
};
