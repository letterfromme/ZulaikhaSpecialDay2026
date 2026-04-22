# Zulaikha Special Day 2026

Production-ready static birthday microsite with multiple themed page variants.

## Project Structure

- `index.html`: primary landing page (button/cake animation flow)
- `indexX.html`: secondary card experience
- `ucapan.html`: message card variant
- `style.css`, `styleb.css`, `styleX.css`, `ucapan.css`: styling assets
- `script.js`, `scriptb.js`, `ucapan.js`: interactive logic
- `Images/`: image assets used by `indexX.html` and related views
- `background.jpg`, `HappyBirthdayAiqhaSong.mp3`: core media assets
- `scripts/`: operational helper scripts (`DEPLOY.sh`, `optimize-images.bat`)
- `docs/`: production, optimization, and completion reports
- `archive/variants/`: non-primary HTML variants retained for reference

## Development

Requirements:

- Node.js 18+ (recommended)

Install dependencies:

```bash
npm install
```

Run local static server:

```bash
npm run dev
```

Then open [http://localhost:8080](http://localhost:8080).

## Code Quality

Check formatting:

```bash
npm run format:check
```

Format files:

```bash
npm run format
```

## Deployment Notes

- Main production entrypoint is `index.html`.
- Historical/experimental variants are in `archive/variants/`.
- Deployment checklist script: `scripts/DEPLOY.sh`.
