import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Bookmark,
  Building2,
  Compass,
  FileText,
  Image as ImageIcon,
  LayoutGrid,
  MapPin,
  ShieldCheck,
  Smartphone,
  Tag,
  Tablet,
  User,
  Zap,
} from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind, type ProductKind } from '@/design/factory/get-product-kind'
import type { SitePost } from '@/lib/site-connector'
import { HOME_PAGE_OVERRIDE_ENABLED, HomePageOverride } from '@/overrides/home-page'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  })
}

type EnabledTask = (typeof SITE_CONFIG.tasks)[number]
type TaskFeedItem = { task: EnabledTask; posts: SitePost[] }

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: Bookmark,
  classified: Tag,
  image: ImageIcon,
  profile: User,
}

function resolveTaskKey(value: unknown, fallback: TaskKey): TaskKey {
  if (value === 'listing' || value === 'classified' || value === 'article' || value === 'image' || value === 'profile' || value === 'sbm') return value
  return fallback
}

function getTaskHref(task: TaskKey, slug: string) {
  const route = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || `/${task}`
  return `${route}/${slug}`
}

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage = typeof post?.content === 'object' && post?.content && Array.isArray((post.content as any).images)
    ? (post.content as any).images.find((url: unknown) => typeof url === 'string' && url)
    : null
  const logo = typeof post?.content === 'object' && post?.content && typeof (post.content as any).logo === 'string'
    ? (post.content as any).logo
    : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

function getPostMeta(post?: SitePost | null) {
  if (!post || typeof post.content !== 'object' || !post.content) return { location: '', category: '' }
  const content = post.content as Record<string, unknown>
  return {
    location: typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : '',
    category: typeof content.category === 'string' ? content.category : typeof post.tags?.[0] === 'string' ? post.tags[0] : '',
  }
}

function getDirectoryTone(brandPack: string) {
  if (brandPack === 'market-utility') {
    return {
      shell: 'bg-[#f5f7f1] text-[#1f2617]',
      hero: 'bg-[linear-gradient(180deg,#eef4e4_0%,#f8faf4_100%)]',
      panel: 'border border-[#d5ddc8] bg-white shadow-[0_24px_64px_rgba(64,76,34,0.08)]',
      soft: 'border border-[#d5ddc8] bg-[#eff3e7]',
      muted: 'text-[#5b664c]',
      title: 'text-[#1f2617]',
      badge: 'bg-[#1f2617] text-[#edf5dc]',
      action: 'bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
      actionAlt: 'border border-[#d5ddc8] bg-white text-[#1f2617] hover:bg-[#eef3e7]',
    }
  }
  return {
    shell: 'bg-[#f8fbff] text-slate-950',
    hero: 'bg-[linear-gradient(180deg,#eef6ff_0%,#ffffff_100%)]',
    panel: 'border border-slate-200 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.08)]',
    soft: 'border border-slate-200 bg-slate-50',
    muted: 'text-slate-600',
    title: 'text-slate-950',
    badge: 'bg-slate-950 text-white',
    action: 'bg-slate-950 text-white hover:bg-slate-800',
    actionAlt: 'border border-slate-200 bg-white text-slate-950 hover:bg-slate-100',
  }
}

function getVisualTone() {
  return {
    shell: 'bg-[#07101f] text-white',
    panel: 'border border-white/10 bg-[rgba(11,18,31,0.78)] shadow-[0_28px_80px_rgba(0,0,0,0.35)]',
    soft: 'border border-white/10 bg-white/6',
    muted: 'text-slate-300',
    title: 'text-white',
    badge: 'bg-[#8df0c8] text-[#07111f]',
    action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    actionAlt: 'border border-white/10 bg-white/6 text-white hover:bg-white/10',
  }
}

function getCurationTone() {
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4] shadow-[0_24px_60px_rgba(91,56,37,0.08)]',
    soft: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    title: 'text-[#261811]',
    badge: 'bg-[#5b2b3b] text-[#fff0f5]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    actionAlt: 'border border-[#ddcdbd] bg-transparent text-[#261811] hover:bg-[#efe3d6]',
  }
}

function DirectoryHome({ primaryTask, enabledTasks, listingPosts, classifiedPosts, profilePosts, brandPack }: {
  primaryTask?: EnabledTask
  enabledTasks: EnabledTask[]
  listingPosts: SitePost[]
  classifiedPosts: SitePost[]
  profilePosts: SitePost[]
  brandPack: string
}) {
  const tone = getDirectoryTone(brandPack)
  const featuredListings = (listingPosts.length ? listingPosts : classifiedPosts).slice(0, 3)
  const featuredTaskKey: TaskKey = listingPosts.length ? 'listing' : 'classified'
  const quickRoutes = enabledTasks.slice(0, 4)

  return (
    <main>
      <section className={tone.hero}>
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
                <Compass className="h-3.5 w-3.5" />
                Local discovery product
              </span>
              <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
                Search businesses, compare options, and act fast without digging through generic feeds.
              </h1>
              <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>

              <div className={`mt-8 grid gap-3 rounded-[2rem] p-4 ${tone.panel} md:grid-cols-[1.25fr_0.8fr_auto]`}>
                <div className="rounded-full bg-black/5 px-4 py-3 text-sm">What do you need today?</div>
                <div className="rounded-full bg-black/5 px-4 py-3 text-sm">Choose area or city</div>
                <Link href={primaryTask?.route || '/listings'} className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                  Browse now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  ['Verified businesses', `${featuredListings.length || 3}+ highlighted surfaces`],
                  ['Fast scan rhythm', 'More utility, less filler'],
                  ['Action first', 'Call, visit, shortlist, compare'],
                ].map(([label, value]) => (
                  <div key={label} className={`rounded-[1.4rem] p-4 ${tone.soft}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">{label}</p>
                    <p className="mt-2 text-lg font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className={`rounded-[2rem] p-6 ${tone.panel}`}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">Primary lane</p>
                    <h2 className="mt-2 text-3xl font-semibold">{primaryTask?.label || 'Listings'}</h2>
                  </div>
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <p className={`mt-4 text-sm leading-7 ${tone.muted}`}>{primaryTask?.description || 'Structured discovery for services, offers, and business surfaces.'}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {quickRoutes.map((task) => {
                  const Icon = taskIcons[task.key as TaskKey] || LayoutGrid
                  return (
                    <Link key={task.key} href={task.route} className={`rounded-[1.6rem] p-5 ${tone.soft}`}>
                      <Icon className="h-5 w-5" />
                      <h3 className="mt-4 text-lg font-semibold">{task.label}</h3>
                      <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{task.description}</p>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Featured businesses</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Strong listings with clearer trust cues.</h2>
          </div>
          <Link href="/listings" className="text-sm font-semibold text-primary hover:opacity-80">Open listings</Link>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featuredListings.map((post) => (
            <TaskPostCard key={post.id} post={post} href={getTaskHref(featuredTaskKey, post.slug)} taskKey={featuredTaskKey} />
          ))}
        </div>
      </section>

      <section className={`${tone.shell}`}>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">What makes this different</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Built like a business directory, not a recolored content site.</h2>
            <ul className={`mt-6 space-y-3 text-sm leading-7 ${tone.muted}`}>
              <li>Search-first hero instead of a magazine headline.</li>
              <li>Action-oriented listing cards with trust metadata.</li>
              <li>Support lanes for offers, businesses, and profiles.</li>
            </ul>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {(profilePosts.length ? profilePosts : classifiedPosts).slice(0, 4).map((post) => {
              const meta = getPostMeta(post)
              const taskKey = resolveTaskKey(post.task, profilePosts.length ? 'profile' : 'classified')
              return (
                <Link key={post.id} href={getTaskHref(taskKey, post.slug)} className={`overflow-hidden rounded-[1.8rem] ${tone.panel}`}>
                  <div className="relative h-44 overflow-hidden">
                    <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] opacity-70">{meta.category || post.task || 'Profile'}</p>
                    <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
                    <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Quick access to local information and related surfaces.'}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

function EditorialHome({
  primaryTask,
  articlePosts,
  imagePosts,
  supportTasks,
}: {
  primaryTask?: EnabledTask
  articlePosts: SitePost[]
  imagePosts: SitePost[]
  supportTasks: EnabledTask[]
}) {
  const lead = articlePosts[0]
  const side = articlePosts.slice(1, 5)
  const hero = siteContent.hero
  const previewImg = lead ? getPostImage(lead) : imagePosts[0] ? getPostImage(imagePosts[0]) : '/placeholder.svg?height=900&width=1400'
  const chips = hero.chips

  return (
    <main className="relative overflow-hidden bg-[#faf6ff] text-[#0a0a0a]">
      <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-[rgba(250,235,146,0.4)] blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-32 h-80 w-80 rounded-full bg-[rgba(204,102,218,0.18)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[rgba(153,41,234,0.1)] blur-3xl" />

      <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#9929ea]/25 bg-[#faeb92]/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#2d0a3d]">
              <Zap className="h-3.5 w-3.5 text-[#9929ea]" aria-hidden />
              {hero.badge}
            </span>
            <h1
              className="mt-7 text-[2.4rem] font-bold leading-[1.06] tracking-[-0.02em] sm:text-5xl lg:text-[3.15rem]"
              style={{ fontFamily: 'var(--font-lobster), cursive' }}
            >
              {hero.title[0]}{' '}
              <span className="bg-gradient-to-r from-[#9929ea] to-[#cc66da] bg-clip-text text-transparent">{hero.title[1]}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#4a3b55] sm:text-lg">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={primaryTask?.route || '/articles'}
                className="inline-flex items-center gap-2 rounded-full bg-[#9929ea] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(100,20,200,0.3)] transition hover:-translate-y-0.5 hover:bg-[#8719d6]"
              >
                {hero.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#9929ea] bg-white/90 px-6 py-3 text-sm font-semibold text-[#4b0a6b] transition hover:bg-[#faf5ff]"
              >
                {hero.secondaryCta.label}
              </Link>
            </div>
            {chips.length ? (
              <div className="mt-8 flex flex-wrap gap-2.5">
                {chips.map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#e4d4f2] bg-white/90 px-3.5 py-1.5 text-xs font-medium text-[#2d0a3d] shadow-sm"
                  >
                    <FileText className="h-3.5 w-3.5 text-[#cc66da]" />
                    {label}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div
              className="pointer-events-none absolute -right-4 bottom-4 z-10 w-[min(100%,20rem)] rounded-2xl border border-white/80 bg-white p-4 text-left shadow-[0_24px_50px_rgba(40,10,80,0.18)]"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9929ea]">{hero.featureCardBadge}</p>
              <p className="mt-2 text-sm font-bold text-[#0a0a0a]">{hero.featureCardTitle}</p>
              <p className="mt-1 text-xs leading-relaxed text-[#4a3b55]">{hero.featureCardDescription}</p>
            </div>

            <div className="eyr-device-float relative pl-2">
              <div
                className="relative z-[1] mx-auto w-full max-w-[19rem] rounded-2xl border-4 border-[#1a1a1a] bg-[#111] p-1.5 shadow-2xl sm:max-w-[20rem]"
              >
                <div className="flex h-2 items-center justify-center gap-1 rounded-t-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                </div>
                <div className="relative aspect-[10/6] w-full overflow-hidden rounded-lg bg-gradient-to-br from-[#2d0a3d] via-[#4b1a6a] to-[#9929ea]">
                  <div className="absolute inset-2 rounded-md border border-white/10 bg-white/10 p-2 text-[7px] leading-tight text-white/90 sm:text-[8px]">
                    <p className="font-sans text-[#faeb92]">{SITE_CONFIG.domain}</p>
                    <p className="mt-1 font-sans opacity-90">Articles · read · share</p>
                    <div className="mt-1.5 space-y-0.5">
                      {side.slice(0, 2).map((p) => (
                        <p key={p.id} className="truncate text-[#faf5ff]">
                          {p.title}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-0.5 flex h-1 justify-center">
                  <span className="h-0.5 w-10 rounded-full bg-zinc-500" />
                </div>
              </div>
              <div
                className="absolute -left-2 top-10 z-0 hidden w-[11rem] -rotate-6 rounded-2xl border-4 border-[#e8e0f4] bg-white/95 p-2 shadow-xl sm:block"
              >
                <div className="mb-1 flex items-center justify-between text-[#9929ea]">
                  <Tablet className="h-4 w-4" />
                  <span className="text-[9px] font-semibold uppercase">Tablet</span>
                </div>
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
                  <ContentImage
                    src={previewImg}
                    alt=""
                    fill
                    className="object-cover"
                    intrinsicWidth={400}
                    intrinsicHeight={500}
                  />
                </div>
              </div>
              <div
                className="absolute -right-1 bottom-6 z-20 w-[4.2rem] rounded-[1.1rem] border-4 border-[#1a1a1a] bg-[#111] p-1.5 shadow-[0_18px_40px_rgba(0,0,0,0.3)]"
              >
                <div className="relative flex aspect-[9/18] items-stretch justify-center overflow-hidden rounded-md bg-gradient-to-b from-[#2a0a3a] to-[#0a0a0a] p-0.5">
                  <div className="m-0.5 w-full rounded-sm bg-gradient-to-b from-white/20 to-white/5" />
                </div>
                <div className="mt-0.5 flex h-0.5 justify-center">
                  <div className="h-0.5 w-5 rounded-full bg-zinc-600" />
                </div>
                <div className="mt-0.5 flex items-center justify-center text-white/30">
                  <Smartphone className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {side.length ? (
        <section className="border-t border-[#e4d4f2]/60 bg-gradient-to-b from-white/60 to-[#faf6ff]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-end justify-between gap-3">
              <h2
                className="text-2xl font-bold text-[#0a0a0a] sm:text-3xl"
                style={{ fontFamily: 'var(--font-lobster), cursive' }}
              >
                Fresh on the page
              </h2>
              <Link
                href="/articles"
                className="whitespace-nowrap text-sm font-semibold text-[#9929ea] transition hover:underline"
              >
                All articles
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {side.map((post) => (
                <Link
                  key={post.id}
                  href={`/articles/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#e4d4f2] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-[#cc66da]/50 hover:shadow-md"
                >
                  <h3
                    className="text-base font-bold leading-snug text-[#0a0a0a] group-hover:text-[#9929ea] sm:text-lg"
                    style={{ fontFamily: 'var(--font-lobster), cursive' }}
                  >
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-[#4a3b55]">
                    {post.summary || 'Open for a long-form read built for this site.'}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {lead ? (
        <section className="mx-auto max-w-7xl px-4 py-4 pb-16 sm:px-6 sm:py-6 lg:px-8">
          <div className="overflow-hidden rounded-[2.2rem] border border-[#e4d4f2] bg-white shadow-[0_32px_80px_rgba(50,20,100,0.1)]">
            <div className="grid bg-[#1a0a1c] text-white lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[280px] w-full sm:min-h-[340px]">
                <ContentImage src={getPostImage(lead)} alt={lead.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a]/70 to-transparent" />
                <p className="absolute bottom-4 left-4 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#faeb92]">
                  Lead story
                </p>
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-10">
                <h2
                  className="text-2xl font-bold leading-tight sm:text-3xl"
                  style={{ fontFamily: 'var(--font-lobster), cursive' }}
                >
                  {lead.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
                  {lead.summary || 'A deeper feature with room for a proper narrative, tuned for the Empower You Road read.'}
                </p>
                <Link
                  href={`/articles/${lead.slug}`}
                  className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[#faeb92] px-5 py-2.5 text-sm font-bold text-[#1a0a0c] transition hover:brightness-95"
                >
                  Open article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {supportTasks.length ? (
        <section className="border-t border-[#e4d4f2]/50 bg-white/70">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <h2
              className="mb-6 text-center text-xl font-bold sm:text-2xl"
              style={{ fontFamily: 'var(--font-lobster), cursive' }}
            >
              Explore the lanes we highlight here
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {supportTasks.map((task) => {
                const Icon = taskIcons[task.key as TaskKey] || FileText
                return (
                  <Link
                    key={task.key}
                    href={task.route}
                    className="group flex items-start gap-3 rounded-2xl border-2 border-[#e4d4f2] bg-gradient-to-br from-white to-[#faf5ff] p-5 transition hover:border-[#9929ea]/40"
                  >
                    <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#faeb92]/60 text-[#2d0a3d]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <h3
                        className="text-lg font-bold text-[#0a0a0a] group-hover:text-[#9929ea]"
                        style={{ fontFamily: 'var(--font-lobster), cursive' }}
                      >
                        {task.label}
                      </h3>
                      <p className="mt-1 text-sm text-[#4a3b55]">{task.description}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
            <p className="mt-6 text-center text-xs text-[#5c4a6a]">
              Other task routes on this site stay available by URL and search—this row only calls out what the navigation
              features first.
            </p>
          </div>
        </section>
      ) : null}
    </main>
  )
}

function VisualHome({ primaryTask, imagePosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; imagePosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getVisualTone()
  const gallery = imagePosts.length ? imagePosts.slice(0, 5) : articlePosts.slice(0, 5)
  const creators = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <ImageIcon className="h-3.5 w-3.5" />
              Visual publishing system
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Image-led discovery with creator profiles and a more gallery-like browsing rhythm.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/images'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Open gallery
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Meet creators
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.slice(0, 5).map((post, index) => (
              <Link
                key={post.id}
                href={getTaskHref(resolveTaskKey(post.task, 'image'), post.slug)}
                className={index === 0 ? `col-span-2 row-span-2 overflow-hidden rounded-[2.4rem] ${tone.panel}` : `overflow-hidden rounded-[1.8rem] ${tone.soft}`}
              >
                <div className={index === 0 ? 'relative h-[360px]' : 'relative h-[170px]'}>
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Visual notes</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Larger media surfaces, fewer boxes, stronger pacing.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>This product avoids business-directory density and publication framing. The homepage behaves more like a visual board, with profile surfaces and imagery leading the experience.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {creators.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <div className="relative h-40 overflow-hidden rounded-[1.2rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Creator profile and visual identity surface.'}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function CurationHome({ primaryTask, bookmarkPosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; bookmarkPosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getCurationTone()
  const collections = bookmarkPosts.length ? bookmarkPosts.slice(0, 4) : articlePosts.slice(0, 4)
  const people = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <Bookmark className="h-3.5 w-3.5" />
              Curated collections
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Save, organize, and revisit resources through shelves, boards, and curated collections.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/sbm'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Open collections
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Explore curators
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {collections.map((post) => (
              <Link key={post.id} href={getTaskHref(resolveTaskKey(post.task, 'sbm'), post.slug)} className={`rounded-[1.8rem] p-6 ${tone.panel}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Collection</p>
                <h3 className="mt-3 text-2xl font-semibold">{post.title}</h3>
                <p className={`mt-3 text-sm leading-8 ${tone.muted}`}>{post.summary || 'A calmer bookmark surface with room for context and grouping.'}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Why this feels different</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">More like saved boards and reading shelves than a generic post feed.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>The structure is calmer, the cards are less noisy, and the page encourages collecting and returning instead of forcing everything into a fast-scrolling list.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {people.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <div className="relative h-32 overflow-hidden rounded-[1.2rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>Curator profile, saved resources, and collection notes.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default async function HomePage() {
  if (HOME_PAGE_OVERRIDE_ENABLED) {
    return <HomePageOverride />
  }

  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const taskFeed: TaskFeedItem[] = (
    await Promise.all(
      enabledTasks.map(async (task) => ({
        task,
        posts: await fetchTaskPosts(task.key, 8, { allowMockFallback: false, fresh: true }),
      }))
    )
  ).filter(({ posts }) => posts.length)

  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]
  const supportTasks = enabledTasks.filter((task) => task.key !== primaryTask?.key)
  const listingPosts = taskFeed.find(({ task }) => task.key === 'listing')?.posts || []
  const classifiedPosts = taskFeed.find(({ task }) => task.key === 'classified')?.posts || []
  const articlePosts = taskFeed.find(({ task }) => task.key === 'article')?.posts || []
  const imagePosts = taskFeed.find(({ task }) => task.key === 'image')?.posts || []
  const profilePosts = taskFeed.find(({ task }) => task.key === 'profile')?.posts || []
  const bookmarkPosts = taskFeed.find(({ task }) => task.key === 'sbm')?.posts || []

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />
      {productKind === 'directory' ? (
        <DirectoryHome
          primaryTask={primaryTask}
          enabledTasks={enabledTasks}
          listingPosts={listingPosts}
          classifiedPosts={classifiedPosts}
          profilePosts={profilePosts}
          brandPack={recipe.brandPack}
        />
      ) : null}
      {productKind === 'editorial' ? (
        <EditorialHome
          primaryTask={primaryTask}
          articlePosts={articlePosts}
          imagePosts={imagePosts}
          supportTasks={supportTasks}
        />
      ) : null}
      {productKind === 'visual' ? (
        <VisualHome primaryTask={primaryTask} imagePosts={imagePosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      {productKind === 'curation' ? (
        <CurationHome primaryTask={primaryTask} bookmarkPosts={bookmarkPosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      <Footer />
    </div>
  )
}
