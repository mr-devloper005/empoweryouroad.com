'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main>
        <section className="border-b border-[#e4d4f2]/80 bg-gradient-to-r from-[#faeb92]/25 via-white to-[#f3e8ff]/40">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1
                  className="text-3xl font-bold text-foreground sm:text-4xl"
                  style={{ fontFamily: 'var(--font-lobster), cursive' }}
                >
                  {title}
                </h1>
                {description && (
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {description}
                  </p>
                )}
              </div>
              {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          {children}
        </section>
      </main>
      <Footer />
    </div>
  )
}
