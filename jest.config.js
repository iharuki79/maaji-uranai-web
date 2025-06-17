const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // next.config.jsと.envファイルを読み込むためのパス
  dir: './',
});

// Jestに渡すカスタム設定
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // CSS Modulesのモック
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};

// createJestConfigは非同期のNext.jsの設定を読み込むために使用
module.exports = createJestConfig(customJestConfig);
