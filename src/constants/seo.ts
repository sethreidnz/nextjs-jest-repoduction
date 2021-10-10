import { DEPLOY_URL } from './urls';

const baseSiteInfo = {
  siteName: 'sethreid.co.nz',
  title: 'Seth Reid - Creative, musician and UI Engineer',
  description:
    'Creating change through creativity, technology and leading by example',
  defaultAuthor: 'Seth Reid',
  url: DEPLOY_URL,
  author: 'Seth Reid',
  defaultImage: '/public/favicon.png',
};

export const DEFAULT_SEO = {
  title: baseSiteInfo.title,
  description: baseSiteInfo.description,
  url: baseSiteInfo.url,
  image: `${baseSiteInfo.url}${baseSiteInfo.defaultImage}`,
  author: baseSiteInfo.author,
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: baseSiteInfo.url,
    title: baseSiteInfo.title,
    description: baseSiteInfo.description,
    site_name: baseSiteInfo.siteName,
    image: baseSiteInfo.defaultImage,
  },
};
