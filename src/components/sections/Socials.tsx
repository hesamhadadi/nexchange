'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Users } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 14.55l-2.948-.924c-.641-.203-.654-.641.136-.949l11.57-4.461c.537-.194 1.006.131.836.949l-.86.056z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const socials = [
  {
    key: 'telegram',
    Icon: TelegramIcon,
    titleKey: 'social.telegram',
    descKey: 'social.telegram.desc',
    href: 'https://t.me/nexchange_official',
    color: '#229ED9',
    bg: 'rgba(34,158,217,0.1)',
    border: 'rgba(34,158,217,0.25)',
    stat: '48K members',
  },
  {
    key: 'instagram',
    Icon: InstagramIcon,
    titleKey: 'social.instagram',
    descKey: 'social.instagram.desc',
    href: 'https://instagram.com/nexchange_official',
    color: '#E1306C',
    bg: 'rgba(225,48,108,0.1)',
    border: 'rgba(225,48,108,0.25)',
    stat: '120K followers',
  },
  {
    key: 'twitter',
    Icon: XIcon,
    titleKey: 'social.twitter',
    descKey: 'social.twitter.desc',
    href: 'https://twitter.com/nexchange_official',
    color: '#f0f0ff',
    bg: 'rgba(240,240,255,0.07)',
    border: 'rgba(240,240,255,0.12)',
    stat: '85K followers',
  },
];

export default function Socials() {
  const { t, dir } = useLang();

  return (
    <section id="contact" className="scroll-mt-32 sm:scroll-mt-36 py-24 sm:py-32" style={{ background: 'var(--bg-deep)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
            style={{ background: 'var(--gold-dim)', border: '1px solid rgba(201,168,76,0.3)' }}
          >
            <Users size={12} style={{ color: 'var(--gold)' }} />
            <span className="text-xs" style={{ color: 'var(--gold-light)' }}>Community</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            {t('social.title')}
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {t('social.subtitle')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5">
          {socials.map((s, i) => (
            <motion.a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group block rounded-2xl p-6 card-hover ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${s.border}`,
                textDecoration: 'none',
              }}
            >
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: s.bg, color: s.color }}
                >
                  <s.Icon />
                </div>
                <ExternalLink
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--text-muted)' }}
                />
              </div>

              <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {t(s.titleKey)}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {t(s.descKey)}
              </p>

              <div
                className="text-xs font-semibold"
                style={{ fontFamily: 'var(--font-mono)', color: s.color }}
              >
                {s.stat}
              </div>
            </motion.a>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 rounded-3xl p-6 sm:p-8 lg:p-10 text-center"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
        >
          <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Stay ahead of the market
          </h3>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            Get daily market insights, trading signals, and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
            />
            <button className="btn-gold px-6 py-3 rounded-xl text-sm whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
