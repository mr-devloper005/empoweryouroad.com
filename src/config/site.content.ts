import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Article discovery · empoweryouroad.com',
  },
  footer: {
    tagline: 'New stories weekly · written for real readers',
  },
  hero: {
    badge: 'Reading platform + vivid story hub',
    title: ['Turn posts into momentum', 'and read like the open road.'],
    description:
      'empoweryouroad.com is where long-form writing meets a brighter interface—essays, explainers, and field notes for humans who like color, craft, and clarity in every paragraph.',
    primaryCta: {
      label: 'Start reading',
      href: '/articles',
    },
    secondaryCta: {
      label: 'Browse images',
      href: '/images',
    },
    searchPlaceholder: 'Search stories, ideas, and posts across the site',
    focusLabel: 'Focus',
    featureCardBadge: 'Editorial + visuals',
    featureCardTitle: 'A calmer read with room for the bold headline.',
    featureCardDescription:
      'The homepage pairs articles with a visual lane so you can start with text or pictures—without changing any core platform behavior.',
    /** Shown as small rounded chips under the hero CTAs (visual only) */
    chips: ['Story', 'Essay', 'Guide', 'Image', 'Field note'] as const,
  },
  home: {
    metadata: {
      title: 'empoweryouroad.com — articles, color, and long-form reading',
      description:
        'Read essays, stories, and visual posts in one joyful editorial system built for empoweryouroad.com visitors.',
      openGraphTitle: 'empoweryouroad.com | Empower You Road',
      openGraphDescription:
        'Article-first reading with purple-and-butter energy—guides, features, and visual stories in one place.',
      keywords: [
        'empoweryouroad',
        'articles',
        'long-form reading',
        'visual stories',
        'independent publishing',
      ],
    },
    introBadge: 'Why this site',
    introTitle: 'A publication-shaped homepage that does not look like a clone.',
    introParagraphs: [
      'Empower You Road is tuned for the article task first: big type, clear spacing, and an experience that feels like a magazine in the browser rather than a generic post feed.',
      'Images sit alongside as a second lane, so you can keep exploring without leaving the same calm visual system or breaking search, posting, and SEO behavior that powers the platform.',
    ],
    sideBadge: 'What you will notice',
    sidePoints: [
      'A hero split with soft blooms and a device story block inspired by product landing pages—without the teal cliché.',
      'Primary and secondary tasks only in the top navigation; everything else stays on its route.',
      'Motion stays lightweight: slow fades, gentle float, and CSS where possible.',
    ],
    primaryLink: {
      label: 'Read articles',
      href: '/articles',
    },
    secondaryLink: {
      label: 'View images',
      href: '/images',
    },
  },
  cta: {
    badge: 'Open the next story',
    title: 'Jump between articles, imagery, and search without losing the thread.',
    description:
      'Sign in to save work, or reach out if you are partnering on distribution—same routes and logic as the shared platform underneath.',
    primaryCta: {
      label: 'Create account',
      href: '/register',
    },
    secondaryCta: {
      label: 'Contact',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'New posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles — Empower You Road',
    description: 'Long-form stories, guides, and essays on empoweryouroad.com.',
  },
  listing: {
    title: 'Listings on Empower You Road',
    description: 'Business and service pages when the listing task is in use.',
  },
  classified: {
    title: 'Classifieds on Empower You Road',
    description: 'Short listings and time-sensitive posts.',
  },
  image: {
    title: 'Images & visual stories',
    description: 'Galleries and image-led posts from across the site.',
  },
  profile: {
    title: 'Profiles',
    description: 'Identity pages for people and projects.',
  },
  sbm: {
    title: 'Bookmarks & resources',
    description: 'Curated links and saved resources.',
  },
  pdf: {
    title: 'Documents & PDFs',
    description: 'Downloadable files and reports.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Listings, services, and discoverable pages',
    paragraphs: [
      'Listings and directory-style posts stay available for teams that wire them in—this site simply does not place them in the top navigation by default.',
      'Use categories and search to move between services while article reading remains the emotional center of the brand.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Images', href: '/images' },
      { label: 'Classifieds', href: '/classifieds' },
    ],
  },
  article: {
    title: 'Articles, essays, and the core reading lane',
    paragraphs: [
      'The article surface is the flagship for Empower You Road: large display type, a distinctive article detail layout, and typography tuned for long sessions.',
      'We keep the same data model the platform already expects, so you still get search, cards, and comments in predictable places even when the canvas looks new.',
    ],
    links: [
      { label: 'Images', href: '/images' },
      { label: 'About', href: '/about' },
      { label: 'Search', href: '/search' },
    ],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Time-sensitive or deal-style posts are supported when the classified task is enabled. Here they are styled with clearer urgency and compact fields.',
    ],
    links: [
      { label: 'Listings', href: '/listings' },
      { label: 'Articles', href: '/articles' },
      { label: 'Profiles', href: '/profile' },
    ],
  },
  image: {
    title: 'Image-first posts and visual stories',
    paragraphs: [
      'The image lane is tuned for a gallery mindset: more contrast, darker shells on list pages, and a hero that pairs naturally with the article home.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Open search', href: '/search' },
      { label: 'About the site', href: '/about' },
    ],
  },
  profile: {
    title: 'Profiles, identities, and public pages',
    paragraphs: [
      'Profiles are trust anchors. When this task is on, the layout leans on neutral surfaces so people and projects read clearly against the more expressive article shell.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Listings', href: '/listings' },
    ],
  },
  sbm: {
    title: 'Bookmarks and curated resources',
    paragraphs: [
      'Curation is treated as a research shelf: calmer type, more compact metadata, and links that read like references rather than ads.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Search', href: '/search' },
    ],
  },
  pdf: {
    title: 'Documents and long downloads',
    paragraphs: [
      'Files sit in a more utilitarian layout so visitors can find titles, open previews, and download without the editorial frills meant for long reads.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Listings', href: '/listings' },
    ],
  },
  social: {
    title: 'Short updates and signals',
    paragraphs: [
      'When social-style posts are enabled, they work as light signals that can send readers to deeper articles and resources without replacing them.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Classifieds', href: '/classifieds' },
    ],
  },
  comment: {
    title: 'Comments and responses',
    paragraphs: [
      'Comment threads follow the post they belong to and surface directly under articles when enabled—same connector behavior, clearer hierarchy on the page.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Search', href: '/search' },
    ],
  },
  org: {
    title: 'Organizations and teams',
    paragraphs: [
      'Organization pages provide a structured way to show teams, studios, and collaboratives alongside their stories and services.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Listings', href: '/listings' },
    ],
  },
}
