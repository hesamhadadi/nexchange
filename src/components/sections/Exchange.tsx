'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown, Zap, CheckCircle } from 'lucide-react';
import { useCryptoData, fmt } from '@/hooks/useCrypto';
import { useLang } from '@/context/LanguageContext';

export default function Exchange() {
  const { data } = useCryptoData();
  const { t, dir } = useLang();

  const [fromCoin, setFromCoin] = useState('bitcoin');
  const [toCoin, setToCoin] = useState('tether');
  const [fromAmount, setFromAmount] = useState('1');
  const [showSuccess, setShowSuccess] = useState(false);

  const from = data.find(c => c.id === fromCoin);
  const to = data.find(c => c.id === toCoin);

  const toAmount = (() => {
    if (!from || !to || !fromAmount) return '';
    const amt = parseFloat(fromAmount);
    if (isNaN(amt)) return '';
    const result = (amt * from.current_price) / to.current_price;
    return result.toFixed(6);
  })();

  const handleSwap = () => {
    setFromCoin(toCoin);
    setToCoin(fromCoin);
    setFromAmount(toAmount);
  };

  const handleExchange = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const popularCoins = data.slice(0, 8);
  const rate = from && to ? from.current_price / to.current_price : 0;
  const fee = from ? from.current_price * parseFloat(fromAmount || '0') * 0.001 : 0;

  return (
    <section id="exchange" className="py-20 sm:py-28 mesh-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={dir === 'rtl' ? 'text-right' : 'text-left'}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
              style={{ background: 'var(--indigo-dim)', border: '1px solid var(--border-glow)' }}
            >
              <Zap size={12} style={{ color: 'var(--indigo-bright)' }} />
              <span className="text-xs" style={{ color: 'var(--indigo-bright)' }}>{t('exchange.best')}</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              {t('exchange.title')}
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
              {t('exchange.subtitle')}
            </p>

            {/* Benefits */}
            {[
              { icon: '⚡', text: 'Instant execution, no delays' },
              { icon: '🔒', text: 'Non-custodial, you hold your keys' },
              { icon: '💎', text: 'Best rates aggregated from top DEXs' },
              { icon: '🌐', text: '500+ trading pairs available' },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-3 mb-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Right: Exchange Widget */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="rounded-2xl p-6 glow-indigo"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-glow)',
              }}
            >
              {/* From */}
              <div className="mb-2">
                <label className="text-xs mb-2 block" style={{ color: 'var(--text-muted)' }}>
                  {t('exchange.from')}
                </label>
                <div
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
                >
                  <select
                    value={fromCoin}
                    onChange={e => setFromCoin(e.target.value)}
                    className="flex items-center gap-2 bg-transparent outline-none text-sm font-medium cursor-pointer"
                    style={{ color: 'var(--text-primary)', minWidth: '120px' }}
                  >
                    {popularCoins.map(c => (
                      <option key={c.id} value={c.id} style={{ background: 'var(--bg-card)' }}>
                        {c.symbol.toUpperCase()} - {c.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={fromAmount}
                    onChange={e => setFromAmount(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-end text-lg font-semibold"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}
                    placeholder="0.00"
                  />
                </div>
                {from && (
                  <div className="text-xs mt-1 px-1" style={{ color: 'var(--text-muted)' }}>
                    ≈ {fmt.price(parseFloat(fromAmount || '0') * from.current_price)}
                  </div>
                )}
              </div>

              {/* Swap button */}
              <div className="flex justify-center my-3">
                <button
                  onClick={handleSwap}
                  className="p-2 rounded-xl transition-all hover:rotate-180"
                  style={{
                    background: 'var(--indigo-dim)',
                    border: '1px solid var(--border-glow)',
                    color: 'var(--indigo-bright)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <ArrowUpDown size={16} />
                </button>
              </div>

              {/* To */}
              <div className="mb-5">
                <label className="text-xs mb-2 block" style={{ color: 'var(--text-muted)' }}>
                  {t('exchange.to')}
                </label>
                <div
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
                >
                  <select
                    value={toCoin}
                    onChange={e => setToCoin(e.target.value)}
                    className="flex items-center gap-2 bg-transparent outline-none text-sm font-medium cursor-pointer"
                    style={{ color: 'var(--text-primary)', minWidth: '120px' }}
                  >
                    {popularCoins.map(c => (
                      <option key={c.id} value={c.id} style={{ background: 'var(--bg-card)' }}>
                        {c.symbol.toUpperCase()} - {c.name}
                      </option>
                    ))}
                  </select>
                  <div
                    className="flex-1 text-end text-lg font-semibold"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold)' }}
                  >
                    {toAmount || '0.00'}
                  </div>
                </div>
              </div>

              {/* Rate info */}
              <div
                className="rounded-xl p-3 mb-5 space-y-2"
                style={{ background: 'var(--bg-surface)' }}
              >
                <div className="flex justify-between items-center text-xs">
                  <span style={{ color: 'var(--text-muted)' }}>{t('exchange.rate')}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                    1 {from?.symbol.toUpperCase()} = {rate > 0 ? rate.toFixed(4) : '—'} {to?.symbol.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span style={{ color: 'var(--text-muted)' }}>{t('exchange.fee')}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                    {fee > 0 ? `$${fee.toFixed(4)}` : '—'} (0.1%)
                  </span>
                </div>
              </div>

              {/* Exchange button */}
              <button
                onClick={handleExchange}
                className="btn-gold w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
              >
                {showSuccess ? (
                  <>
                    <CheckCircle size={16} />
                    Order Placed!
                  </>
                ) : (
                  <>
                    <Zap size={16} />
                    {t('exchange.btn')}
                  </>
                )}
              </button>

              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-center text-xs"
                  style={{ color: 'var(--green)' }}
                >
                  ✓ Exchange order submitted successfully
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
