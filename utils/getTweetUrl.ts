export const getTweetUrl = (s: string) => {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(s)}&url=https://uranai.hals.one/`;
};
