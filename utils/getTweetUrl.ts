export const getTweetUrl = (s: string) => {
  return `https://x.com/intent/tweet?text=${encodeURIComponent(s)}&url=https://uranai.hals.one/`;
};

export const getTweetUrlWithLink = (s: string, url: string) => {
  return `https://x.com/intent/tweet?text=${encodeURIComponent(s)}&url=${url}`;
};
