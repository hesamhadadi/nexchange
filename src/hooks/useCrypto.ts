'use client';

import { useState, useEffect, useCallback } from 'react';

export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  market_cap: number;
  market_cap_rank: number;
  high_24h: number;
  low_24h: number;
  sparkline_in_7d?: { price: number[] };
  ath: number;
  circulating_supply: number;
}

const COINGECKO_URL = 'https://api.coingecko.com/api/v3';

// Fallback mock data when API is rate-limited
const MOCK_DATA: CryptoAsset[] = [
  { id:'bitcoin', symbol:'btc', name:'Bitcoin', image:'https://assets.coingecko.com/coins/images/1/large/bitcoin.png', current_price:67420, price_change_percentage_24h:2.34, total_volume:28500000000, market_cap:1324000000000, market_cap_rank:1, high_24h:68200, low_24h:65800, ath:73738, circulating_supply:19700000 },
  { id:'ethereum', symbol:'eth', name:'Ethereum', image:'https://assets.coingecko.com/coins/images/279/large/ethereum.png', current_price:3520, price_change_percentage_24h:-0.87, total_volume:15200000000, market_cap:423000000000, market_cap_rank:2, high_24h:3580, low_24h:3480, ath:4878, circulating_supply:120200000 },
  { id:'tether', symbol:'usdt', name:'Tether', image:'https://assets.coingecko.com/coins/images/325/large/Tether.png', current_price:1.00, price_change_percentage_24h:0.01, total_volume:68000000000, market_cap:110000000000, market_cap_rank:3, high_24h:1.001, low_24h:0.999, ath:1.32, circulating_supply:110000000000 },
  { id:'binancecoin', symbol:'bnb', name:'BNB', image:'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png', current_price:598, price_change_percentage_24h:1.12, total_volume:1800000000, market_cap:87000000000, market_cap_rank:4, high_24h:605, low_24h:588, ath:686, circulating_supply:145000000 },
  { id:'solana', symbol:'sol', name:'Solana', image:'https://assets.coingecko.com/coins/images/4128/large/solana.png', current_price:178, price_change_percentage_24h:3.45, total_volume:4200000000, market_cap:82000000000, market_cap_rank:5, high_24h:182, low_24h:172, ath:259, circulating_supply:460000000 },
  { id:'ripple', symbol:'xrp', name:'XRP', image:'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png', current_price:0.58, price_change_percentage_24h:-1.23, total_volume:1500000000, market_cap:32000000000, market_cap_rank:6, high_24h:0.60, low_24h:0.57, ath:3.84, circulating_supply:55000000000 },
  { id:'usd-coin', symbol:'usdc', name:'USDC', image:'https://assets.coingecko.com/coins/images/6319/large/usdc.png', current_price:1.00, price_change_percentage_24h:0.02, total_volume:7200000000, market_cap:43000000000, market_cap_rank:7, high_24h:1.001, low_24h:0.999, ath:1.17, circulating_supply:43000000000 },
  { id:'staked-ether', symbol:'steth', name:'Lido Staked ETH', image:'https://assets.coingecko.com/coins/images/13442/large/steth_logo.png', current_price:3515, price_change_percentage_24h:-0.90, total_volume:240000000, market_cap:28000000000, market_cap_rank:8, high_24h:3575, low_24h:3475, ath:4829, circulating_supply:7900000 },
  { id:'dogecoin', symbol:'doge', name:'Dogecoin', image:'https://assets.coingecko.com/coins/images/5/large/dogecoin.png', current_price:0.165, price_change_percentage_24h:4.20, total_volume:1800000000, market_cap:24000000000, market_cap_rank:9, high_24h:0.172, low_24h:0.158, ath:0.7376, circulating_supply:144000000000 },
  { id:'tron', symbol:'trx', name:'TRON', image:'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png', current_price:0.128, price_change_percentage_24h:0.65, total_volume:820000000, market_cap:11200000000, market_cap_rank:10, high_24h:0.130, low_24h:0.126, ath:0.2318, circulating_supply:87000000000 },
  { id:'cardano', symbol:'ada', name:'Cardano', image:'https://assets.coingecko.com/coins/images/975/large/cardano.png', current_price:0.485, price_change_percentage_24h:-2.10, total_volume:620000000, market_cap:17200000000, market_cap_rank:11, high_24h:0.498, low_24h:0.478, ath:3.10, circulating_supply:35500000000 },
  { id:'avalanche-2', symbol:'avax', name:'Avalanche', image:'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png', current_price:36.8, price_change_percentage_24h:1.88, total_volume:540000000, market_cap:15200000000, market_cap_rank:12, high_24h:37.5, low_24h:36.1, ath:144, circulating_supply:412000000 },
];

export function useCryptoData() {
  const [data, setData] = useState<CryptoAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(
        `${COINGECKO_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=24h`,
        { next: { revalidate: 60 } }
      );
      if (!res.ok) throw new Error('Rate limited');
      const json = await res.json();
      setData(json);
      setLastUpdated(new Date());
      setError(null);
    } catch {
      // Use mock data on error
      setData(MOCK_DATA);
      setLastUpdated(new Date());
      setError('Using demo data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialFetch = setTimeout(fetchData, 0);
    const interval = setInterval(fetchData, 60000);
    return () => {
      clearTimeout(initialFetch);
      clearInterval(interval);
    };
  }, [fetchData]);

  return { data, loading, error, lastUpdated, refresh: fetchData };
}

export function useTickerData() {
  const { data } = useCryptoData();
  return data.slice(0, 10);
}

// Format helpers
export const fmt = {
  price: (n: number) => {
    if (n >= 1000) return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
    if (n >= 1) return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(n);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 4, maximumFractionDigits: 6 }).format(n);
  },
  cap: (n: number) => {
    if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
    if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
    if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
    return `$${n.toFixed(0)}`;
  },
  pct: (n: number) => `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`,
  compact: (n: number) => Intl.NumberFormat('en', { notation: 'compact' }).format(n),
};
