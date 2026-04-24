import Link from 'next/link'
import { Sparkles, BookOpen, Clock } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { Badge } from '@/components/ui/badge'
import { RichContent } from '@/components/shared/rich-content'
import { ArticleComments } from '@/components/tasks/article-comments'
import { ArticleReadingProgress } from '@/components/tasks/article-reading-progress'
import { siteContent } from '@/config/site.content'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'

type ArticleReadingLayoutProps = {
  postTitle: string
  articleAuthor: string
  articleDate: string
  category: string
  articleSummary: string
  postTags: string[]
  leadImage: string | null
  articleHtml: string
  postSlug: string
  backHref: string
  backLabel: string
}

const estReadMinutes = (html: string) => {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  const words = text ? text.split(' ').length : 0
  return Math.max(1, Math.round(words / 220))
}

export function ArticleReadingLayout({
  postTitle,
  articleAuthor,
  articleDate,
  category,
  articleSummary,
  postTags,
  leadImage,
  articleHtml,
  postSlug,
  backHref,
  backLabel,
}: ArticleReadingLayoutProps) {
  const readTime = estReadMinutes(articleHtml)

  return (
    <>
      <ArticleReadingProgress />
      <div className="min-h-screen">
        <header
          className="relative overflow-hidden border-b border-[#e4d4f2] bg-[linear-gradient(125deg,rgba(250,235,146,0.35)_0%,rgba(255,255,255,0.9)_45%,rgba(243,232,255,0.95)_100%)]"
        >
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-[rgba(153,41,234,0.12)] blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-[rgba(204,102,218,0.12)] blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
            <Link
              href={backHref}
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#5c4a6a] transition-colors hover:text-[#0a0a0a]"
            >
              <span aria-hidden>←</span> Back to {backLabel}
            </Link>

            <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#5c1a7a]">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#9929ea]/25 bg-white/80 px-3 py-1 text-[10px] text-[#2d0a3d]">
                    <Sparkles className="h-3 w-3" />
                    {siteContent.hero.badge}
                  </span>
                  {articleDate ? <span className="text-[#5c4a6a]">{articleDate}</span> : null}
                </div>
                <h1
                  className="font-[family-name:var(--font-lobster)] text-[2.4rem] font-bold leading-[1.08] tracking-[-0.02em] text-[#0a0a0a] sm:text-5xl lg:text-[3.1rem]"
                  style={{ fontFamily: 'var(--font-lobster), cursive' }}
                >
                  {postTitle}
                </h1>
                {articleSummary ? (
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#4a3b55] sm:text-lg">
                    {articleSummary}
                  </p>
                ) : null}
                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[#4a3b55]">
                  <span className="font-medium text-[#0a0a0a]">By {articleAuthor}</span>
                  <span className="hidden h-1 w-1 rounded-full bg-[#cc66da] sm:block" />
                  <span className="inline-flex items-center gap-1.5 text-[#5c4a6a]">
                    <Clock className="h-4 w-4" />
                    {readTime} min read
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-[#9929ea]" />
                    <span className="text-[#2d0a3d]">{category}</span>
                  </span>
                </div>
                {postTags.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {postTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="border border-[#e4d4f2] bg-[#faf5ff] text-xs font-medium text-[#2d0a3d] hover:bg-[#f3e8ff]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </div>

              {leadImage ? (
                <div className="eyr-device-float relative mx-auto w-full max-w-md">
                  <div
                    className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.8rem] border-2 border-white shadow-[0_30px_80px_rgba(60,20,100,0.2)]"
                  >
                    <ContentImage
                      src={leadImage}
                      alt={postTitle}
                      fill
                      className="object-cover"
                      priority
                      intrinsicWidth={1200}
                      intrinsicHeight={900}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 mix-blend-multiply"
                      style={{
                        background:
                          'linear-gradient(200deg, rgba(153,41,234,0.08) 0%, rgba(0,0,0,0.1) 100%)',
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="eyr-device-float flex min-h-[220px] items-center justify-center rounded-[1.8rem] border-2 border-dashed border-[#d8b8ef] bg-[#faf5ff]/80 p-6 text-center text-sm text-[#5c4a6a]">
                  No lead image for this post—scroll for the text.
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div
            className={cn(
              'grid gap-10 lg:grid-cols-1',
              'lg:grid-cols-[minmax(0,1fr)_minmax(220px,280px)]',
            )}
          >
            <article
              className="min-w-0 border-b border-[#f0e6fb] pb-10 lg:border-b-0 lg:pb-0"
              data-article-experience="eyr-v1"
            >
              <RichContent
                html={articleHtml}
                className="eyr-article-prose text-[#1f1429] [&_blockquote]:border-l-[#cc66da] [&_blockquote]:bg-[#faf5ff] [&_blockquote]:py-1"
              />
              <div className="mt-10 rounded-2xl border border-[#e4d4f2] bg-[#faf5ff] px-4 py-3 text-center text-sm text-[#4a3b55]">
                Published on {SITE_CONFIG.name}. Comments stay attached to this article only.
              </div>
            </article>

            <aside className="min-w-0 space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-[#e4d4f2] bg-white p-5 shadow-[0_20px_50px_rgba(50,20,80,0.08)]">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7a5f8a]">On this page</p>
                <ul className="mt-4 space-y-3 text-sm text-[#2d0a3d]">
                  <li className="flex items-start justify-between gap-2">
                    <span>Author</span>
                    <span className="text-right font-medium text-[#0a0a0a]">{articleAuthor}</span>
                  </li>
                  {articleDate ? (
                    <li className="flex items-start justify-between gap-2">
                      <span>Date</span>
                      <span className="text-right font-medium">{articleDate}</span>
                    </li>
                  ) : null}
                  <li className="flex items-start justify-between gap-2">
                    <span>Topic</span>
                    <span className="text-right font-medium">{category}</span>
                  </li>
                </ul>
                <p className="mt-4 border-t border-[#f0e6fb] pt-4 text-xs leading-relaxed text-[#5c4a6a]">
                  This view is a presentation-only skin: search, task routes, and comments work the same as
                  the shared platform.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <ArticleComments slug={postSlug} />
    </>
  )
}
