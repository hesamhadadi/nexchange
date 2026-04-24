# NexChange — صرافی دیجیتال ممتاز

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

صرافی آنلاین رمز ارز دو زبانه (فارسی/انگلیسی) با طراحی لوکس و قیمت‌های لحظه‌ای.

---

## ✨ ویژگی‌ها

- 🌐 دو زبانه — فارسی RTL و انگلیسی با تغییر لحظه‌ای
- 📊 قیمت‌های زنده — CoinGecko API، آپدیت هر ۶۰ ثانیه
- 💱 ویجت تبادل — محاسبه لحظه‌ای با نرخ واقعی
- 🎨 طراحی لوکس — Dark gold theme با انیمیشن‌های Framer Motion
- 📱 موبایل‌فرست — کاملاً Responsive
- 📲 شبکه‌های اجتماعی — تلگرام، اینستاگرام، X

## 🚀 راه‌اندازی

```bash
git clone https://github.com/YOUR_USERNAME/nexchange.git
cd nexchange
npm install
npm run dev
```

## 🔧 تنظیمات شبکه‌های اجتماعی

در فایل `src/components/sections/Socials.tsx` و `src/components/layout/Footer.tsx` لینک‌های خود را جایگزین کنید:

```
https://t.me/nexchange_official        → آیدی تلگرام شما
https://instagram.com/nexchange_official → یوزرنیم اینستاگرام شما
https://twitter.com/nexchange_official  → یوزرنیم X شما
```

## 📁 ساختار

```
src/
├── app/             # Next.js App Router
├── context/         # Language context (FA/EN)
├── hooks/           # useCrypto — live prices
└── components/
    ├── layout/      # Navbar, TickerStrip, Footer
    └── sections/    # Hero, Markets, Exchange, Features, Socials
```

## Tech Stack

| Package | Version |
|---|---|
| Next.js | 16.x |
| React | 19.x |
| Tailwind CSS | 4.x |
| Framer Motion | 12.x |
| Lucide React | 1.x |

---

MIT License

