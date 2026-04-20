'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Lang = 'en' | 'fa';

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.exchange': 'Exchange',
    'nav.markets': 'Markets',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.trade': 'Start Trading',

    // Hero
    'hero.badge': 'Premium Digital Exchange',
    'hero.title1': 'The Future of',
    'hero.title2': 'Digital Wealth',
    'hero.subtitle': 'Trade cryptocurrencies with confidence. Real-time prices, zero-compromise security, and an experience crafted for discerning investors.',
    'hero.cta.primary': 'Begin Trading',
    'hero.cta.secondary': 'View Markets',
    'hero.stat.volume': '24h Volume',
    'hero.stat.users': 'Active Users',
    'hero.stat.coins': 'Listed Assets',
    'hero.stat.uptime': 'Uptime',

    // Ticker
    'ticker.live': 'Live',

    // Markets
    'markets.title': 'Live Markets',
    'markets.subtitle': 'Real-time prices for top digital assets',
    'markets.coin': 'Asset',
    'markets.price': 'Price',
    'markets.change': '24h Change',
    'markets.volume': 'Volume',
    'markets.cap': 'Market Cap',
    'markets.trade': 'Trade',
    'markets.search': 'Search assets...',
    'markets.all': 'All',
    'markets.gainers': 'Gainers',
    'markets.losers': 'Losers',

    // Exchange
    'exchange.title': 'Exchange',
    'exchange.subtitle': 'Instant crypto conversion',
    'exchange.from': 'You Pay',
    'exchange.to': 'You Receive',
    'exchange.rate': 'Exchange Rate',
    'exchange.fee': 'Network Fee',
    'exchange.btn': 'Exchange Now',
    'exchange.best': 'Best Rate',

    // Features
    'features.title': 'Why Choose NexChange',
    'features.subtitle': 'Built for serious traders who demand excellence',
    'features.secure.title': 'Military-Grade Security',
    'features.secure.desc': 'Cold storage, 2FA, and advanced encryption protect your assets around the clock.',
    'features.fast.title': 'Lightning Fast',
    'features.fast.desc': 'Orders execute in milliseconds with our high-performance matching engine.',
    'features.rates.title': 'Best Exchange Rates',
    'features.rates.desc': 'We aggregate rates from multiple liquidity providers to ensure you always get the best deal.',
    'features.support.title': '24/7 Premium Support',
    'features.support.desc': 'Our expert team is available around the clock via live chat and dedicated account managers.',

    // Socials
    'social.title': 'Join Our Community',
    'social.subtitle': 'Stay connected with the latest updates and market insights',
    'social.telegram': 'Join Telegram',
    'social.instagram': 'Follow Instagram',
    'social.twitter': 'Follow Twitter',
    'social.telegram.desc': 'Get instant alerts, market analysis, and connect with traders.',
    'social.instagram.desc': 'Visual market insights, infographics and trading tips.',
    'social.twitter.desc': 'Real-time news, announcements and market sentiment.',

    // Footer
    'footer.tagline': 'The premier destination for sophisticated digital asset trading.',
    'footer.links': 'Quick Links',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.aml': 'AML Policy',
    'footer.rights': 'All rights reserved.',
    'footer.disclaimer': 'Cryptocurrency trading involves significant risk. Only invest what you can afford to lose.',

    // Misc
    'loading': 'Loading...',
    'refresh': 'Refresh',
    'buy': 'Buy',
    'sell': 'Sell',
    'usd': 'USD',
    'irr': 'IRR',
  },
  fa: {
    // Nav
    'nav.home': 'خانه',
    'nav.exchange': 'تبادل',
    'nav.markets': 'بازارها',
    'nav.about': 'درباره ما',
    'nav.contact': 'تماس',
    'nav.trade': 'شروع معامله',

    // Hero
    'hero.badge': 'صرافی دیجیتال ممتاز',
    'hero.title1': 'آینده‌ی',
    'hero.title2': 'ثروت دیجیتال',
    'hero.subtitle': 'با اطمینان کامل رمز ارز معامله کنید. قیمت‌های لحظه‌ای، امنیت بی‌نظیر، و تجربه‌ای ساخته‌شده برای سرمایه‌گذاران حرفه‌ای.',
    'hero.cta.primary': 'شروع معامله',
    'hero.cta.secondary': 'مشاهده بازارها',
    'hero.stat.volume': 'حجم ۲۴ ساعته',
    'hero.stat.users': 'کاربران فعال',
    'hero.stat.coins': 'دارایی‌های لیست‌شده',
    'hero.stat.uptime': 'زمان آپتایم',

    // Ticker
    'ticker.live': 'زنده',

    // Markets
    'markets.title': 'بازارهای زنده',
    'markets.subtitle': 'قیمت‌های لحظه‌ای دارایی‌های دیجیتال',
    'markets.coin': 'دارایی',
    'markets.price': 'قیمت',
    'markets.change': 'تغییر ۲۴ ساعته',
    'markets.volume': 'حجم',
    'markets.cap': 'ارزش بازار',
    'markets.trade': 'معامله',
    'markets.search': 'جستجوی دارایی...',
    'markets.all': 'همه',
    'markets.gainers': 'بالاترین',
    'markets.losers': 'پایین‌ترین',

    // Exchange
    'exchange.title': 'تبادل',
    'exchange.subtitle': 'تبدیل فوری رمز ارز',
    'exchange.from': 'پرداخت می‌کنید',
    'exchange.to': 'دریافت می‌کنید',
    'exchange.rate': 'نرخ تبادل',
    'exchange.fee': 'کارمزد شبکه',
    'exchange.btn': 'تبادل همین الان',
    'exchange.best': 'بهترین نرخ',

    // Features
    'features.title': 'چرا نکس‌چنج؟',
    'features.subtitle': 'ساخته‌شده برای معامله‌گران حرفه‌ای',
    'features.secure.title': 'امنیت نظامی',
    'features.secure.desc': 'ذخیره‌سازی سرد، احراز هویت دو مرحله‌ای، و رمزنگاری پیشرفته از دارایی‌هایتان محافظت می‌کند.',
    'features.fast.title': 'سرعت برق‌آسا',
    'features.fast.desc': 'سفارشات در میلی‌ثانیه اجرا می‌شوند با موتور تطبیق بسیار سریع ما.',
    'features.rates.title': 'بهترین نرخ تبادل',
    'features.rates.desc': 'ما نرخ‌ها را از چندین تأمین‌کننده نقدینگی جمع‌آوری می‌کنیم.',
    'features.support.title': 'پشتیبانی ۲۴/۷',
    'features.support.desc': 'تیم متخصص ما در تمام ساعات از طریق چت زنده در دسترس است.',

    // Socials
    'social.title': 'به جامعه ما بپیوندید',
    'social.subtitle': 'با آخرین اخبار و تحلیل‌های بازار در ارتباط باشید',
    'social.telegram': 'ورود به تلگرام',
    'social.instagram': 'دنبال کردن اینستاگرام',
    'social.twitter': 'دنبال کردن توییتر',
    'social.telegram.desc': 'هشدارهای فوری، تحلیل بازار، و ارتباط با معامله‌گران.',
    'social.instagram.desc': 'تحلیل‌های بصری بازار، اینفوگرافیک و نکات معاملاتی.',
    'social.twitter.desc': 'اخبار لحظه‌ای، اطلاعیه‌ها و احساسات بازار.',

    // Footer
    'footer.tagline': 'مقصد اصلی معامله‌گران حرفه‌ای دارایی‌های دیجیتال.',
    'footer.links': 'لینک‌های سریع',
    'footer.legal': 'حقوقی',
    'footer.privacy': 'سیاست حریم خصوصی',
    'footer.terms': 'شرایط خدمات',
    'footer.aml': 'سیاست ضد پول‌شویی',
    'footer.rights': 'تمام حقوق محفوظ است.',
    'footer.disclaimer': 'معامله رمز ارز ریسک قابل توجهی دارد. فقط آنچه می‌توانید از دست بدهید سرمایه‌گذاری کنید.',

    // Misc
    'loading': 'در حال بارگذاری...',
    'refresh': 'بروزرسانی',
    'buy': 'خرید',
    'sell': 'فروش',
    'usd': 'دلار',
    'irr': 'تومان',
  }
};

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  t: (k) => k,
  dir: 'ltr',
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = localStorage.getItem('nexchange-lang');
    return saved === 'fa' || saved === 'en' ? saved : 'en';
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('nexchange-lang', l);
    document.documentElement.dir = l === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = l;
  };

  useEffect(() => {
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string) => translations[lang][key] || translations['en'][key] || key;

  return (
    <LangContext.Provider value={{ lang, setLang, t, dir: lang === 'fa' ? 'rtl' : 'ltr' }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
