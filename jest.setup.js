// jest-domの拡張をインポート
import '@testing-library/jest-dom';

import { rest } from 'msw';
// MSWのセットアップ
import { setupServer } from 'msw/node';

// グローバルなモックサーバーの設定
export const server = setupServer(
  // APIのモックハンドラーをここに追加
  rest.get('https://uranai-api.hals.one/api/:date', (_req, res, ctx) => {
    return res(
      ctx.json({
        seiza: 'おひつじ座',
        color: '赤',
        emoji: '🐏',
        unluckySeiza: 'てんびん座',
        unluckyColor: '青',
      })
    );
  })
);

// テストの前後でモックサーバーを起動/停止
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
