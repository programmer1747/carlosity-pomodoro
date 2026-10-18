# Orbodoro · By Carlosity

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
- Start on a focus block or warm up with a break, your choice
- Minus and plus buttons to stretch or trim a block while it is running
- Back, to return to a block you moved on from instead of letting a new one start
- Six themes
- Session planner that sizes blocks by task difficulty and fits them to the time you have
- Everything saves locally, so closing the app or the tab does not wipe your totals
- Runs in a browser, installs as an app, or runs as a downloaded Windows program

## Going back

**Back**, between Reset and Skip, returns to the block you were on before this one.
For when you skipped too early, or a block ended and you want to pick it up again
rather than let a whole new one start.

It walks back as far as you came: through a plan segment by segment, and into a plan
that had already run out. Each step restores the position you left, the block at its
full length, paused and ready.

Two things it deliberately does and does not undo. Study and rest time stays logged,
because that time was really spent, and the totals should not move because you changed
your mind about which block you were on. A pomodoro counted by the step being reversed
is taken back though, on the task as well as the overall count, which is what makes a
mistimed Skip harmless rather than quietly inflating your numbers. Each Back undoes
only its own step, so walking back three blocks takes back exactly the pomodoros those
three steps counted.

Back switches off when there is nothing behind you, and a new plan or Clear starts the
trail fresh.

## Adjusting a block

A row under the main controls, **-5 -1 +1 +5**, changes the block that is running, for
when it is about to end and you are not done, or when you want it over sooner.

The block length moves with the countdown, not just the countdown on its own. Progress
is measured against the block, so shifting only the clock would send the ring past full
or out of step with what it is measuring. Moving both means the arc eases back when you
add time and jumps forward when you take it away, which is what actually happened to
how far through you are.

The phase label carries the running total, "Focus · +6m" or "Focus · -5m", and it is
reversible: adding back what you took off returns the block to normal and clears the
label. The adjustment belongs to that block alone, so advancing or pressing Reset
clears it.

Adjusting a planned block also moves that segment in the schedule below, so the block
list and the projected finish time stay true to what the timer is doing. A block tops
out at four hours and will not shrink below a minute or leave less than thirty seconds
on the clock, and each button disables itself when there is no room, including as the
clock runs down past it.

## Sounds

Four moments each get their own sound, chosen from nineteen built in ones or turned off:

| Event    | Fires when                        |
| -------- | --------------------------------- |
| Start    | a fresh block begins              |
| Continue | you resume a block you paused     |
| Stop     | you pause                         |
| End      | a block runs out                  |

The list runs from clicky and physical, Click, Clock tick, Keyboard, Click clack,
Typing, Wood block, Knock and Thud, through natural, Bird, Cricket, Water drop and
Page turn, to musical, Blip, Pulse, Marimba, Chime, Descend, Bell and Alarm.

All of them are generated in the browser rather than loaded, so there are no audio
files to download and they work with no connection. The physical ones are built from
shaped bursts of filtered noise and the musical ones from pitched tones, which is how
a keyboard click or a bird chirp comes out of the same few lines as a chime.

## Make my pomodoro

You do not have to guess at the lengths. Give it two things, the minutes you have and
how sharp you feel, and it reads the difficulty off your specific pomodoros and works
the rest out.

**The block length** starts from how hard the work is, averaged across everything open
on your list: light sits near 20 minutes, medium near 25, heavy stretches to 40. Then
how you feel scales it:

| Feeling | Blocks     | Breaks      | Long break every |
| ------- | ---------- | ----------- | ---------------- |
| Fried   | 0.7x       | 1.3x longer | 3 blocks         |
| Okay    | unchanged  | unchanged   | 4 blocks         |
| Sharp   | 1.25x      | 0.85x       | 5 blocks         |

Breaks come out of the block length, a fifth of it for a short break and three fifths
for a long one, so they stay in proportion to the work. If you would rather say how
long a break should be, set it under Break length, by chip or by typing a number, and
that length is taken literally: every break in the session is exactly that, the long
break becomes three times it, and no per task scaling is applied. Auto hands it back. Blocks are clamped to between
10 and 60 minutes, and never run longer than the time you actually have.

Medium work while feeling okay lands on 25 / 5 / 15 every 4, the classic setting. Heavy
work while sharp opens up to 50 minute blocks. Heavy work while fried pulls back to 30
with a long break every 3.

That length describes the average of your list. If the list is mixed, individual blocks
spread around it, shorter for the light ones and longer for the heavy ones, rather than
every task getting the same slot.

**Then it lays out the session.** Blocks are shared across your specific pomodoros in
proportion to difficulty, light 1, medium 2, heavy 3.2, and each one goes to whichever
is furthest behind its share, so a heavy task ends up with roughly three times the
minutes of a light one. The plan always adds up to exactly the time you gave it, and
any remainder too small for its own block is folded into the last one.

Press Start once and it runs the whole thing, switching the active session at each
block. The lengths it picked are written into Settings, so you can still override any
of them by hand afterwards.

Turning on "Start with a break" in Settings opens the session with a break instead of
dropping you straight into work. It applies to the plain timer and to planned sessions
alike, and the opening break comes out of the same budget, shrinking rather than
crowding out a block when time is tight.

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
