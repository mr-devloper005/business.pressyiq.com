'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const SESSION_KEY = 'slot4:local-auth-session'

const publicNavItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Search', href: '/search' },
]

const guestNavItems = [
  ...publicNavItems,
  { label: 'Login', href: '/login' },
  { label: 'Register', href: '/signup' },
]

const memberNavItems = [
  ...publicNavItems,
  { label: 'Create', href: '/create' },
]

function readStoredSession() {
  if (typeof window === 'undefined') return null
  try {
    const parsed = JSON.parse(window.localStorage.getItem(SESSION_KEY) || 'null')
    return parsed && typeof parsed.email === 'string' ? parsed as { name: string; email: string } : null
  } catch {
    return null
  }
}

function BrandMark() {
  return (
    <span className="flex items-center gap-3">
      <span className="relative block h-14 w-20 overflow-hidden rounded-xl sm:w-24" aria-hidden="true">
        <img src="/favicon.png" alt="Pressyiq Logo" className="h-full w-full object-contain" />
      </span>
      <span className="text-lg font-black tracking-[-0.035em] text-slate-950 sm:text-2xl">
        business.<span className="text-[var(--slot4-accent)]">Pressyiq</span>
      </span>
    </span>
  )
}

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()
  const [storedSession, setStoredSession] = useState<{ name: string; email: string } | null>(null)
  const activeSession = session || storedSession
  const navItems = activeSession ? memberNavItems : guestNavItems

  useEffect(() => {
    const syncSession = () => setStoredSession(readStoredSession())
    syncSession()
    window.addEventListener('slot4-auth-change', syncSession)
    window.addEventListener('storage', syncSession)
    return () => {
      window.removeEventListener('slot4-auth-change', syncSession)
      window.removeEventListener('storage', syncSession)
    }
  }, [])

  const handleLogout = () => {
    logout()
    setStoredSession(null)
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-transparent px-3 py-3 sm:px-5">
      <nav className="mx-auto flex min-h-[70px] max-w-[1216px] items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white/95 px-4 shadow-[0_12px_34px_rgba(24,42,64,.09)] backdrop-blur sm:px-6">
        <Link href="/" className="shrink-0" aria-label={`${SITE_CONFIG.name} home`}>
          <BrandMark />
          
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm font-extrabold text-slate-700 transition hover:text-[var(--slot4-accent)]">
              {item.label}
            </Link>
          ))}
          {activeSession ? (
            <div className="flex items-center gap-4">
              <span className="max-w-44 truncate rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-[var(--slot4-accent)]">{activeSession.name}</span>
              <button type="button" onClick={handleLogout} className="text-sm font-extrabold text-slate-700 transition hover:text-[var(--slot4-accent)]">
                Logout
              </button>
            </div>
          ) : null}
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-800 lg:hidden" aria-label="Toggle navigation">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="mx-auto mt-3 max-w-[1216px] rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(24,42,64,.13)] lg:hidden">
          <div className="grid gap-1">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm font-extrabold text-slate-700 hover:bg-slate-50">
                {item.label}
              </Link>
            ))}
            {activeSession ? (
              <div className="mt-2 border-t border-slate-100 pt-3">
                <p className="rounded-xl bg-blue-50 px-3 py-3 text-sm font-black text-[var(--slot4-accent)]">{activeSession.name}</p>
                <button type="button" onClick={handleLogout} className="mt-1 w-full rounded-xl px-3 py-3 text-left text-sm font-extrabold text-slate-700 hover:bg-slate-50">
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
