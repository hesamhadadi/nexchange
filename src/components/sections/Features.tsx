'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, TrendingUp, HeadphonesIcon } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

const features = [
  {
    icon: Shield,
    titleKey: 'features.secure.title',
    descKey: 'features.secure.desc',
    accent: 'var(--green)',
    bgAccent: 'var(--green-dim)',
  },
  {
    icon: Zap,
    titleKey: 'features.fast.title',
    descKey: 'features.fast.desc',
    accent: 'var(--gold)',
    bgAccent: 'var(--gold-dim)',
  },
  {
    icon: TrendingUp,
    titleKey: 'features.rates.title',
    descKey: 'features.rates.desc',
    accent: 'var(--indigo-bright)',
    bgAccent: 'var(--indigo-dim)',
  },
  {
    icon: HeadphonesIcon,
    titleKey: 'features.support.title',
    descKey: 'features.support.desc',
    accent: 'var(--red)',
    bgAccent: 'var(--red-dim)',
  },
];

export default function Features() {
  const { t, dir } = useLang();

  return (
    <section id="features" className="scroll-mt-32 sm:scroll-mt-36 py-24 sm:py-32" style={{ background: 'var(--bg-void)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`mb-14 max-w-2xl ${dir === 'rtl' ? 'text-right ms-auto' : 'text-left'}`}
        >
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            {t('features.title')}
          </h2>
          <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
            {t('features.subtitle')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-2xl p-6 card-hover ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: f.bgAccent }}
              >
                <f.icon size={22} style={{ color: f.accent }} />
              </div>
              <h3
                className="font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {t(f.titleKey)}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {t(f.descKey)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 divider-gold"
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-8 sm:gap-14"
        >
          {[
            { label: 'ISO 27001 Certified' },
            { label: 'SOC 2 Type II' },
            { label: 'GDPR Compliant' },
            { label: 'PCI DSS Level 1' },
            { label: '256-bit Encryption' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)' }} />
              <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
