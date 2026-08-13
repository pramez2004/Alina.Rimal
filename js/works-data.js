// ===========================================================
// PORTFOLIO DATA
// To add a new piece of work, add one object to this array.
// It will automatically appear on the Works page and, if
// featured: true, on the Home page as well.
//
// embed.type options:
//   "tiktok"    -> requires embed.id  (the numeric video id from the TikTok URL)
//   "video"     -> requires embed.src (path to a self-hosted mp4) and
//                  embed.poster (a still image shown before play)
//   "none"      -> no inline player; card links straight out (e.g. a profile)
//
// Note: items can keep a "url" field alongside a "video" embed — the card
// still shows a "View on X →" link out to the original post even though
// playback itself is self-hosted (used for the TikTok items below, since
// TikTok's iframe embed was slow to load and gave no playback control).
//
// Optional "image" field: path to a real photo (e.g. "assets/photo.jpg") to
// show instead of the flat color placeholder — used for non-video cards
// like a profile link.
// ===========================================================

const WORKS = [
  {
    id: "tiktok-style-feature",
    title: "TikTok Reel — Style Feature",
    platform: "TikTok",
    category: "TikTok",
    type: "Video Content",
    thumbLabel: "Fashion & Lifestyle Content",
    thumbClass: "sage",
    description:
      "Fashion-forward video content showcasing personal style and on-camera presence. Engaging storytelling through outfit and lifestyle visuals.",
    url: "https://www.tiktok.com/@alina.rimal22/video/7599669826474282261",
    embed: {
      type: "video",
      src: "assets/videos/tiktok-style-feature.mp4",
      poster: "assets/posters/tiktok-style-feature.jpg",
      hasWatermark: true,
    },
    featured: true,
  },
  {
    id: "tiktok-creative-series",
    title: "TikTok Reel — Creative Series",
    platform: "TikTok",
    category: "TikTok",
    type: "Video Content",
    thumbLabel: "Authentic Creative Reel",
    thumbClass: "charcoal-grad",
    description:
      "A compelling short-form video demonstrating natural screen presence, creative direction, and the ability to build narrative through visuals.",
    url: "https://www.tiktok.com/@alina.rimal22/video/7597062134312340743",
    embed: {
      type: "video",
      src: "assets/videos/tiktok-creative-series.mp4",
      poster: "assets/posters/tiktok-creative-series.jpg",
      hasWatermark: true,
    },
    featured: true,
  },
  {
    id: "reel-1",
    title: "Style Reel",
    platform: "Reel",
    category: "Reels",
    type: "Video Content",
    thumbLabel: "Video Content",
    thumbClass: "moss",
    description:
      "A short-form video showcasing on-camera presence and everyday style, filmed as part of her ongoing content creation work.",
    embed: {
      type: "video",
      src: "assets/videos/facebook-reel-1.mp4",
      poster: "assets/posters/facebook-reel-1.jpg",
    },
    featured: true,
  },
  {
    id: "reel-2",
    title: "Everyday Reel",
    platform: "Reel",
    category: "Reels",
    type: "Video Content",
    thumbLabel: "Video Content",
    thumbClass: "charcoal-grad",
    description:
      "Another short-form video reflecting natural storytelling and everyday content creation style.",
    embed: {
      type: "video",
      src: "assets/videos/facebook-reel-2.mp4",
      poster: "assets/posters/facebook-reel-2.jpg",
    },
    featured: false,
  },
  {
    id: "instagram-profile",
    title: "Instagram Profile & Feed",
    platform: "Instagram",
    category: "Instagram",
    type: "Social Media",
    thumbLabel: "Fashion & Beauty Feed",
    thumbClass: "mist",
    image: "assets/alina-instagram.jpg",
    description:
      "A curated Instagram presence blending modeling, fashion, and beauty content — showcasing a consistent aesthetic and personal brand identity.",
    url: "https://www.instagram.com/alina.rimal/",
    embed: { type: "none" },
    featured: false,
  },
];
