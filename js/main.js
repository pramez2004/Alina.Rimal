// ===========================================================
// SHARED BEHAVIOR — nav toggle, scroll reveal
// Runs on every page.
// ===========================================================

(function () {
  // ---- Mobile nav toggle ----
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  const scrim = document.querySelector('.nav-scrim');

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    links.classList.remove('open');
    scrim.classList.remove('open');
    document.body.style.overflow = '';
  }

  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    links.classList.add('open');
    scrim.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  if (toggle && links && scrim) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });
    scrim.addEventListener('click', closeMenu);
    links.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // ---- Scroll reveal ----
  const revealEls = document.querySelectorAll('.reveal');
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
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  // ---- Only one audible video plays at a time ----
  // The 'play' event doesn't bubble, so this listens in the capture phase
  // on document to catch every <video> on the page, including ones added
  // later (e.g. lazy-loaded work cards). Muted videos (like the hero
  // background loop) are left alone since they produce no audio to clash.
  document.addEventListener(
    'play',
    (e) => {
      const target = e.target;
      if (!(target instanceof HTMLVideoElement)) return;
      document.querySelectorAll('video').forEach((v) => {
        if (v !== target && !v.muted && !v.paused) {
          v.pause();
        }
      });
    },
    true
  );
})();
