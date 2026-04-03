# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

You are a senior UI designer and frontend developer. Build premium interfaces. Use subtle animations, proper spacing and visual hierarchy. No emoji icons. No inline styles. No generic gradients.

Claude Code to behave the way I want. Each feature does one thing, the code is easy to follow, and the app is easy to run locally and deploy

---

# Frontend Website Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- Puppeteer is installed at `C:/Users/J0mn1/AppData/Local/Temp/puppeteer-test/`. Chrome cache is at `C:/Users/J0mn1/.cache/puppeteer/`.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color

## Git & Saving Work
- **Do NOT commit or push automatically.** Always wait for explicit confirmation from the user before pushing to GitHub.
- Only push when the user says something like "push it", "go ahead and push", "push to GitHub", or similar confirmation.
- Commit messages must be clean and descriptive: use imperative mood, lowercase, no period. Examples: `add pricing section`, `fix hero image alignment on mobile`, `update nav layout`.
- Never use `git add -A` — stage specific files only (`index.html`, `services.html`, `pricing.html`, `reviews.html`, `faq.html`, `contact.html`, `brand_assets`, etc.).
- Workflow: `git add <files>` → `git commit -m "..."` → wait for user confirmation → `git push origin main`
- Every push to GitHub automatically syncs to the live site.

## Checkpointing & Context Preservation
- **After every major step**, create a git commit as a checkpoint (even without push). This preserves progress in case of context window compression.
- **After a `/compact`** or any context compression event, immediately read this CLAUDE.md and the most recent git log (`git log --oneline -10`) to re-orient before continuing work.
- A "major step" is: completing a visible UI section, fixing a significant bug, restructuring layout, or any change spanning multiple files.
- Checkpoint commit message format: `checkpoint: <what was just completed>` — e.g., `checkpoint: navbar layout restructure complete`.

## This Project: Regent Lawn Mowing & Cleaning Services
- **Site:** Single-page marketing site for Regent Lawn Mowing & Cleaning Services
- **Pages:** `index.html` (home — all sections on one page)
- **GitHub repo:** https://github.com/nedaj-beep/RegentLawnmowing
- All HTML, CSS, and JS are inline within `index.html`
- Reference design: `original-3a1bc2b9dc67fa97f20a1638ee4ee779.webp` (lawn mowing company site to clone)
- Components library: `components/` folder (1–7 .txt files) — React components adapted to vanilla HTML/JS/CSS
- Brand colors: `#163510` (darkest green), `#2d7018` (primary), `#3d8f1f` (mid), `#5ab133` (accent), `#f0f9eb` (light)
- Fonts: Playfair Display (headings) + Inter (body)
