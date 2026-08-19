# Orbit · Carlosity Teaches

A pomodoro timer that logs focus time per task and keeps a running total across every session.

## What it does

- 25 / 5 / 15 pomodoro cycle with adjustable lengths and a configurable long break interval
- Task list, tap a task to make it active, and focus time gets logged to it
- Combined focus total across all sessions, plus a today count and per task breakdown
- Orbit dial that fills as the session runs, with 12 slots around the outside marking pomodoros finished today
- Chime, optional desktop notifications, and optional auto start for the next phase
- Everything saves to the browser, so closing the tab does not wipe your totals
- Installs as an app on phone or desktop and runs offline

## Files

```
index.html               the entire app, no build step
manifest.webmanifest     app metadata for install
sw.js                    service worker for offline use
icon.svg                 vector icon
icon-192.png             app icon
icon-512.png             app icon
icon-maskable-512.png    Android adaptive icon
```

## Run it locally

Open `index.html` in a browser, or serve it so the service worker registers:

```bash
python3 -m http.server 8000
```

Then go to `http://localhost:8000`.

## Push to GitHub

From this folder:

```bash
git init
git add .
git commit -m "Orbit pomodoro timer"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

Create the empty repo on GitHub first, then paste its URL into the remote line.

## Deploy to Vercel

Fastest path, through the dashboard:

1. Go to vercel.com and click Add New, then Project
2. Import the GitHub repo you just pushed
3. Framework Preset: Other. Leave the build command empty. Output directory: leave blank, or set it to `.`
4. Click Deploy

Every push to `main` redeploys automatically after that.

From the terminal instead:

```bash
npm i -g vercel
vercel
vercel --prod
```

## Install as an app

Once it is live on your Vercel URL:

- iPhone: open in Safari, tap Share, then Add to Home Screen
- Android: open in Chrome, tap the menu, then Install app
- Desktop Chrome or Edge: click the install icon on the right side of the address bar

Install only works over HTTPS or localhost, which is why it needs to be deployed first.

## Notes

Focus time is stored in your browser under the key `carlosity.orbit.v1`. It does not sync between devices, so your phone and laptop keep separate totals. Clearing site data or using private browsing resets it.
