'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { useCryptoData, fmt } from '@/hooks/useCrypto';

const stats = [
  { key: 'hero.stat.volume', value: '$2.4B', suffix: '+' },
  { key: 'hero.stat.users', value: '180K', suffix: '+' },
  { key: 'hero.stat.coins', value: '500', suffix: '+' },
  { key: 'hero.stat.uptime', value: '99.9', suffix: '%' },
];

export default function Hero() {
  const { t, dir } = useLang();
  const { data } = useCryptoData();
  const btc = data.find(c => c.id === 'bitcoin');
  const eth = data.find(c => c.id === 'ethereum');

  return (
    <section
      id="home"
      className="relative scroll-mt-32 sm:scroll-mt-36 flex flex-col justify-center mesh-bg overflow-hidden"
      style={{ minHeight: 'calc(100vh - var(--navbar-height) - var(--ticker-height))' }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--indigo) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--gold) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12 sm:pb-14">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left content */}
          <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
              style={{
                background: 'var(--gold-dim)',
                border: '1px solid rgba(201,168,76,0.3)',
              }}
            >
              <Sparkles size={12} style={{ color: 'var(--gold)' }} />
              <span className="text-xs font-medium" style={{ color: 'var(--gold-light)' }}>
                {t('hero.badge')}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-5"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span style={{ color: 'var(--text-primary)' }}>{t('hero.title1')}</span>
              <br />
              <span className="text-glow-gold" style={{ color: 'var(--gold)' }}>
                {t('hero.title2')}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg leading-relaxed mb-7 max-w-xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`flex flex-wrap gap-3 mb-10 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}
            >
              <a
                href="#exchange"
                className="btn-gold flex items-center gap-2 px-6 py-3 rounded-xl text-sm"
              >
                {t('hero.cta.primary')}
                <ArrowRight size={16} />
              </a>
              <a
                href="#markets"
                className="btn-outline flex items-center gap-2 px-6 py-3 rounded-xl text-sm"
              >
                {t('hero.cta.secondary')}
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6"
            >
              {stats.map((s) => (
                <div key={s.key} className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                  <div
                    className="text-2xl font-bold"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold)' }}
                  >
                    {s.value}<span style={{ color: 'var(--gold-light)', fontSize: '0.7em' }}>{s.suffix}</span>
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {t(s.key)}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Floating cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative h-[460px] xl:h-[500px]"
          >
            {/* Main BTC card */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 rounded-2xl p-6 float-anim card-hover"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png" className="w-10 h-10 rounded-full" alt="BTC" />
                  <div>
                    <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Bitcoin</div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>BTC/USD</div>
                  </div>
                </div>
                <div
                  className="text-xs px-2 py-1 rounded-lg font-medium"
                  style={{
                    background: btc && btc.price_change_percentage_24h >= 0 ? 'var(--green-dim)' : 'var(--red-dim)',
                    color: btc && btc.price_change_percentage_24h >= 0 ? 'var(--green)' : 'var(--red)',
                  }}
                >
                  {btc ? fmt.pct(btc.price_change_percentage_24h) : '+2.34%'}
                </div>
              </div>

              {/* Mini sparkline */}
              <div className="h-16 flex items-end gap-0.5 mb-4">
                {[40,55,45,65,58,72,68,80,75,85,78,90,88,95,92,100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bar-animate"
                    style={{
                      height: `${h}%`,
                      background: `linear-gradient(to top, var(--gold), rgba(201,168,76,0.3))`,
                      animationDelay: `${i * 0.04}s`,
                    }}
                  />
                ))}
              </div>

              <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                {btc ? fmt.price(btc.current_price) : '$67,420'}
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                24h Vol: {btc ? fmt.cap(btc.total_volume) : '$28.5B'}
              </div>
            </div>

            {/* ETH card - floating top right */}
            <div
              className="absolute top-8 right-0 w-44 rounded-xl p-4"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                animation: 'float 5s ease-in-out infinite 1s',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <img src="https://assets.coingecko.com/coins/images/279/large/ethereum.png" className="w-7 h-7 rounded-full" alt="ETH" />
                <span className="font-semibold text-xs" style={{ color: 'var(--text-primary)' }}>Ethereum</span>
              </div>
              <div className="font-bold text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--indigo-bright)' }}>
                {eth ? fmt.price(eth.current_price) : '$3,520'}
              </div>
              <div
                className="text-xs mt-1"
                style={{ color: eth && eth.price_change_percentage_24h >= 0 ? 'var(--green)' : 'var(--red)' }}
              >
                {eth ? fmt.pct(eth.price_change_percentage_24h) : '-0.87%'}
              </div>
            </div>

            {/* SOL card - bottom left */}
            <div
              className="absolute bottom-12 left-0 w-40 rounded-xl p-4"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                animation: 'float 6s ease-in-out infinite 2s',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <img src="https://assets.coingecko.com/coins/images/4128/large/solana.png" className="w-7 h-7 rounded-full" alt="SOL" />
                <span className="font-semibold text-xs" style={{ color: 'var(--text-primary)' }}>Solana</span>
              </div>
              <div className="font-bold text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)' }}>
                $178.40
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--green)' }}>+3.45%</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} style={{ color: 'var(--text-muted)' }} />
        </motion.div>
      </div>
    </section>
  );
}
