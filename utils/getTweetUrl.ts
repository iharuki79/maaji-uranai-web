export const getTweetUrl = (s: string) => {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(s)}&url=https://uranai.hals.one/`;
};

export const getTweetUrlNoLink = (s: string, url: string) => {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(s)}&url=${url}`;
};