'use client';

import { useCryptoData, fmt } from '@/hooks/useCrypto';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

export default function TickerStrip() {
  const { data, loading } = useCryptoData();
  const { t } = useLang();

  if (loading || data.length === 0) {
    return (
      <div className="h-10 shimmer" style={{ borderBottom: '1px solid var(--border)' }} />
    );
  }

  const items = [...data.slice(0, 12), ...data.slice(0, 12)]; // duplicate for seamless loop

  return (
      <div
        className="relative overflow-hidden h-11 z-40"
        style={{
          background: 'var(--bg-deep)',
          borderBottom: '1px solid var(--border)',
          marginTop: '68px',
        }}
      >
      {/* Live badge */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 flex items-center gap-1.5 px-3"
        style={{
          background: 'linear-gradient(90deg, var(--bg-deep) 70%, transparent)',
          paddingRight: '24px',
        }}
      >
        <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: 'var(--green)' }} />
        <span className="text-xs font-medium" style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)' }}>
          {t('ticker.live')}
        </span>
      </div>

      <div className="ticker-track flex items-center h-full gap-8 whitespace-nowrap ps-28 sm:ps-32">
        {items.map((coin, i) => {
          const up = coin.price_change_percentage_24h >= 0;
          return (
            <div key={`${coin.id}-${i}`} className="flex items-center gap-2">
              <img src={coin.image} alt={coin.symbol} className="w-4 h-4 rounded-full" />
              <span className="text-xs font-semibold uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                {coin.symbol}
              </span>
              <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                {fmt.price(coin.current_price)}
              </span>
              <span
                className="flex items-center gap-0.5 text-xs font-medium"
                style={{ color: up ? 'var(--green)' : 'var(--red)' }}
              >
                {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {fmt.pct(coin.price_change_percentage_24h)}
              </span>
              <span className="text-xs" style={{ color: 'var(--border)', marginLeft: '4px' }}>·</span>
            </div>
          );
        })}
      </div>

      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none"
        style={{ background: 'linear-gradient(270deg, var(--bg-deep), transparent)' }}
      />
    </div>
  );
}
