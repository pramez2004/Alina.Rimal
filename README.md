# alina-rimal

Personal portfolio site for Alina Rimal — content creator, model, and beauty specialist.

## Design system

- **Colors:** charcoal (`--charcoal`, `--ink`) + sage green (`--sage`, `--sage-light`) on an off-white paper background. All defined as CSS variables at the top of `css/style.css` — change them there to retheme the whole site.
- **Type:** Poppins (headings/display) + Inter (body) — geometric, minimal, no serif/italic.
- No emoji or stock icon sets anywhere — numbered indices and letter monograms instead.

## Structure

- `index.html` — Home (hero, about, skills, featured works, why-collaborate, CTA)
- `works.html` — Full portfolio grid with platform filters and inline video playback
- `contact.html` — Collaboration inquiry form + social/contact links + CV download
- `css/style.css` — Shared design system and layout styles
- `js/main.js` — Mobile nav, scroll-reveal, and single-active-video audio coordination (playing one video pauses any other playing video), runs on every page
- `js/works-data.js` — **Portfolio data.** Add a new video/project by adding one object here — it will automatically appear on Works, and on Home if `featured: true`.
- `js/works-render.js` — Renders work cards from data, handles filtering and lazy video loading
- `js/contact-form.js` — Contact form validation + UI states (loading/success/error)
- `cv-source/build_cv.py` — Python (reportlab) script that generated the CV PDF. Re-run and re-export to `assets/` if her bio/skills change.

## Adding a new work item

Open `js/works-data.js` and add an object to the `WORKS` array, e.g.:

```js
{
  id: "unique-id",
  title: "...",
  platform: "TikTok", // TikTok | Instagram | Reel
  category: "TikTok",
  type: "Video Content",
  thumbLabel: "...",
  thumbClass: "sage", // sage | charcoal-grad | mist | moss — used only as a fallback when there's no image/video
  description: "...",
  url: "https://...", // optional — omit entirely for self-hosted videos with no outbound platform link
  // one of:
  embed: { type: "tiktok", id: "VIDEO_ID" },                                   // TikTok's official embed player (fallback option)
  embed: { type: "video", src: "assets/videos/x.mp4", poster: "assets/posters/x.jpg", hasWatermark: true }, // self-hosted video file (preferred — full control, instant load)
  embed: { type: "none" },                                                      // no player — card links out only
  featured: true,
}
```

No other files need to change — the grid, filters, and lazy-loading all read from this array.

## Video assets

- All portfolio videos are now **self-hosted files** in `assets/videos/`, with poster frames in `assets/posters/` — not platform embeds. TikTok's own iframe embed was slow to load and gave no playback control, so both TikTok clips and both other reels were switched to self-hosted `<video>`. Items that came from TikTok keep their `url` field so the "View on TikTok →" link still points to the original post.
- `embed.hasWatermark: true` skips rendering our own platform-tag badge on the card, for source clips that already have a visible watermark baked into the footage (e.g. TikTok's own save watermark) — avoids showing a redundant duplicate label.
- ⚠️ Two of the "Reel" clips (`reel-1`, `reel-2`) are **branded promotional content Alina filmed for other businesses** (their names/contact info are burned into the footage) — legitimate, valuable proof of paid collaboration work for the grid, but that's exactly why they're kept out of the ambient hero background (see below).
- **Works page hero** (`assets/videos/works-hero-bg.mp4`) is a separate, re-cropped export of the `reel-1` source — the bottom watermark band was cropped out via ffmpeg specifically for this file so no third-party branding appears in the looping background. It's ~10s, muted, no audio track, uses `object-fit: cover` (full-bleed, no letterbox bars) with `object-position` tuned so she stays in frame.
- Only one audible video plays at a time (see `js/main.js`) — starting a second self-hosted video automatically pauses any other one that's currently playing with sound. This doesn't extend into TikTok's iframe embed if that type is ever used again, since it's cross-origin and JS can't reach into another site's player.
- To swap any video: replace the file at the same path, and re-export a poster frame (`ffmpeg -ss 1.0 -i file.mp4 -vframes 1 poster.jpg`) if the look changed materially.

## CV / media kit

`assets/alina-rimal-cv.pdf` — generated with `cv-source/build_cv.py` (reportlab) to match the site's design system, linked from the Contact page. Built only from facts already on the site (profile, skills, platforms, collaboration types) — no invented stats, clients, or achievements.

To update it: edit `cv-source/build_cv.py`, re-run it (`python3 build_cv.py`, needs `pip install reportlab`), and copy the output into `assets/alina-rimal-cv.pdf`.

## Known placeholders / to-do before sending to brands

- **Contact form** delivers to **alinarimal38@gmail.com** via FormSubmit (no account/backend needed). ⚠️ **One-time step:** the first submission triggers a confirmation email from FormSubmit to that inbox — it must be opened and confirmed once, or messages won't arrive.
- The CV's portfolio link points to `pramez2004.github.io/alina-rimal` (inferred from the GitHub Pages deployment) — worth confirming that's the actual live URL before wide distribution.

## Local preview

No build step required — open `index.html` directly, or serve the folder:

```
python3 -m http.server 8000
```
