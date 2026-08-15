// ===========================================================
// RENDER SITE CONTENT FROM SITE (site-data.js)
// Populates Home (hero/about/skills/why) and Contact
// (intro/links/FAQ) — only runs against containers that exist
// on the current page, so this file is safe to include on both.
// ===========================================================

function siteEscapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof SITE === 'undefined') return;

  // ---- HERO (Home) ----
  const heroTag = document.getElementById('heroTag');
  if (heroTag) heroTag.textContent = SITE.hero.tag;

  const heroSubtitle = document.getElementById('heroSubtitle');
  if (heroSubtitle) heroSubtitle.textContent = SITE.hero.subtitle;

  const heroPhoto = document.getElementById('heroPhoto');
  if (heroPhoto) heroPhoto.style.backgroundImage = `url('${SITE.hero.photo}')`;

  const heroPills = document.getElementById('heroPills');
  if (heroPills) {
    heroPills.innerHTML = SITE.hero.pills
      .map((p) =>
        p.url
          ? `<a class="pill pill-link" href="${p.url}" target="_blank" rel="noopener">${siteEscapeHtml(p.label)}</a>`
          : `<span class="pill">${siteEscapeHtml(p.label)}</span>`
      )
      .join('');
  }

  // ---- ABOUT (Home) ----
  const aboutParagraphs = document.getElementById('aboutParagraphs');
  if (aboutParagraphs) {
    aboutParagraphs.innerHTML = SITE.about.paragraphs.map((p) => `<p>${siteEscapeHtml(p)}</p>`).join('');
  }

  const aboutStats = document.getElementById('aboutStats');
  if (aboutStats) {
    aboutStats.innerHTML = SITE.about.stats
      .map(
        (s) => `
      <div class="stat-card">
        <span class="stat-num">${siteEscapeHtml(s.value)}</span>
        <span class="stat-label">${siteEscapeHtml(s.label)}</span>
      </div>`
      )
      .join('');
  }

  // ---- SKILLS (Home) ----
  const skillsGrid = document.getElementById('skillsGrid');
  if (skillsGrid) {
    skillsGrid.innerHTML = SITE.skills
      .map(
        (s, i) => `
      <div class="skill-card reveal in-view">
        <span class="skill-index" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <div class="skill-name">${siteEscapeHtml(s.name)}</div>
        <p class="skill-desc">${siteEscapeHtml(s.desc)}</p>
      </div>`
      )
      .join('');
  }

  // ---- WHY COLLABORATE (Home) ----
  const whyGrid = document.getElementById('whyGrid');
  if (whyGrid) {
    whyGrid.innerHTML = SITE.why
      .map(
        (w) => `
      <div class="why-card reveal in-view">
        <h3>${siteEscapeHtml(w.title)}</h3>
        <p>${siteEscapeHtml(w.text)}</p>
      </div>`
      )
      .join('');
  }

  // ---- CONTACT INTRO (Contact) ----
  const contactHeroSub = document.getElementById('contactHeroSub');
  if (contactHeroSub) contactHeroSub.textContent = SITE.contact.heroSub;

  const contactIntro = document.getElementById('contactIntro');
  if (contactIntro) {
    contactIntro.innerHTML = SITE.contact.intro
      .map((p, i) => `<p class="contact-text"${i > 0 ? ' style="margin-top: 16px;"' : ''}>${siteEscapeHtml(p)}</p>`)
      .join('');
  }

  // ---- CONTACT LINKS (Contact) ----
  const contactLinksList = document.getElementById('contactLinksList');
  if (contactLinksList) {
    const c = SITE.contact;
    contactLinksList.innerHTML = `
      <a class="contact-link" href="${c.instagram.url}" target="_blank" rel="noopener">
        <div class="link-icon" aria-hidden="true">IG</div>
        <div>
          <span class="link-label">Instagram</span>
          <span class="link-value">${siteEscapeHtml(c.instagram.handle)}</span>
        </div>
      </a>
      <a class="contact-link" href="${c.tiktok.url}" target="_blank" rel="noopener">
        <div class="link-icon" aria-hidden="true">TT</div>
        <div>
          <span class="link-label">TikTok</span>
          <span class="link-value">${siteEscapeHtml(c.tiktok.handle)}</span>
        </div>
      </a>
      <a class="contact-link" href="mailto:${c.email}">
        <div class="link-icon" aria-hidden="true">@</div>
        <div>
          <span class="link-label">Email</span>
          <span class="link-value">${siteEscapeHtml(c.email)}</span>
        </div>
      </a>
      <a class="contact-link" href="${c.cvPath}" download>
        <div class="link-icon" aria-hidden="true">CV</div>
        <div>
          <span class="link-label">Media Kit</span>
          <span class="link-value">Download CV (PDF)</span>
        </div>
      </a>`;
  }

  // ---- FAQ (Contact) ----
  const faqList = document.getElementById('faqList');
  if (faqList) {
    faqList.innerHTML = SITE.faq
      .map(
        (item) => `
      <details class="faq-item">
        <summary>${siteEscapeHtml(item.q)}<span class="faq-toggle" aria-hidden="true"></span></summary>
        <p>${siteEscapeHtml(item.a)}</p>
      </details>`
      )
      .join('');
  }

  // ---- FOOTER SOCIAL LINKS (both pages) ----
  document.querySelectorAll('[data-footer-instagram]').forEach((el) => {
    el.href = SITE.contact.instagram.url;
  });
  document.querySelectorAll('[data-footer-tiktok]').forEach((el) => {
    el.href = SITE.contact.tiktok.url;
  });
});
