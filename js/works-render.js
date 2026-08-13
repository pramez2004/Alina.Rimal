// ===========================================================
// RENDER WORK CARDS + FILTER + LAZY VIDEO EMBEDS
// Depends on WORKS from works-data.js
//
// Cards show a real playable video — either a self-hosted file
// (full control, instant load) or TikTok's own iframe embed as
// a fallback option for future items. Self-hosted cards can still
// carry a "View on X →" outbound link if the item has a url.
// ===========================================================

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function embedSrc(item) {
  if (!item.embed) return '';
  if (item.embed.type === 'tiktok') {
    return `https://www.tiktok.com/embed/v2/${item.embed.id}`;
  }
  return '';
}

function workCardHTML(item, opts) {
  const large = opts && opts.large ? ' featured-lg' : '';
  const isIframeEmbed = item.embed && item.embed.type === 'tiktok';
  const isNativeVideo = item.embed && item.embed.type === 'video';

  let thumb;
  if (isIframeEmbed) {
    thumb = `<div class="work-thumb has-embed" data-lazy-embed data-embed-src="${embedSrc(item)}" data-embed-title="${escapeHtml(item.title)}">
         <span class="work-tag">${escapeHtml(item.platform)}</span>
         <div class="embed-placeholder">
           <span class="embed-spinner" aria-hidden="true"></span>
         </div>
       </div>`;
  } else if (isNativeVideo) {
    const tag = item.embed.hasWatermark
      ? ''
      : `<span class="work-tag">${escapeHtml(item.platform)}</span>`;
    thumb = `<div class="work-thumb has-native-video">
         ${tag}
         <video class="native-video" poster="${item.embed.poster}" preload="none" playsinline controls>
           <source src="${item.embed.src}" type="video/mp4">
         </video>
       </div>`;
  } else if (item.image) {
    thumb = `<div class="work-thumb has-photo" style="background-image: url('${item.image}')">
         <span class="work-tag">${escapeHtml(item.platform)}</span>
         <span class="work-thumb-title">${escapeHtml(item.thumbLabel)}</span>
       </div>`;
  } else {
    thumb = `<div class="work-thumb ${item.thumbClass}">
         <span class="work-tag">${escapeHtml(item.platform)}</span>
         <span class="work-thumb-title">${escapeHtml(item.thumbLabel)}</span>
       </div>`;
  }

  const outboundLink = item.url
    ? `<a class="work-link" href="${item.url}" target="_blank" rel="noopener">
        View on ${escapeHtml(item.platform)} →
      </a>`
    : '';

  return `
  <article class="work-card reveal${large}" data-category="${item.category}">
    ${thumb}
    <div class="work-info">
      <p class="work-type">${escapeHtml(item.type)}</p>
      <p class="work-title">${escapeHtml(item.title)}</p>
      <p class="work-desc">${escapeHtml(item.description)}</p>
      ${outboundLink}
    </div>
  </article>`;
}

function renderInto(containerId, items, opts) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = items.map((item) => workCardHTML(item, opts)).join('');
}

// Loads the real iframe into a thumb only once it's near the viewport.
// Loads are staggered (not all at once) and same-platform embeds get
// spaced further apart — loading several TikTok/Facebook iframes in the
// same instant can trip their own anti-abuse throttling and show a
// blank/error state instead of the video.
function initLazyEmbeds() {
  const thumbs = document.querySelectorAll('[data-lazy-embed]');
  if (!thumbs.length) return;

  const queue = [];
  let processing = false;

  function platformFromSrc(src) {
    return src.includes('tiktok.com') ? 'tiktok' : 'other';
  }

  function mount(thumb) {
    const src = thumb.getAttribute('data-embed-src');
    const title = thumb.getAttribute('data-embed-title');
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = title;
    iframe.loading = 'lazy';
    iframe.setAttribute('allow', 'autoplay; encrypted-media; fullscreen; clipboard-write; picture-in-picture; web-share');
    iframe.allowFullscreen = true;
    iframe.frameBorder = '0';

    const placeholder = thumb.querySelector('.embed-placeholder');
    if (placeholder) placeholder.remove();
    thumb.appendChild(iframe);

    // If the embed hasn't rendered any visible content after a few
    // seconds (e.g. platform throttling), swap in a manual retry card
    // instead of leaving a permanently blank box.
    const failTimer = setTimeout(() => {
      showFallback(thumb, iframe, src, title);
    }, 7000);
    iframe.addEventListener('load', () => clearTimeout(failTimer), { once: true });
  }

  function showFallback(thumb, iframe, src, title) {
    if (!thumb.contains(iframe)) return; // already retried/succeeded
    iframe.remove();
    const fallback = document.createElement('div');
    fallback.className = 'embed-fallback';
    fallback.innerHTML = `
      <p>This preview didn't load.</p>
      <button type="button" class="embed-retry">Try again</button>
    `;
    fallback.querySelector('.embed-retry').addEventListener('click', () => {
      fallback.remove();
      const spinner = document.createElement('div');
      spinner.className = 'embed-placeholder';
      spinner.innerHTML = '<span class="embed-spinner" aria-hidden="true"></span>';
      thumb.appendChild(spinner);
      queue.push(thumb);
      processQueue();
    });
    thumb.appendChild(fallback);
  }

  function processQueue() {
    if (processing || !queue.length) return;
    processing = true;
    const thumb = queue.shift();
    mount(thumb);
    const src = thumb.getAttribute('data-embed-src');
    // Space out same-platform embeds more than cross-platform ones.
    const delay = platformFromSrc(src) === 'tiktok' ? 1200 : 600;
    setTimeout(() => {
      processing = false;
      processQueue();
    }, delay);
  }

  function enqueue(thumb) {
    if (thumb.dataset.queued) return;
    thumb.dataset.queued = 'true';
    queue.push(thumb);
    processQueue();
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            enqueue(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '200px 0px' }
    );
    thumbs.forEach((t) => io.observe(t));
  } else {
    thumbs.forEach(enqueue);
  }
}

function initFilters() {
  const bar = document.querySelector('.filter-bar');
  if (!bar) return;
  const buttons = Array.from(bar.querySelectorAll('.filter-btn'));
  const grid = document.getElementById('worksGrid');
  const empty = document.querySelector('.works-empty');

  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    buttons.forEach((b) => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
    const category = btn.getAttribute('data-filter');
    const cards = grid.querySelectorAll('.work-card');
    let visibleCount = 0;
    cards.forEach((card) => {
      const match = category === 'All' || card.getAttribute('data-category') === category;
      card.classList.toggle('hidden-item', !match);
      if (match) visibleCount++;
    });
    if (empty) empty.classList.toggle('show', visibleCount === 0);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Home page: featured pieces only
  if (document.getElementById('featuredGrid')) {
    renderInto('featuredGrid', WORKS.filter((w) => w.featured));
  }
  // Works page: everything
  if (document.getElementById('worksGrid')) {
    renderInto('worksGrid', WORKS);
  }

  initLazyEmbeds();
  initFilters();

  // re-run reveal observer for cards injected after DOMContentLoaded
  const revealEls = document.querySelectorAll('.reveal:not(.in-view)');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealEls.forEach((el) => io.observe(el));
  }
});
