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
    title: 'Ideas in motion',
    body: 'empoweryouroad.com started as a simple bet: the open road is a better metaphor for learning than a generic feed. We publish and surface long-form work that respects your attention.',
  },
  {
    title: 'Color with purpose',
    body: 'We use bold purple, orchid, and butter yellow to create energy without turning the page into a brochure. The palette supports scanning, then gets out of the way when you read.',
  },
  {
    title: 'Same engine, new coat of paint',
    body: 'This site runs on the same task and posting system as other properties in the family. What you see here is a presentation layer: identity, layout, and voice belong to Empower You Road alone.',
  },
] as const

const facts = [
  { label: 'Flagship task', value: 'Articles' },
  { label: 'Secondary lane', value: 'Images' },
  { label: 'Domain', value: 'empoweryouroad.com' },
] as const

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/about',
    title: `About ${SITE_CONFIG.name}`,
    description: `What ${SITE_CONFIG.name} is, why the site exists, and how we think about long-form reading.`,
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
              {SITE_CONFIG.name} is the article-led home of {SITE_CONFIG.domain}. We focus on clear writing, strong
              visuals, and a browsing rhythm that does not look like a recycled template from some other site on the
              same stack.
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
                Online · independent editorial
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
          <div className="grid gap-4 sm:grid-cols-3">
            {facts.map((item) => (
              <Card key={item.label} className="border-[#e4d4f2] bg-gradient-to-b from-white to-[#faf5ff]">
                <CardContent className="p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7a5f8a]">{item.label}</p>
                  <p
                    className="mt-2 text-lg font-bold text-[#0a0a0a]"
                    style={{ fontFamily: 'var(--font-lobster), cursive' }}
                  >
                    {item.value}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
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

          <Card className="mt-10 border-[#e4d4f2] border-dashed bg-[#faf5ff]/60">
            <CardContent className="space-y-2 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#0a0a0a]" style={{ fontFamily: 'var(--font-lobster), cursive' }}>
                No borrowed voice
              </h2>
              <p className="text-sm leading-relaxed text-[#4a3b55]">
                We cleared placeholder stats and fake team rosters. If you need to reach the people behind the site, use
                the contact form—this page is the real story, not a clone of a directory product dressed up in serif
                type.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  )
}
