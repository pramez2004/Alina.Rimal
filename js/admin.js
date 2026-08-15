// ===========================================================
// ADMIN PANEL LOGIC
// Loads current SITE (site-data.js) and WORKS (works-data.js)
// into an editable in-memory + localStorage-backed state, renders
// forms for every section, and exports updated js/site-data.js
// and js/works-data.js files for the user to download and
// re-upload to their repo (replacing the old ones at the same
// paths). Nothing here talks to a server — this is a purely
// client-side editing convenience tool.
// ===========================================================

const DRAFT_KEY = 'alina-admin-draft-v1';

let state = null; // { site: {...}, works: [...] }

function loadInitialState() {
  const saved = localStorage.getItem(DRAFT_KEY);
  if (saved) {
    try {
      return { data: JSON.parse(saved), fromDraft: true };
    } catch (e) {
      // fall through to fresh load
    }
  }
  return {
    data: {
      site: JSON.parse(JSON.stringify(SITE)),
      works: JSON.parse(JSON.stringify(WORKS)),
    },
    fromDraft: false,
  };
}

function saveDraft() {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(state));
  const statusEl = document.getElementById('saveStatus');
  if (statusEl) {
    const now = new Date();
    statusEl.textContent = `Draft saved ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
}

let saveTimer = null;
function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveDraft, 350);
}

function esc(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : str;
  return div.innerHTML;
}

// ---- Generic field binding helpers ----
function bindText(id, getVal, setVal, isTextarea) {
  const el = document.getElementById(id);
  if (!el) return;
  el.value = getVal();
  el.addEventListener('input', () => {
    setVal(el.value);
    scheduleSave();
  });
}

function bindCheckbox(id, getVal, setVal) {
  const el = document.getElementById(id);
  if (!el) return;
  el.checked = !!getVal();
  el.addEventListener('change', () => {
    setVal(el.checked);
    scheduleSave();
  });
}

// ===========================================================
// HOME & ABOUT TAB
// ===========================================================
function renderHomeTab() {
  const s = state.data.site;

  bindText('f-heroTag', () => s.hero.tag, (v) => (s.hero.tag = v));
  bindText('f-heroSubtitle', () => s.hero.subtitle, (v) => (s.hero.subtitle = v));
  bindText('f-heroPhoto', () => s.hero.photo, (v) => (s.hero.photo = v));

  renderRepeatable({
    containerId: 'f-heroPills',
    items: s.hero.pills,
    addLabel: '+ Add pill',
    itemLabel: (item, i) => `Pill ${i + 1}`,
    fields: (item, i, update) => `
      <div class="admin-row">
        <div class="admin-field">
          <label>Label</label>
          <input type="text" data-field="label" value="${esc(item.label)}">
        </div>
        <div class="admin-field">
          <label>Link URL (leave blank for a plain tag)</label>
          <input type="text" data-field="url" value="${esc(item.url)}">
        </div>
      </div>`,
    onAdd: () => s.hero.pills.push({ label: 'New Tag', url: '' }),
    onRemove: (i) => s.hero.pills.splice(i, 1),
  });

  renderRepeatable({
    containerId: 'f-aboutParagraphs',
    items: s.about.paragraphs,
    addLabel: '+ Add paragraph',
    itemLabel: (item, i) => `Paragraph ${i + 1}`,
    fields: (item, i) => `
      <div class="admin-field">
        <textarea data-field="_self" rows="3">${esc(item)}</textarea>
      </div>`,
    onAdd: () => s.about.paragraphs.push('New paragraph...'),
    onRemove: (i) => s.about.paragraphs.splice(i, 1),
    isPrimitiveArray: true,
    setPrimitive: (i, v) => (s.about.paragraphs[i] = v),
  });

  renderRepeatable({
    containerId: 'f-aboutStats',
    items: s.about.stats,
    addLabel: '+ Add stat',
    itemLabel: (item, i) => `Stat ${i + 1}`,
    fields: (item) => `
      <div class="admin-row">
        <div class="admin-field">
          <label>Value (e.g. "Multi", "Pro", "100%")</label>
          <input type="text" data-field="value" value="${esc(item.value)}">
        </div>
        <div class="admin-field">
          <label>Label</label>
          <input type="text" data-field="label" value="${esc(item.label)}">
        </div>
      </div>`,
    onAdd: () => s.about.stats.push({ value: 'New', label: 'New stat label' }),
    onRemove: (i) => s.about.stats.splice(i, 1),
  });

  renderRepeatable({
    containerId: 'f-skills',
    items: s.skills,
    addLabel: '+ Add skill',
    itemLabel: (item, i) => `Skill ${String(i + 1).padStart(2, '0')}`,
    fields: (item) => `
      <div class="admin-field">
        <label>Name</label>
        <input type="text" data-field="name" value="${esc(item.name)}">
      </div>
      <div class="admin-field">
        <label>Description</label>
        <textarea data-field="desc" rows="2">${esc(item.desc)}</textarea>
      </div>`,
    onAdd: () => s.skills.push({ name: 'New Skill', desc: 'Description...' }),
    onRemove: (i) => s.skills.splice(i, 1),
  });

  renderRepeatable({
    containerId: 'f-why',
    items: s.why,
    addLabel: '+ Add card',
    itemLabel: (item, i) => `Card ${i + 1}`,
    fields: (item) => `
      <div class="admin-field">
        <label>Title</label>
        <input type="text" data-field="title" value="${esc(item.title)}">
      </div>
      <div class="admin-field">
        <label>Text</label>
        <textarea data-field="text" rows="3">${esc(item.text)}</textarea>
      </div>`,
    onAdd: () => s.why.push({ title: 'New Reason', text: 'Description...' }),
    onRemove: (i) => s.why.splice(i, 1),
  });
}

// ===========================================================
// CONTACT & FAQ TAB
// ===========================================================
function renderContactTab() {
  const s = state.data.site;

  bindText('f-contactHeroSub', () => s.contact.heroSub, (v) => (s.contact.heroSub = v));
  bindText('f-email', () => s.contact.email, (v) => (s.contact.email = v));
  bindText('f-igHandle', () => s.contact.instagram.handle, (v) => (s.contact.instagram.handle = v));
  bindText('f-igUrl', () => s.contact.instagram.url, (v) => (s.contact.instagram.url = v));
  bindText('f-ttHandle', () => s.contact.tiktok.handle, (v) => (s.contact.tiktok.handle = v));
  bindText('f-ttUrl', () => s.contact.tiktok.url, (v) => (s.contact.tiktok.url = v));
  bindText('f-cvPath', () => s.contact.cvPath, (v) => (s.contact.cvPath = v));

  renderRepeatable({
    containerId: 'f-contactIntro',
    items: s.contact.intro,
    addLabel: '+ Add paragraph',
    itemLabel: (item, i) => `Paragraph ${i + 1}`,
    fields: (item) => `
      <div class="admin-field">
        <textarea data-field="_self" rows="3">${esc(item)}</textarea>
      </div>`,
    onAdd: () => s.contact.intro.push('New paragraph...'),
    onRemove: (i) => s.contact.intro.splice(i, 1),
    isPrimitiveArray: true,
    setPrimitive: (i, v) => (s.contact.intro[i] = v),
  });

  renderRepeatable({
    containerId: 'f-faq',
    items: s.faq,
    addLabel: '+ Add question',
    itemLabel: (item, i) => `Question ${i + 1}`,
    fields: (item) => `
      <div class="admin-field">
        <label>Question</label>
        <input type="text" data-field="q" value="${esc(item.q)}">
      </div>
      <div class="admin-field">
        <label>Answer</label>
        <textarea data-field="a" rows="3">${esc(item.a)}</textarea>
      </div>`,
    onAdd: () => s.faq.push({ q: 'New question?', a: 'Answer...' }),
    onRemove: (i) => s.faq.splice(i, 1),
  });
}

// ===========================================================
// PORTFOLIO TAB
// ===========================================================
const THUMB_CLASSES = ['sage', 'charcoal-grad', 'mist', 'moss'];
const EMBED_TYPES = ['video', 'tiktok', 'none'];

function embedFieldsHTML(item) {
  const type = item.embed ? item.embed.type : 'none';
  if (type === 'video') {
    return `
      <div class="admin-embed-fields">
        <div class="admin-row">
          <div class="admin-field">
            <label>Video file path</label>
            <input type="text" data-embed-field="src" value="${esc(item.embed.src)}" placeholder="assets/videos/name.mp4">
          </div>
          <div class="admin-field">
            <label>Poster image path</label>
            <input type="text" data-embed-field="poster" value="${esc(item.embed.poster)}" placeholder="assets/posters/name.jpg">
          </div>
        </div>
        <label class="admin-checkbox">
          <input type="checkbox" data-embed-field="hasWatermark" ${item.embed.hasWatermark ? 'checked' : ''}>
          Video already shows its own platform watermark (hides our badge)
        </label>
      </div>`;
  }
  if (type === 'tiktok') {
    return `
      <div class="admin-embed-fields">
        <div class="admin-field">
          <label>TikTok video ID (the number from the TikTok URL)</label>
          <input type="text" data-embed-field="id" value="${esc(item.embed.id)}">
        </div>
      </div>`;
  }
  return `<div class="admin-embed-fields"><p class="admin-section-hint" style="margin:0;">No player — card links straight out via the URL field above.</p></div>`;
}

function renderPortfolioTab() {
  const container = document.getElementById('f-portfolio');
  if (!container) return;

  function redraw() {
    container.innerHTML = state.data.works
      .map((item, i) => {
        return `
      <div class="admin-list-item" data-index="${i}">
        <div class="admin-list-item-head">
          <span class="admin-list-item-label">${esc(item.title || 'Untitled')}</span>
          <button type="button" class="admin-remove-btn" data-action="remove-work">Remove</button>
        </div>
        <div class="admin-row">
          <div class="admin-field">
            <label>Title</label>
            <input type="text" data-work-field="title" value="${esc(item.title)}">
          </div>
          <div class="admin-field">
            <label>Platform tag (shown on card)</label>
            <input type="text" data-work-field="platform" value="${esc(item.platform)}">
          </div>
        </div>
        <div class="admin-row-3">
          <div class="admin-field">
            <label>Filter category</label>
            <input type="text" data-work-field="category" value="${esc(item.category)}">
          </div>
          <div class="admin-field">
            <label>Type label</label>
            <input type="text" data-work-field="type" value="${esc(item.type)}">
          </div>
          <div class="admin-field">
            <label>Featured on Home?</label>
            <select data-work-field="featured">
              <option value="true" ${item.featured ? 'selected' : ''}>Yes</option>
              <option value="false" ${!item.featured ? 'selected' : ''}>No</option>
            </select>
          </div>
        </div>
        <div class="admin-field">
          <label>Description</label>
          <textarea data-work-field="description" rows="2">${esc(item.description)}</textarea>
        </div>
        <div class="admin-row">
          <div class="admin-field">
            <label>Outbound link (optional — "View on X →")</label>
            <input type="text" data-work-field="url" value="${esc(item.url)}" placeholder="https://...">
          </div>
          <div class="admin-field">
            <label>Fallback color (used only if no video/image)</label>
            <select data-work-field="thumbClass">
              ${THUMB_CLASSES.map((c) => `<option value="${c}" ${item.thumbClass === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="admin-field">
          <label>Player type</label>
          <select data-work-field="embedType">
            ${EMBED_TYPES.map((t) => `<option value="${t}" ${(item.embed && item.embed.type) === t ? 'selected' : ''}>${t}</option>`).join('')}
          </select>
        </div>
        ${embedFieldsHTML(item)}
      </div>`;
      })
      .join('');

    // wire up all inputs for this redraw
    container.querySelectorAll('.admin-list-item').forEach((card) => {
      const i = Number(card.getAttribute('data-index'));
      const item = state.data.works[i];

      card.querySelectorAll('[data-work-field]').forEach((el) => {
        el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', () => {
          const field = el.getAttribute('data-work-field');
          if (field === 'featured') {
            item.featured = el.value === 'true';
          } else if (field === 'embedType') {
            const newType = el.value;
            if (newType === 'video') {
              item.embed = { type: 'video', src: item.embed && item.embed.src ? item.embed.src : '', poster: item.embed && item.embed.poster ? item.embed.poster : '', hasWatermark: false };
            } else if (newType === 'tiktok') {
              item.embed = { type: 'tiktok', id: item.embed && item.embed.id ? item.embed.id : '' };
            } else {
              item.embed = { type: 'none' };
            }
            redraw();
            scheduleSave();
            return;
          } else {
            item[field] = el.value;
          }
          scheduleSave();
        });
      });

      card.querySelectorAll('[data-embed-field]').forEach((el) => {
        el.addEventListener(el.type === 'checkbox' ? 'change' : 'input', () => {
          const field = el.getAttribute('data-embed-field');
          item.embed[field] = el.type === 'checkbox' ? el.checked : el.value;
          scheduleSave();
        });
      });

      const removeBtn = card.querySelector('[data-action="remove-work"]');
      removeBtn.addEventListener('click', () => {
        if (!confirm(`Remove "${item.title || 'this item'}" from the portfolio?`)) return;
        state.data.works.splice(i, 1);
        redraw();
        scheduleSave();
      });
    });
  }

  redraw();

  const addBtn = document.getElementById('addWorkBtn');
  addBtn.addEventListener('click', () => {
    state.data.works.push({
      id: 'new-item-' + Date.now(),
      title: 'New Work Item',
      platform: 'Reel',
      category: 'Reels',
      type: 'Video Content',
      thumbLabel: 'Video Content',
      thumbClass: 'sage',
      description: '',
      url: '',
      embed: { type: 'video', src: '', poster: '', hasWatermark: false },
      featured: false,
    });
    redraw();
    scheduleSave();
  });
}

// ===========================================================
// GENERIC REPEATABLE LIST RENDERER
// Used for pills, paragraphs, stats, skills, why-cards, FAQ.
// ===========================================================
function renderRepeatable(cfg) {
  const container = document.getElementById(cfg.containerId);
  if (!container) return;

  function redraw() {
    container.innerHTML = cfg.items
      .map(
        (item, i) => `
      <div class="admin-list-item" data-index="${i}">
        <div class="admin-list-item-head">
          <span class="admin-list-item-label">${esc(cfg.itemLabel(item, i))}</span>
          <button type="button" class="admin-remove-btn" data-action="remove">Remove</button>
        </div>
        ${cfg.fields(item, i)}
      </div>`
      )
      .join('');

    container.querySelectorAll('.admin-list-item').forEach((card) => {
      const i = Number(card.getAttribute('data-index'));

      if (cfg.isPrimitiveArray) {
        const textarea = card.querySelector('[data-field="_self"]');
        textarea.addEventListener('input', () => {
          cfg.setPrimitive(i, textarea.value);
          scheduleSave();
        });
      } else {
        card.querySelectorAll('[data-field]').forEach((el) => {
          el.addEventListener('input', () => {
            cfg.items[i][el.getAttribute('data-field')] = el.value;
            scheduleSave();
          });
        });
      }

      card.querySelector('[data-action="remove"]').addEventListener('click', () => {
        cfg.onRemove(i);
        redraw();
        scheduleSave();
      });
    });
  }

  redraw();

  // Add button lives right after the container in the DOM
  const addBtn = container.parentElement.querySelector('[data-add-for="' + cfg.containerId + '"]');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      cfg.onAdd();
      redraw();
      scheduleSave();
    });
  }
}

// ===========================================================
// FILE EXPORT
// ===========================================================
function downloadFile(filename, text) {
  const blob = new Blob([text], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function buildSiteDataFile() {
  const header = `// ===========================================================
// SITE CONTENT DATA
// Generated by admin.html — replace js/site-data.js with this
// file and re-upload to publish these changes.
// ===========================================================

const SITE = `;
  return header + JSON.stringify(state.data.site, null, 2) + ';\n';
}

function buildWorksDataFile() {
  const header = `// ===========================================================
// PORTFOLIO DATA
// Generated by admin.html — replace js/works-data.js with this
// file and re-upload to publish these changes.
// ===========================================================

const WORKS = `;
  return header + JSON.stringify(state.data.works, null, 2) + ';\n';
}

function exportFiles() {
  downloadFile('site-data.js', buildSiteDataFile());
  setTimeout(() => downloadFile('works-data.js', buildWorksDataFile()), 300);
}

// ===========================================================
// TABS
// ===========================================================
function initTabs() {
  const tabs = document.querySelectorAll('.admin-tab');
  const panels = document.querySelectorAll('.admin-panel');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.getAttribute('data-panel')).classList.add('active');
    });
  });
}

// ===========================================================
// INIT
// ===========================================================
document.addEventListener('DOMContentLoaded', () => {
  const { data, fromDraft } = loadInitialState();
  state = { data };

  const banner = document.getElementById('draftBanner');
  if (fromDraft && banner) {
    banner.classList.remove('hidden');
    document.getElementById('discardDraftBtn').addEventListener('click', () => {
      if (!confirm('Discard your saved draft and reload the current published content?')) return;
      localStorage.removeItem(DRAFT_KEY);
      location.reload();
    });
  }

  initTabs();
  renderHomeTab();
  renderContactTab();
  renderPortfolioTab();

  document.getElementById('exportBtn').addEventListener('click', exportFiles);
  document.getElementById('saveNowBtn').addEventListener('click', saveDraft);
});
