import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Fortune } from '../components/Fortune';
import { getFortune } from '../utils/api';
import { formatJapaneseDate, parseDateFromUrlParam } from '../utils/dateUtils';

type Props = {
  date: string;
  emoji: string;
  seiza: string;
  color: string;
  unluckySeiza: string;
  unluckyColor: string;
};

export default function FortunePage({
  date,
  emoji,
  seiza,
  color,
  unluckySeiza,
  unluckyColor,
}: Props) {
  const formattedDate = formatJapaneseDate(new Date(date));

  return (
    <>
      <Head>
        <title>{`${formattedDate}の運勢 - まぁじ占い`}</title>
        <meta
          name="description"
          content={`${formattedDate}の運勢のいい星座は${seiza}、ラッキーカラーは${color}です。`}
        />
        {/* OGP */}
        <meta property="og:title" content={`${formattedDate}の運勢 - まぁじ占い`} />
        <meta
          property="og:description"
          content={`${formattedDate}の運勢のいい星座は${seiza}、ラッキーカラーは${color}です。`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://uranai.hals.one/${date}`} />
        <meta property="og:image" content="https://uranai.hals.one/ogp.png" />
        <meta property="og:site_name" content="まぁじ占い" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${formattedDate}の運勢 - まぁじ占い`} />
        <meta
          name="twitter:description"
          content={`${formattedDate}の運勢のいい星座は${seiza}、ラッキーカラーは${color}です。`}
        />
        <meta name="twitter:image" content="https://uranai.hals.one/ogp.png" />
      </Head>

      <main>
        <Fortune date={formattedDate} emoji={emoji} seiza={seiza} color={color} />
        <Fortune
          date={formattedDate}
          emoji={emoji}
          seiza={unluckySeiza}
          color={unluckyColor}
          isUnlucky
          noDate
        />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const dateParam = params?.date as string;
  const date = parseDateFromUrlParam(dateParam);

  if (!date) {
    return {
      notFound: true,
    };
  }

  // 現在の日付を取得
  const today = new Date();
  const jstToday = new Date(today.getTime() + 9 * 60 * 60 * 1000); // UTC+9
  const todayStr = jstToday.toISOString().split('T')[0];

  // 日付が未来の場合は404
  if (new Date(dateParam) > new Date(todayStr)) {
    return {
      notFound: true,
    };
  }

  const fortune = await getFortune(date);

  return {
    props: {
      date: dateParam,
      ...fortune,
    },
  };
};
