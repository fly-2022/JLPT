# JLPT Master — 日本語能力試験

An AI-powered JLPT practice quiz. Runs on **Vercel** (free tier) with the API key stored securely as a server-side environment variable — never exposed to the browser.

## Deploy to Vercel (5 minutes)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "init"
gh repo create jlpt-master --public --push
# or push to an existing repo
```

### 2. Import to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import** next to your GitHub repo
3. Leave all build settings as defaults (Framework Preset: **Other**)
4. Click **Environment Variables** and add:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** your key from [console.anthropic.com](https://console.anthropic.com)
5. Click **Deploy**

Done — your app is live at `https://your-project.vercel.app`.

## Local development

```bash
npm i -g vercel        # install Vercel CLI (one-time)
vercel dev             # runs both the frontend and /api/chat locally
```

Or set the env var manually and use any static server:
```bash
export ANTHROPIC_API_KEY=sk-ant-...
npx serve .
```

> Note: `/api/chat` won't work with `npx serve` — use `vercel dev` for local full-stack testing.

## Project structure

```
├── index.html       ← frontend (no API key)
├── api/
│   └── chat.js      ← Vercel serverless function (holds the API key)
├── vercel.json      ← routing config
└── README.md
```

## How it works

- The browser calls `/api/chat` (same origin, no CORS issues)
- The Vercel function reads `ANTHROPIC_API_KEY` from the environment and proxies the request to Anthropic
- The API key is **never sent to the browser**

## License
MIT
