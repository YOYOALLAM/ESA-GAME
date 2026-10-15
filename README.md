# E S A .. GAME — Prototype v0.3

A browser-based football game project designed for GitHub Pages.

## Start
Open `index.html` in a browser with internet access (the Three.js training pitch loads a CDN library), or deploy the files to GitHub Pages. No build step is needed.

## Modes
- `13579`: 3D **training prototype** with a pitch, 22 placeholder player figures, keyboard/touch movement, camera switching, passing and simplified shooting. It is **not** a fully simulated 11v11 match.
- `24680`: **manager prototype** with a fictional team, training, virtual budget and randomized match results.
- `23456`: **real football tracking interface**. Saves preferred club, national team, player and league and displays reporting placeholders. **No live sports API is connected**; no real-time scores or verified transfers are displayed.

## Current limitations
- No full football physics, refereeing, advanced animations, authentic club rosters, licensed badges, live data or multiplayer.
- The password codes are navigation codes, **not secure authentication**; they are visible in public JavaScript.
- Saves use browser localStorage and may be lost when browser storage is cleared.
- Real football data, images, crests, official audio and likenesses may require data licensing and rights clearance.
- Daily transfer updates require a licensed or permitted data feed and scheduled service; GitHub Pages alone cannot provide this.
- Manager career saves should remain independent of real-life transfers.

## Planned scope (approved)
Egyptian, Spanish and English leagues; current and historic national teams and legends; 3D match engine; player skills and camera controls; realistic rules; career and manager systems; trophies; press conferences; stadium design; real-data analytics; ESA Coach/Analyst/Scout/News/Season Review; multilingual commentary; daily confirmed-transfer checking; historical seasons and custom competitions.

## Test checklist
1. Enter each of the three codes and confirm correct mode.
2. Enter invalid code and confirm error.
3. In 3D mode switch camera and use movement/pass/shoot/switch controls.
4. In manager mode train and simulate, refresh and verify persistent data.
5. In live mode save selections and display each report period.
6. Change language and refresh.

## Deploy
Create a public GitHub repository, upload files to the repository root, then Settings → Pages → Deploy from a branch → main / root.
Update deploy
