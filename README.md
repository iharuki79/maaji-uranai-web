# まぁじ占い Web（maaji-uranai-web）

毎日0時（日本時間）に更新される星座占いとラッキーカラーを提供するWebサービスです。

[⭐ まぁじ占いWeb版はこちら ⭐](https://uranai.hals.one/)

[⛩ おみくじページはこちら ⛩](https://uranai.hals.one/omikuji)

## サイト概要

- **メイン機能**：毎日0時（JST）に更新される「今日一番運勢の良い星座」と「ラッキーカラー」を占います。
  - トップページ（/）から「今日の運勢を占う」ボタンで日付ページ（/YYYY-MM-DD）へ遷移します。
  - 結果はTwitterでシェア可能（シェア時に日付ページへのリンク付き）。
  - OGP/Twitterカードは日付ごとに動的に設定されます。
- **サブ機能**：おみくじページ（/omikuji）で、名前を入力しておみくじを引けます。
  - 結果は画像として保存可能。
  - Twitterでシェア可能。
- **裏機能**：アンラッキー星座＆カラーも見られます（/unlucky）。

## 技術構成

- **Next.js**（Reactベースのフレームワーク）
- **TypeScript**（型安全なフロントエンド開発）
- **React**（UI構築）
- **SCSS Modules**（コンポーネント単位のスタイル管理）
- **Jest**（テスト環境）
- **Biome**（Lint/Format）
- **Vercel**（ホスティング/デプロイ）
- **APIサーバ**（<https://uranai-api.hals.one> から星座・色データを取得）

## ディレクトリ構成（抜粋）

- `pages/` ... Next.jsのページ群（トップ・日付・おみくじ・アンラッキー・エラー等）
- `components/` ... Reactコンポーネント
- `utils/` ... ユーティリティ関数
- `public/` ... 画像等の静的アセット
- `types/` ... 型定義

## API仕様

- `/api` ... ラッキー星座＆カラー
  - レスポンス例: `[ { "seiza": "おひつじ座", "color": "オレンジ" } ]`
- `/api/unlucky` ... アンラッキー星座＆カラー
  - レスポンス例: `[ { "seiza": "おうし座", "color": "青" } ]`

## 開発・動作環境

- Node.js（推奨: v18以降）
- yarn または npm

### 開発用コマンド例

```sh
# 依存インストール
yarn install
# 開発サーバ起動
yarn dev
# Lint/Format
npx biome check .
# テスト
yarn test
```

## コントリビュート

PR・issue歓迎です！

---

note: APIサーバはVercelプロジェクトとは別運用です。仕様変更の可能性あり。
