import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { MapPin, PenLine, Route } from 'lucide-react'
import type { Metadata } from 'next'

const pillars = [
  {
    title: 'Why we exist',
    body: 'empoweryouroad.com is built for readers who want depth, clarity, and ideas they can return to. We publish with intention, not speed for its own sake.',
  },
  {
    title: 'How we publish',
    body: 'Our focus is long-form writing, thoughtful visuals, and useful perspective. Every piece is shaped to be readable, shareable, and worth your time.',
  },
  {
    title: 'What to expect',
    body: 'You will find stories, essays, and image-led posts that favor substance over noise. The goal is simple: help you learn, reflect, and move forward.',
  },
] as const

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/about',
    title: `About ${SITE_CONFIG.name}`,
    description: `What ${SITE_CONFIG.name} is, why the site exists, and what readers can expect.`,
  })
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden border-b border-[#e4d4f2] bg-gradient-to-br from-[#faeb92]/30 via-white to-[#f3e8ff]">
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[rgba(204,102,218,0.2)] blur-3xl" />
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
            <Badge className="border border-[#9929ea]/30 bg-white/80 text-xs font-bold uppercase tracking-[0.2em] text-[#2d0a3d]">
              About the publication
            </Badge>
            <h1
              className="mt-6 text-4xl font-bold text-[#0a0a0a] sm:text-5xl"
              style={{ fontFamily: 'var(--font-lobster), cursive' }}
            >
              The road is for everyone who reads to grow.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#4a3b55] sm:text-lg">
              {SITE_CONFIG.name} is a reading-first publication for people who prefer meaningful ideas over empty
              scrolling. We care about clear writing, honest perspective, and a browsing experience that feels calm,
              vivid, and human.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-[#9929ea] px-6 text-white hover:bg-[#8719d6]">
                <Link href="/articles">Read the latest</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-2 border-[#9929ea] bg-white text-[#2d0a3d] hover:bg-[#faf5ff]"
              >
                <Link href="/contact">Get in touch</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-4 text-sm text-[#4a3b55]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#e4d4f2] bg-white/80 px-3 py-1.5">
                <MapPin className="h-4 w-4 text-[#9929ea]" />
                Online - independent editorial
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#e4d4f2] bg-white/80 px-3 py-1.5">
                <PenLine className="h-4 w-4 text-[#cc66da]" />
                Written for empoweryouroad.com
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#e4d4f2] bg-white/80 px-3 py-1.5">
                <Route className="h-4 w-4 text-[#0a0a0a]" />
                Journey over vanity metrics
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-3">
            {pillars.map((p) => (
              <Card key={p.title} className="border-[#e4d4f2] bg-card/90">
                <CardContent className="space-y-3 p-5">
                  <h2 className="text-lg font-bold text-[#0a0a0a]" style={{ fontFamily: 'var(--font-lobster), cursive' }}>
                    {p.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-[#4a3b55]">{p.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
