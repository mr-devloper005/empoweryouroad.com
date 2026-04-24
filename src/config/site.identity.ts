export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'o6kr7a9xvb',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Empower You Road',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Ideas that move you forward',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'empoweryouroad.com is an article-first home for bold ideas, practical guides, and human stories—written to be read slowly, shared widely, and revisited often.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'empoweryouroad.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://empoweryouroad.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

