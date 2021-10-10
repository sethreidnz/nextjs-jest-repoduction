export const DEPLOY_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const ARTICLE_BASE_PATH = '/articles';
