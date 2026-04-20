'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { fmt } from '@/hooks/useCrypto';

interface Props {
  coinId: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  change24h: number;
}

type Range = '1' | '7' | '30' | '90';

const MOCK_PRICES: Record<Range, number[]> = {
  '1': Array.from({ length: 24 }, (_, i) => 67000 + Math.sin(i * 0.4) * 1200 + Math.random() * 600),
  '7': Array.from({ length: 7 * 24 }, (_, i) => 62000 + Math.sin(i * 0.1) * 3000 + i * 40 + Math.random() * 800),
  '30': Array.from({ length: 30 }, (_, i) => 58000 + Math.sin(i * 0.3) * 4000 + i * 200 + Math.random() * 1500),
  '90': Array.from({ length: 90 }, (_, i) => 48000 + Math.sin(i * 0.15) * 6000 + i * 150 + Math.random() * 2000),
};

export default function PriceChart({ coinId, symbol, name, image, currentPrice, change24h }: Props) {
  const [range, setRange] = useState<Range>('7');
  const [prices, setPrices] = useState<number[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try CoinGecko, fallback to mock
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${range}`;
    fetch(url)
      .then(r => r.json())
      .then(d => {
        if (d.prices) setPrices(d.prices.map((p: [number, number]) => p[1]));
        else setPrices(MOCK_PRICES[range]);
      })
      .catch(() => setPrices(MOCK_PRICES[range]))
      .finally(() => setLoading(false));
  }, [coinId, range]);

  const up = change24h >= 0;
  const displayPrices = prices.length > 0 ? prices : MOCK_PRICES[range];
  const min = Math.min(...displayPrices);
  const max = Math.max(...displayPrices);
  const rangeVal = max - min || 1;

  const W = 600, H = 140;
  const pts = displayPrices.map((p, i) => {
    const x = (i / (displayPrices.length - 1)) * W;
    const y = H - ((p - min) / rangeVal) * (H - 10) - 5;
    return [x, y] as [number, number];
  });

  const pathD = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const areaD = `${pathD} L${W},${H} L0,${H} Z`;

  const hovered = hoveredIdx !== null ? displayPrices[hoveredIdx] : null;

  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <img src={image} alt={symbol} className="w-9 h-9 rounded-full" />
          <div>
            <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{name}</div>
            <div className="text-xs uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{symbol}/USD</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-lg" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            {hovered ? fmt.price(hovered) : fmt.price(currentPrice)}
          </div>
          <div className={`flex items-center gap-1 text-xs justify-end`} style={{ color: up ? 'var(--green)' : 'var(--red)' }}>
            {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {fmt.pct(change24h)}
          </div>
        </div>
      </div>

      {/* Range buttons */}
      <div className="flex gap-1.5 mb-4">
        {(['1', '7', '30', '90'] as Range[]).map(r => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
            style={{
              background: range === r ? 'var(--indigo-dim)' : 'transparent',
              color: range === r ? 'var(--indigo-bright)' : 'var(--text-muted)',
              border: range === r ? '1px solid var(--border-glow)' : '1px solid transparent',
            }}
          >
            {r === '1' ? '24H' : r === '7' ? '7D' : r === '30' ? '1M' : '3M'}
          </button>
        ))}
      </div>

      {/* SVG Chart */}
      <div className="relative">
        {loading ? (
          <div className="h-36 shimmer rounded-xl" />
        ) : (
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full"
            style={{ height: '140px', cursor: 'crosshair' }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * W;
              const idx = Math.round((x / W) * (displayPrices.length - 1));
              setHoveredIdx(Math.max(0, Math.min(displayPrices.length - 1, idx)));
            }}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <defs>
              <linearGradient id={`grad-${coinId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={up ? 'var(--green)' : 'var(--red)'} stopOpacity="0.25" />
                <stop offset="100%" stopColor={up ? 'var(--green)' : 'var(--red)'} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={areaD} fill={`url(#grad-${coinId})`} />
            <path d={pathD} fill="none" stroke={up ? 'var(--green)' : 'var(--red)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

            {/* Hover line */}
            {hoveredIdx !== null && pts[hoveredIdx] && (
              <>
                <line
                  x1={pts[hoveredIdx][0]} y1={0}
                  x2={pts[hoveredIdx][0]} y2={H}
                  stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,3"
                />
                <circle
                  cx={pts[hoveredIdx][0]}
                  cy={pts[hoveredIdx][1]}
                  r="4"
                  fill={up ? 'var(--green)' : 'var(--red)'}
                  stroke="var(--bg-card)"
                  strokeWidth="2"
                />
              </>
            )}
          </svg>
        )}
      </div>

      {/* Min/Max */}
      <div className="flex justify-between mt-2">
        <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          L: {fmt.price(min)}
        </span>
        <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          H: {fmt.price(max)}
        </span>
      </div>
    </div>
  );
}
