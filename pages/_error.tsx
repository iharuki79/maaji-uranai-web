import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ApiError, InvalidResponseError } from '../utils/errors';
import styles from './_error.module.scss';

type ErrorProps = {
  statusCode?: number;
  message?: string;
};

const ErrorPage: NextPage<ErrorProps> = ({ statusCode, message }) => {
  const title = statusCode ? `${statusCode} - エラーが発生しました` : 'エラーが発生しました';

  const errorMessage = message || '予期せぬエラーが発生しました。';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={errorMessage} />
      </Head>

      <div className={styles.error}>
        <h1>{title}</h1>
        <p>{errorMessage}</p>
        <div className={styles.actions}>
          <Link href="/" className={styles.button}>
            トップページに戻る
          </Link>
        </div>
      </div>
    </>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  let message: string | undefined;

  if (err instanceof ApiError) {
    message = err.message;
  } else if (err instanceof InvalidResponseError) {
    message = 'APIからの応答が不正です。';
  } else if (err) {
    message = err.message;
  }

  return { statusCode, message };
};

export default ErrorPage;
