'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, TrendingDown, Star, RefreshCw } from 'lucide-react';
import { useCryptoData, fmt } from '@/hooks/useCrypto';
import { useLang } from '@/context/LanguageContext';

type Filter = 'all' | 'gainers' | 'losers';

export default function Markets() {
  const { data, loading, lastUpdated, refresh } = useCryptoData();
  const { t, dir } = useLang();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  const filtered = useMemo(() => {
    let d = [...data];
    if (search) d = d.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase())
    );
    if (filter === 'gainers') d = d.filter(c => c.price_change_percentage_24h > 0).sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    if (filter === 'losers') d = d.filter(c => c.price_change_percentage_24h < 0).sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
    return d;
  }, [data, search, filter]);

  const toggleFav = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const miniSparkline = (coin: typeof data[0]) => {
    const prices = coin.sparkline_in_7d?.price || Array.from({ length: 20 }, (_, i) => coin.current_price * (0.95 + Math.sin(i * 0.5) * 0.05));
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min || 1;
    const pts = prices.filter((_, i) => i % 3 === 0).map((p, i, arr) => {
      const x = (i / (arr.length - 1)) * 80;
      const y = 20 - ((p - min) / range) * 18;
      return `${x},${y}`;
    }).join(' ');
    const up = coin.price_change_percentage_24h >= 0;
    return (
      <svg width="80" height="24" viewBox="0 0 80 24" className="overflow-visible">
        <polyline
          points={pts}
          fill="none"
          stroke={up ? 'var(--green)' : 'var(--red)'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <section id="markets" className="scroll-mt-32 sm:scroll-mt-36 py-24 sm:py-32" style={{ background: 'var(--bg-deep)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`mb-10 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            {t('markets.title')}
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {t('markets.subtitle')}
            {lastUpdated && (
              <span className="ms-2" style={{ color: 'var(--text-muted)' }}>
                · {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </p>
        </motion.div>

        {/* Controls */}
        <div className={`flex flex-wrap gap-3 mb-6 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={14}
              className="absolute top-1/2 -translate-y-1/2"
              style={{
                [dir === 'rtl' ? 'right' : 'left']: '12px',
                color: 'var(--text-muted)',
              }}
            />
            <input
              type="text"
              placeholder={t('markets.search')}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-9 rounded-lg text-sm outline-none"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                [dir === 'rtl' ? 'paddingRight' : 'paddingLeft']: '32px',
                [dir === 'rtl' ? 'paddingLeft' : 'paddingRight']: '12px',
              }}
            />
          </div>

          {/* Filter tabs */}
          <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            {(['all', 'gainers', 'losers'] as Filter[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-3 py-2 text-xs font-medium transition-all"
                style={{
                  background: filter === f ? 'var(--indigo-dim)' : 'var(--bg-card)',
                  color: filter === f ? 'var(--indigo-bright)' : 'var(--text-muted)',
                }}
              >
                {t(`markets.${f}`)}
              </button>
            ))}
          </div>

          {/* Refresh */}
          <button
            onClick={refresh}
            className="p-2 rounded-lg transition-all"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
          >
            <RefreshCw size={14} />
          </button>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid var(--border)' }}
        >
          {/* Desktop header */}
          <div
            className="hidden md:grid grid-cols-[40px_2fr_1.5fr_1fr_1.5fr_1.5fr_80px_100px] gap-4 px-5 py-3 text-xs font-medium"
            style={{
              background: 'var(--bg-surface)',
              color: 'var(--text-muted)',
              borderBottom: '1px solid var(--border)',
              direction: dir,
            }}
          >
            <div></div>
            <div>{t('markets.coin')}</div>
            <div className="text-end">{t('markets.price')}</div>
            <div className="text-end">{t('markets.change')}</div>
            <div className="text-end">{t('markets.volume')}</div>
            <div className="text-end">{t('markets.cap')}</div>
            <div className="text-center">7d</div>
            <div className="text-center">{t('markets.trade')}</div>
          </div>

          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-16 shimmer" style={{ borderBottom: '1px solid var(--border)' }} />
            ))
          ) : (
            filtered.map((coin, i) => {
              const up = coin.price_change_percentage_24h >= 0;
              return (
                <motion.div
                  key={coin.id}
                  initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.02, duration: 0.3 }}
                  className="card-hover cursor-pointer"
                  style={{
                    borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                    background: 'var(--bg-card)',
                  }}
                >
                  {/* Mobile view */}
                  <div className="md:hidden flex items-center justify-between px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <img src={coin.image} alt={coin.symbol} className="w-9 h-9 rounded-full" />
                      <div>
                        <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{coin.name}</div>
                        <div className="text-xs uppercase" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{coin.symbol}</div>
                      </div>
                    </div>
                    <div className={dir === 'rtl' ? 'text-left' : 'text-right'}>
                      <div className="font-semibold text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                        {fmt.price(coin.current_price)}
                      </div>
                      <div
                        className="flex items-center gap-1 text-xs justify-end"
                        style={{ color: up ? 'var(--green)' : 'var(--red)' }}
                      >
                        {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                        {fmt.pct(coin.price_change_percentage_24h)}
                      </div>
                    </div>
                  </div>

                  {/* Desktop view */}
                  <div
                    className="hidden md:grid grid-cols-[40px_2fr_1.5fr_1fr_1.5fr_1.5fr_80px_100px] gap-4 items-center px-5 py-3.5"
                    style={{ direction: dir }}
                  >
                    <button onClick={(e) => { e.stopPropagation(); toggleFav(coin.id); }}>
                      <Star
                        size={14}
                        fill={favorites.includes(coin.id) ? 'var(--gold)' : 'none'}
                        style={{ color: favorites.includes(coin.id) ? 'var(--gold)' : 'var(--text-muted)' }}
                      />
                    </button>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium w-5 text-center" style={{ color: 'var(--text-muted)' }}>
                        {coin.market_cap_rank}
                      </span>
                      <img src={coin.image} alt={coin.symbol} className="w-8 h-8 rounded-full" />
                      <div>
                        <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{coin.name}</div>
                        <div className="text-xs uppercase" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{coin.symbol}</div>
                      </div>
                    </div>

                    <div className="text-end font-semibold text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                      {fmt.price(coin.current_price)}
                    </div>

                    <div className="text-end">
                      <span
                        className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md"
                        style={{
                          background: up ? 'var(--green-dim)' : 'var(--red-dim)',
                          color: up ? 'var(--green)' : 'var(--red)',
                        }}
                      >
                        {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                        {fmt.pct(coin.price_change_percentage_24h)}
                      </span>
                    </div>

                    <div className="text-end text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                      {fmt.cap(coin.total_volume)}
                    </div>

                    <div className="text-end text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                      {fmt.cap(coin.market_cap)}
                    </div>

                    <div className="flex justify-center">
                      {miniSparkline(coin)}
                    </div>

                    <div className="flex justify-center">
                      <button
                        className="btn-gold px-3 py-1.5 rounded-lg text-xs"
                        onClick={() => {
                          const el = document.getElementById('exchange');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        {t('markets.trade')}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>
      </div>
    </section>
  );
}
