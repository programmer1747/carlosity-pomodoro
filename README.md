# Orbodoro · Carlosity Teaches

A pomodoro timer that measures study time and rest time separately, and lets you name
what you are working on so you can come back to it later and keep adding to its total.

**Website:** https://carlosity-pomodoro.vercel.app
**Windows app:** https://github.com/programmer1747/carlosity-pomodoro/releases/latest

## What it does

- Three running totals across the top: all time combined, study only, rest only, each
  with today underneath
- Specific pomodoros. Write down what you are working on and it becomes a named session.
  Press it any time to continue, and its study and rest time keeps adding up
- Every specific pomodoro shows its own total, study and rest, for today and for all time
- 25 / 5 / 15 cycle with adjustable lengths and a configurable long break interval
- Four separate sounds you can set yourself: start, stop, continue and end
- Six themes
- Session planner that sizes blocks by task difficulty and fits them to the time you have
- Everything saves locally, so closing the app or the tab does not wipe your totals
- Runs in a browser, installs as an app, or runs as a downloaded Windows program

## Sounds

Four moments each get their own sound, chosen from ten built in tones or turned off:

| Event    | Fires when                        |
| -------- | --------------------------------- |
| Start    | a fresh block begins              |
| Continue | you resume a block you paused     |
| Stop     | you pause                         |
| End      | a block runs out                  |

The tones are generated in the browser, so there are no sound files to load and they
work offline.

## How the session planner allots time

Give it a budget, say 90 minutes, and it decides the shape of the session from the
difficulty tapped onto each specific pomodoro, the L / M / H badge.

| Difficulty | Block      | Break after | Share of the time |
| ---------- | ---------- | ----------- | ----------------- |
| Light      | 0.6x focus | 0.8x break  | 1                 |
| Medium     | 1x focus   | 1x break    | 2                 |
| Heavy      | 1.7x focus | 1.6x break  | 3.2               |

Each block goes to whichever one is furthest behind its share, so a heavy task ends up
with roughly three times the minutes of a light one. The plan always adds up to exactly
the budget, and any remainder too small for its own block is folded into the last one.
Press Start once and it runs the whole thing, switching the active session at each block.

## Files

```
index.html               the whole web app, no build step
manifest.webmanifest     app metadata for installing
sw.js                    service worker for offline use
icon.svg                 the square mark everything else is drawn from
icon-192.png             app icon
icon-512.png             app icon
icon-maskable-512.png    Android adaptive icon
vercel.json              hosting headers so updates are not cached forever
desktop/                 the Windows build, see below
```

## Run it locally

Open `index.html` in a browser, or serve it so the service worker registers:

```bash
npx serve .
```

## Build the Windows app

```bash
cd desktop
npm install
npm run dist
```

That writes an installer and a portable exe into `desktop/dist`. The build shares one
copy of the source: `prepare.js` copies the web files up from the repo root, so the
desktop app and the website can never drift apart.

Two notes on this machine's toolchain. `build.js` wraps electron-builder because its
toolchain unpacking fails here with EXDEV on a same folder rename, so rename falls back
to copy and delete. `make-icon.js` builds the `.ico` up front because electron-builder's
own icon converter hits the same problem.

## Deploy the website

The Vercel project is not connected to git, so pushing does not redeploy it:

```bash
vercel --prod --yes --scope carlosity
```

## Install as an app

- iPhone: open the site in Safari, tap Share, then Add to Home Screen
- Android: open in Chrome, tap the menu, then Install app
- Desktop: use the Install app button in the header, or download the Windows build

## Notes

Time is stored in your browser under `carlosity.orbodoro.v1`, and the desktop app keeps
its own copy. Totals do not sync between devices. Data from the older Orbit build is
picked up automatically the first time this version runs: focus time becomes study time
and tasks become specific pomodoros. Rest time starts from zero because the old build
never measured it.
