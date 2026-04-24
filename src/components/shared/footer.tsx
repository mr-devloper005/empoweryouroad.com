import Link from 'next/link'
import { FileText, Building2, LayoutGrid, Tag, Github, Twitter, Linkedin, Image as ImageIcon, User, ArrowRight } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { FOOTER_OVERRIDE_ENABLED, FooterOverride } from '@/overrides/footer'

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const footerLinks = {
  platform: SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  })),
  company: [
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Press', href: '/press' },
  ],
  resources: [
    { name: 'Help Center', href: '/help' },
    { name: 'Community', href: '/community' },
    { name: 'Developers', href: '/developers' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Licenses', href: '/licenses' },
  ],
}

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
]

export function Footer() {
  if (FOOTER_OVERRIDE_ENABLED) {
    return <FooterOverride />
  }

  const { recipe } = getFactoryState()
  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]

  if (recipe.footer === 'minimal-footer') {
    return (
      <footer className="border-t border-[#d7deca] bg-[#f4f6ef] text-[#1f2617]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
            <p className="mt-1 text-sm text-[#56604b]">{SITE_CONFIG.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {enabledTasks.slice(0, 5).map((task) => (
              <Link key={task.key} href={task.route} className="rounded-lg border border-[#d7deca] bg-white px-3 py-2 text-sm font-medium text-[#1f2617] hover:bg-[#ebefdf]">
                {task.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'dense-footer') {
    return (
      <footer className="border-t border-white/10 bg-[linear-gradient(180deg,#07111f_0%,#0b1a2e_100%)] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr_1fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
              <Link href="/" className="inline-block max-w-full" aria-label={SITE_CONFIG.name}>
                <img
                  src="/favicon.png?v=20260424d"
                  alt=""
                  width={280}
                  height={48}
                  className="h-10 w-auto max-h-12 object-contain object-left max-w-[min(100%,280px)]"
                />
              </Link>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">{SITE_CONFIG.description}</p>
              {primaryTask ? (
                <Link href={primaryTask.route} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#8df0c8] px-4 py-2.5 text-sm font-semibold text-[#07111f] hover:bg-[#77dfb8]">
                  Explore {primaryTask.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Surfaces</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  {footerLinks.platform.map((item: any) => (
                    <li key={item.name}><Link href={item.href} className="flex items-center gap-2 hover:text-white">{item.icon ? <item.icon className="h-4 w-4" /> : null}{item.name}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Resources</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  {footerLinks.resources.map((item) => (
                    <li key={item.name}><Link href={item.href} className="hover:text-white">{item.name}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Connect</h3>
                <div className="mt-4 flex gap-3">
                  {socialLinks.map((item) => (
                    <Link key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/8 p-2.5 text-slate-200 hover:bg-white/12 hover:text-white">
                      <item.icon className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-5 text-sm text-slate-400">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'editorial-footer') {
    return (
      <footer className="border-t border-[#e4d4f2] bg-[linear-gradient(180deg,#fffcff_0%,#faf0ff_100%)] text-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr_0.85fr]">
            <div>
              <Link href="/" className="inline-block max-w-full" aria-label={SITE_CONFIG.name}>
                <img
                  src="/favicon.png?v=20260424d"
                  alt=""
                  width={300}
                  height={52}
                  className="h-10 w-auto max-h-14 object-contain object-left sm:h-12 max-w-[min(100%,300px)]"
                />
              </Link>
              <p className="mt-6 max-w-md text-sm leading-7 text-[#4a3b55]">{SITE_CONFIG.description}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.24em] text-[#7a5f8a]">On the site</h4>
              <ul className="mt-4 space-y-3 text-sm text-[#2d0a3d]">
                {footerLinks.platform.map((item: { name: string; href: string }) => (
                  <li key={item.name}>
                    <Link href={item.href} className="hover:text-[#9929ea]">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.24em] text-[#7a5f8a]">Company</h4>
              <ul className="mt-4 space-y-3 text-sm text-[#2d0a3d]">
                {footerLinks.company.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="hover:text-[#9929ea]">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-[#e4d4f2]/80 pt-6 text-center text-xs text-[#5c4a6a]">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. {SITE_CONFIG.domain}
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="border-t border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] text-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" className="inline-block max-w-full" aria-label={SITE_CONFIG.name}>
              <img
                src="/favicon.png?v=20260424d"
                alt=""
                width={280}
                height={48}
                className="h-10 w-auto max-h-11 object-contain object-left max-w-[min(100%,280px)]"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">{SITE_CONFIG.description}</p>
          </div>
          {(['platform', 'company', 'resources', 'legal'] as const).map((section) => (
            <div key={section}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">{section}</h3>
              <ul className="mt-5 space-y-3 text-sm text-slate-600">
                {footerLinks[section].map((item: any) => (
                  <li key={item.name}><Link href={item.href} className="flex items-center gap-2 hover:text-slate-950">{item.icon ? <item.icon className="h-4 w-4" /> : null}{item.name}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</div>
      </div>
    </footer>
  )
}
