# JLPT Master — 日本語能力試験

A beautiful, AI-powered JLPT practice quiz app that runs entirely in the browser.

[![Live Demo](https://img.shields.io/badge/Live-Demo-red?style=flat-square)](https://your-username.github.io/jlpt-master)

![JLPT Master screenshot](https://via.placeholder.com/860x400/f5f0e8/c0392b?text=JLPT+Master)

## Features

- **5 difficulty levels** — N5 through N1
- **4 question types** — Vocabulary, Grammar, Kanji, Reading comprehension
- **AI-generated questions** powered by Claude (Anthropic)
- **Bilingual explanations** — English + Simplified Chinese
- **Session stats** — accuracy tracking with visual progress dots
- Zero backend — runs 100% in the browser

## Deploy to GitHub Pages (2 minutes)

1. **Fork or clone** this repo
2. Go to your repo → **Settings → Pages**
3. Under *Source*, choose **Deploy from a branch** → `main` → `/ (root)` → Save
4. Your app will be live at `https://<your-username>.github.io/<repo-name>` within ~60 seconds

That's it. No build step, no Node, no config files needed.

## Usage

When you open the app you'll be prompted for your **Anthropic API key**:

1. Get a free key at [console.anthropic.com](https://console.anthropic.com)
2. Paste it into the input field (starts with `sk-ant-...`)
3. Your key is saved to **browser localStorage only** — it never leaves your device except when calling `api.anthropic.com` directly

To change or remove your key, click the **"API Key Set"** indicator in the top-right corner.

## Cost

Each question uses ~300–500 tokens (input + output) with `claude-sonnet-4-20250514`.  
Anthropic's free tier covers hundreds of questions for new accounts.

## Local development

No build tools required. Just open `index.html` in a browser:

```bash
# Option A — open directly
open index.html

# Option B — serve locally (avoids any CORS quirks)
npx serve .
# or
python3 -m http.server 8080
```

## Privacy & Security

- Your API key is stored only in your own browser's `localStorage`
- All API calls go directly from your browser to `api.anthropic.com`
- No analytics, no tracking, no server

## License

MIT
