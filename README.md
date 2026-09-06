# Orbit · Carlosity Teaches

A pomodoro timer that logs focus time per task and keeps a running total across every session.

## What it does

- 25 / 5 / 15 pomodoro cycle with adjustable lengths and a configurable long break interval
- Task list, tap a task to make it active, and focus time gets logged to it
- Every task carries a difficulty, Light, Medium or Heavy, set by tapping the L / M / H badge
- Session planner: tell it how many minutes you have and it lays out the blocks for you
- Combined focus total across all sessions, plus a today count and per task breakdown
- Orbit dial that fills as the session runs, with 12 slots around the outside marking pomodoros finished today
- Chime, optional desktop notifications, and optional auto start for the next phase
- Everything saves to the browser, so closing the tab does not wipe your totals
- Installs as an app on phone or desktop and runs offline

## How the session planner allots time

Give it a budget, say 90 minutes, and it decides the shape of the session from the
difficulty you put on each task.

**Block length** scales off whatever focus length you have set in Settings:

| Difficulty | Block      | Break after | Share of the time |
| ---------- | ---------- | ----------- | ----------------- |
| Light      | 0.6x focus | 0.8x break  | 1                 |
| Medium     | 1x focus   | 1x break    | 2                 |
| Heavy      | 1.7x focus | 1.6x break  | 3.2               |

At the default 25 minute focus that means 15 minute blocks for light work,
25 for medium and about 43 for heavy, since hard work needs a longer runway
and a longer breather afterwards.

**Sharing it out** is proportional to those weights. Each time it places a block it
hands it to whichever task is furthest behind its share, so a heavy task ends up with
roughly three times the minutes of a light one. Long breaks land on the interval you
set under "Long break every".

Nothing is wasted and nothing overruns: the plan always adds up to exactly the budget
you gave it, and any remainder too small for its own block gets folded into the last one.
A block is never shorter than 10 minutes.

Hit "Plan my time" and the schedule appears with the current step highlighted. Press
Start once and it runs the whole thing on its own, switching the active task at each
block and logging the time against it, no matter what the auto start setting says.

## Files

```
index.html               the entire app, no build step
manifest.webmanifest     app metadata for install
sw.js                    service worker for offline use
vercel.json              hosting headers so updates are not cached forever
icon.svg                 vector icon
icon-192.png             app icon
icon-512.png             app icon
icon-maskable-512.png    Android adaptive icon
vercel.json              hosting headers so updates are not cached forever
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

## Live site

**https://carlosity-pomodoro.vercel.app**

Deployed to the `carlosity` team on Vercel as the project `carlosity-pomodoro`. The project is not
connected to a git repo, so pushes do not redeploy it. To ship a change, edit the files here and run:

```bash
vercel --prod --yes --scope carlosity
```

To get automatic deploys on every push instead, push this folder to GitHub, then in the Vercel
dashboard open the project, go to Settings, Git, and connect the repo.

## Install as an app

Once it is live on your Vercel URL:

- iPhone: open in Safari, tap Share, then Add to Home Screen
- Android: open in Chrome, tap the menu, then Install app
- Desktop Chrome or Edge: click the install icon on the right side of the address bar

Install only works over HTTPS or localhost, which is why it needs to be deployed first.

## Notes

Focus time is stored in your browser under the key `carlosity.orbit.v1`. It does not sync between devices, so your phone and laptop keep separate totals. Clearing site data or using private browsing resets it.
