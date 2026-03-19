# ✨ Story Magic

A Progressive Web App (PWA) for creating personalised AI-powered storybooks for children.

## 🚀 Deploy to GitHub Pages (5 minutes)

### Step 1 — Create the repository
1. Go to [github.com/new](https://github.com/new)
2. Name it **exactly**: `story-magic`
3. Set to **Public**
4. Click **Create repository**

### Step 2 — Upload the files
Upload all files in this folder to the repository root:
- `index.html`
- `manifest.json`
- `sw.js`
- `404.html`
- `favicon.ico`
- `.nojekyll`
- `icons/` folder (with all PNG files inside)

### Step 3 — Enable GitHub Pages
1. Go to your repository **Settings**
2. Click **Pages** in the left sidebar
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch, **/ (root)** folder
5. Click **Save**

### Step 4 — Visit your app
After ~2 minutes, your app will be live at:
```
https://YOUR-USERNAME.github.io/story-magic/
```

> **Important:** Replace `story-magic` in `404.html` with your actual repo name if different.

---

## 🔑 API Keys (all optional, app works without them)

Set these up in the **Parent Area** inside the app:

| Key | Where to get it | What it does |
|-----|----------------|--------------|
| **Groq** | [console.groq.com](https://console.groq.com) | AI story generation (free) |
| **Gemini** | [aistudio.google.com](https://aistudio.google.com) | Real cartoon illustrations (free) |
| **Google TTS** | [console.cloud.google.com](https://console.cloud.google.com) | Lifelike narration, 1M chars/month free |
| **ElevenLabs** | [elevenlabs.io](https://elevenlabs.io) | Most lifelike voices, 10K chars/month free |
| **OpenAI TTS** | [platform.openai.com](https://platform.openai.com) | Natural voices, ~$0.015/1000 chars |

All keys are stored **only in your browser** (localStorage). They are never sent to any server other than the respective API providers.

---

## 📱 Install as an App

When you visit the site on mobile, tap **"Add to Home Screen"** (Safari on iOS) or accept the install prompt (Chrome on Android) to install Story Magic as a native-feeling app.

## ✨ Features

- 🛡️ **Hero Library** — build a squad of up to 4 illustrated characters with superpowers
- ✨ **AI Story Generation** — Groq + Llama 3.3 writes personalised stories in seconds
- 🎨 **AI Illustrations** — Gemini generates bright cartoon art for every page
- 📖 **Read-Along** — word-by-word highlighting with multiple voice engine options
- 📄 **PDF Export** — export any story as a print-ready PDF book
- 📦 **Print Ordering** — parent-gated Peecho integration for hardcover books
- 💾 **Offline Support** — works without internet after first load
