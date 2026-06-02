# Angel Girls Entertainment — Deployment & Setup Guide

## Stack
- **Frontend**: Vanilla HTML + React (Babel CDN) + TailwindCSS CDN
- **Backend**: Vercel Serverless Functions (Node.js)
- **Database**: Supabase (PostgreSQL)
- **Payments**: PayKings (high-risk processor)
- **Hosting**: Vercel

---

## 1. Environment Variables

Create a `.env` file in the root (never commit this):

```
# Supabase
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# PayKings
PAYKINGS_API_KEY=your_paykings_api_key
PAYKINGS_MERCHANT_ID=your_paykings_merchant_id
PAYKINGS_API_URL=https://api.paykings.com/v1

# App
SITE_URL=https://angelgirls.com
ADMIN_EMAIL=admin@angelgirls.com
```

In Vercel dashboard → Project Settings → Environment Variables — add all of the above.

---

## 2. Supabase Setup

1. Go to [supabase.com](https://supabase.com) → New Project
2. Copy your **Project URL** and **anon key** from Settings → API
3. Open the SQL Editor and run `supabase/schema.sql`
4. Enable Row Level Security (already in schema)
5. Update `config/env.js` with your Supabase credentials

---

## 3. PayKings Setup

1. Sign up at [paykings.com/partners](https://paykings.com/partners/)
2. Once approved, get your **API Key** and **Merchant ID**
3. Add to Vercel environment variables:
   - `PAYKINGS_API_KEY`
   - `PAYKINGS_MERCHANT_ID`
4. Update `api/process-payment.js` with exact endpoint once provided by PayKings

---

## 4. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (from project root)
vercel

# Production deploy
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments on push.

---

## 5. GitHub Setup

```bash
git init
git add .
git commit -m "Initial commit — Angel Girls Entertainment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/angel-girls.git
git push -u origin main
```

---

## 6. Portal Access

- **Admin**: `portal.html` → username: `AngelGirl` / password: `Welcome5!`
  ⚠️ Change password immediately after first production login
- **Angels**: Each girl has their own login (set via admin portal)

---

## 7. File Structure

```
├── index.html              # Main public site
├── portal.html             # Staff portal
├── vercel.json             # Vercel config
├── api/
│   └── process-payment.js  # PayKings serverless function
├── components/             # React components
├── portal/                 # Portal components + data layer
├── config/
│   └── env.js              # Client-side env config (public keys only)
├── supabase/
│   └── schema.sql          # Database schema
└── uploads/                # Media assets
```

---

## 8. Production Checklist

- [ ] Set all environment variables in Vercel
- [ ] Run `supabase/schema.sql` in Supabase SQL editor
- [ ] Update `config/env.js` with Supabase public keys
- [ ] Add PayKings API key once received
- [ ] Change admin portal password
- [ ] Test booking → agreement → payment flow end-to-end
- [ ] Set up custom domain in Vercel (angelgirls.com)
- [ ] Enable Supabase backups
- [ ] Test on mobile devices

---

## 9. Support

- Supabase docs: https://supabase.com/docs
- Vercel docs: https://vercel.com/docs
- PayKings: https://paykings.com/partners/
