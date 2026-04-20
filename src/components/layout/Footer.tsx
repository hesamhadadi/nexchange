'use client';

import { TrendingUp } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 14.55l-2.948-.924c-.641-.203-.654-.641.136-.949l11.57-4.461c.537-.194 1.006.131.836.949l-.86.056z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function Footer() {
  const { t, dir } = useLang();
  const year = new Date().getFullYear();

  const socialLinks = [
    { Icon: TelegramIcon, href: 'https://t.me/nexchange_official', color: '#229ED9' },
    { Icon: InstagramIcon, href: 'https://instagram.com/nexchange_official', color: '#E1306C' },
    { Icon: XIcon, href: 'https://twitter.com/nexchange_official', color: '#f0f0ff' },
  ];

  return (
    <footer className="py-14" style={{ background: 'var(--bg-void)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-10 mb-10 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className={`flex items-center gap-2.5 mb-4 ${dir === 'rtl' ? 'flex-row-reverse justify-end' : ''}`}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <TrendingUp size={16} className="text-black" />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700 }}>
                <span style={{ color: 'var(--gold)' }}>Nex</span>
                <span style={{ color: 'var(--text-primary)' }}>Change</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
              {t('footer.tagline')}
            </p>
            <div className={`flex items-center gap-3 ${dir === 'rtl' ? 'flex-row-reverse justify-end' : ''}`}>
              {socialLinks.map(({ Icon, href, color }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--gold)' }}>
              {t('footer.links')}
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: t('nav.home'), href: '#home' },
                { label: t('nav.markets'), href: '#markets' },
                { label: t('nav.exchange'), href: '#exchange' },
                { label: t('nav.about'), href: '#features' },
              ].map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-xs transition-colors hover:text-white" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--gold)' }}>
              {t('footer.legal')}
            </h4>
            <ul className="space-y-2.5">
              {[t('footer.privacy'), t('footer.terms'), t('footer.aml')].map(label => (
                <li key={label}>
                  <a href="#" className="text-xs transition-colors hover:text-white" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Assets */}
          <div>
            <h4 className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--gold)' }}>
              Markets
            </h4>
            <ul className="space-y-2.5">
              {['Bitcoin (BTC)', 'Ethereum (ETH)', 'Solana (SOL)', 'BNB', 'XRP', 'USDT / USDC'].map(name => (
                <li key={name} className="text-xs" style={{ color: 'var(--text-muted)' }}>{name}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider-gold mb-6" />
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 ${dir === 'rtl' ? 'sm:flex-row-reverse' : ''}`}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © {year} NexChange · {t('footer.rights')}
          </p>
          <p className="text-xs text-center sm:text-end max-w-sm" style={{ color: 'var(--text-muted)' }}>
            {t('footer.disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
}
