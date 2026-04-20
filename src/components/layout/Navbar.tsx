'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, TrendingUp } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

export default function Navbar() {
  const { lang, setLang, t, dir } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.markets', href: '#markets' },
    { key: 'nav.exchange', href: '#exchange' },
    { key: 'nav.about', href: '#features' },
    { key: 'nav.contact', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-white/5 py-3'
            : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center glow-gold">
              <TrendingUp size={16} className="text-black" />
            </div>
            <span
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-xl font-bold text-glow-gold"
            >
              <span style={{ color: 'var(--gold)' }}>Nex</span>
              <span style={{ color: 'var(--text-primary)' }}>Change</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a
                key={l.key}
                href={l.href}
                className="text-sm transition-colors duration-200"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-light)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {t(l.key)}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'fa' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
              style={{
                background: 'var(--indigo-dim)',
                border: '1px solid var(--border-glow)',
                color: 'var(--indigo-bright)',
              }}
            >
              <Globe size={12} />
              <span>{lang === 'en' ? 'فارسی' : 'English'}</span>
            </button>

            {/* CTA */}
            <a
              href="#exchange"
              className="hidden sm:flex btn-gold px-4 py-2 rounded-lg text-sm"
            >
              {t('nav.trade')}
            </a>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg"
              style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)' }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[68px] inset-x-0 z-40 glass border-b"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
              {links.map(l => (
                <a
                  key={l.key}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-sm border-b"
                  style={{
                    color: 'var(--text-secondary)',
                    borderColor: 'var(--border)',
                  }}
                >
                  {t(l.key)}
                </a>
              ))}
              <a
                href="#exchange"
                onClick={() => setMobileOpen(false)}
                className="btn-gold px-4 py-2.5 rounded-lg text-sm text-center mt-1"
              >
                {t('nav.trade')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
