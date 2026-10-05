# ✨ Story Magic

Personalised AI storybooks for kids — landing page plus the PWA, in one repo.

- **Landing page:** `https://johnlaz.github.io/storymagic/` (`/index.html`)
- **App:** `https://johnlaz.github.io/storymagic/app/` (`/app/`)

## Layout

```
/index.html        landing page
/404.html          redirects unknown paths to the landing page
/favicon.ico, /icons/   landing page icons
/app/              the PWA (index.html, manifest.json, sw.js, favicon.ico, icons/)
```

## Deploy

Settings → Pages → Deploy from a branch → `main` / `(root)`.

## API keys (all optional)

Set in the app's Parent Area; stored only in the browser (localStorage).
Groq (stories), Gemini (illustrations), Google TTS / ElevenLabs / OpenAI TTS (narration).
