'use client'

import Link from 'next/link'
import { CircleCheck } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

function FooterBrand() {
  const name = SITE_CONFIG.name.replace(/^https?:\/\//, '').replace(/^www\./, '')
  const label = name.includes('.') ? name.split('.')[0] : name
  const compact = label.replace(/[^a-z0-9]/gi, '') || 'Business'
  return (
    <span className="press-logo-mark text-4xl font-black leading-none text-white">
      {compact.slice(0, 2)}<span className="text-[#5ab3ec]">{compact.slice(2, 3) || 's'}</span>{compact.slice(3)}
    </span>
  )
}

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  const handleLogout = () => {
    logout()
  }

  const publicLinks = [
    ['Home', '/'],
    ['About', '/about'],
    ['Contact', '/contact'],
  ]
  const guestLinks = [
    ['Login', '/login'],
    ['Register', '/signup'],
  ]

  return (
    <footer className="bg-[var(--slot4-dark-bg)] text-white">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <Link href="/" className="inline-flex"><FooterBrand /></Link>
            <p className="mt-6 max-w-lg text-lg font-semibold leading-8 text-white/58">Press release distribution, media visibility, and public announcement support for brands that need wider reach.</p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-black">Site Links</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {publicLinks.map(([label, href]) => (
                <Link key={`${label}-${href}`} href={href} className="text-base font-semibold text-white/58 transition hover:text-white">{label}</Link>
              ))}
              {session ? (
                <button type="button" onClick={handleLogout} className="text-left text-base font-semibold text-white/58 transition hover:text-white">
                  Logout
                </button>
              ) : (
                guestLinks.map(([label, href]) => (
                  <Link key={`${label}-${href}`} href={href} className="text-base font-semibold text-white/58 transition hover:text-white">{label}</Link>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm font-semibold text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>(c) {year} {SITE_CONFIG.name}. All rights reserved.</p>
          <p className="inline-flex w-fit items-center gap-2 rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-emerald-300"><CircleCheck className="h-4 w-4" /> Distribution Ready</p>
        </div>
      </div>
    </footer>
  )
}
