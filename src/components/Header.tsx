'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { site, telHref } from '@/lib/site';
import { services } from '@/lib/services';
import { areas } from '@/lib/areas';

const navLinks = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/before-and-after', label: 'Before & after' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const drawer = useRef<HTMLDivElement>(null);

  // Close everything on navigation.
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Lock scroll behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Escape closes the drawer and the dropdown. While the drawer is open, Tab is
  // kept inside it — otherwise focus walks off into the page behind, which a
  // keyboard or screen-reader user cannot see is still there.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setServicesOpen(false);
        return;
      }

      if (e.key !== 'Tab' || !open || !drawer.current) return;

      const focusable = drawer.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || !drawer.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Move focus into the drawer when it opens.
  useEffect(() => {
    if (!open) return;
    drawer.current?.querySelector<HTMLElement>('a[href]')?.focus();
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100/80 bg-sand-50/90 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo />

        {/* ───────── Desktop nav ───────── */}
        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen((v) => !v)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition hover:bg-white ${
                isActive('/services') ? 'text-sage-700' : 'text-ink-700'
              }`}
            >
              Services
              <svg
                viewBox="0 0 20 20"
                className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {servicesOpen && (
              <div className="absolute left-0 top-full w-[21rem] pt-2">
                <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white p-2 shadow-lift">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="block rounded-xl px-3 py-2.5 text-sm text-ink-700 transition hover:bg-sand-100 hover:text-ink-900"
                    >
                      {s.name}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    className="mt-1 block rounded-xl bg-sand-100 px-3 py-2.5 text-sm font-semibold text-sage-700"
                  >
                    All services
                  </Link>
                </div>
              </div>
            )}
          </div>

          {areas.map((a) => (
            <Link
              key={a.slug}
              href={`/${a.slug}`}
              className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition hover:bg-white ${
                isActive(`/${a.slug}`) ? 'text-sage-700' : 'text-ink-700'
              }`}
            >
              {a.city}
            </Link>
          ))}

          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition hover:bg-white ${
                isActive(l.href) ? 'text-sage-700' : 'text-ink-700'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* ───────── Desktop actions ───────── */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={telHref}
            className="whitespace-nowrap text-sm font-semibold text-ink-800 transition hover:text-sage-700"
          >
            {site.phone}
          </a>
          <Link href="/#quote" className="btn-primary whitespace-nowrap !px-5 !py-2.5 text-sm">
            Get a quote
          </Link>
        </div>

        {/* ───────── Mobile toggle ───────── */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="-mr-1 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-800 transition hover:bg-white lg:hidden"
        >
          {open ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* ───────── Mobile drawer ───────── */}
      {open && (
        <div
          id="mobile-menu"
          ref={drawer}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-ink-100 bg-sand-50 lg:hidden"
        >
          <nav aria-label="Mobile" className="container-page py-6">
            <p className="eyebrow mb-3">Services</p>
            <ul className="mb-7 space-y-1">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="block rounded-xl px-3 py-3 text-[1.05rem] text-ink-800 transition hover:bg-white"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="eyebrow mb-3">Areas</p>
            <ul className="mb-7 space-y-1">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/${a.slug}`}
                    className="block rounded-xl px-3 py-3 text-[1.05rem] text-ink-800 transition hover:bg-white"
                  >
                    {a.city}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="eyebrow mb-3">More</p>
            <ul className="space-y-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block rounded-xl px-3 py-3 text-[1.05rem] text-ink-800 transition hover:bg-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="block rounded-xl px-3 py-3 text-[1.05rem] text-ink-800 transition hover:bg-white"
                >
                  Contact
                </Link>
              </li>
            </ul>

            <div className="mt-8 grid gap-3 pb-10">
              <Link href="/#quote" className="btn-primary w-full">
                Get a quote
              </Link>
              <a href={telHref} className="btn-secondary w-full">
                Call {site.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
