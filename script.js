// Astra Landing — vanilla, no deps
(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  // Year
  const y = String(new Date().getFullYear());
  const y1 = $('#year'); if (y1) y1.textContent = y;
  const y2 = $('#year2'); if (y2) y2.textContent = y;

  // Nav scroll state
  const navWrap = $('#navWrap');
  const onScroll = () => {
    if (!navWrap) return;
    if (window.scrollY > 10) navWrap.classList.add('is-scrolled');
    else navWrap.classList.remove('is-scrolled');
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const burger = $('#burger');
  const mobile = $('#mobileMenu');
  if (burger && mobile) {
    const toggle = (open) => {
      const isOpen = typeof open === 'boolean' ? open : mobile.hasAttribute('hidden');
      if (isOpen) {
        mobile.removeAttribute('hidden');
        burger.setAttribute('aria-expanded', 'true');
        burger.setAttribute('aria-label', 'Close menu');
      } else {
        mobile.setAttribute('hidden','');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Open menu');
      }
    };
    burger.addEventListener('click', () => toggle());
    $$('.mobile__link', mobile).forEach(a => a.addEventListener('click', () => toggle(false)));
    document.addEventListener('click', (e) => {
      if (!mobile.hasAttribute('hidden') && !navWrap.contains(e.target)) toggle(false);
    });
    addEventListener('keydown', (e) => { if (e.key === 'Escape') toggle(false); });
  }

  // Scroll reveal
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    $$('.reveal').forEach(el => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(ent => {
        if (ent.isIntersecting) {
          ent.target.classList.add('is-in');
          io.unobserve(ent.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 60 + 'ms';
      io.observe(el);
    });
  }

  // Cursor glow + hero parallax
  const glow = $('#cursorGlow');
  const heroVisual = $('#heroVisual');
  const mock = $('#mock');
  let glowActive = false;
  if (!prefersReduced && glow) {
    addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      if (!glowActive) { glow.style.opacity = '1'; glowActive = true; }
    }, { passive: true });
    addEventListener('mouseleave', () => { glow.style.opacity = '0'; glowActive = false; });
  }
  if (!prefersReduced && heroVisual && mock) {
    heroVisual.addEventListener('mousemove', (e) => {
      const r = heroVisual.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      mock.style.transform = `rotateY(${cx * -6}deg) rotateX(${cy * 4}deg) translateZ(0)`;
    });
    heroVisual.addEventListener('mouseleave', () => {
      mock.style.transform = 'rotateY(-4deg) rotateX(2deg)';
    });
  }

  // Experience tabs
  const tabs = $$('.exp__tab');
  const panels = $$('.exp__panel');
  if (tabs.length && panels.length) {
    const activate = (id) => {
      tabs.forEach(t => {
        const on = t.dataset.tab === id;
        t.classList.toggle('exp__tab--active', on);
        t.setAttribute('aria-selected', String(on));
      });
      panels.forEach(p => {
        const on = p.dataset.panel === id;
        p.classList.toggle('exp__panel--active', on);
      });
    };
    tabs.forEach(t => t.addEventListener('click', () => activate(t.dataset.tab)));
    // keyboard roving
    const tablist = $('.exp__tabs');
    if (tablist) {
      tablist.addEventListener('keydown', (e) => {
        const idx = tabs.findIndex(t => t.classList.contains('exp__tab--active'));
        if (e.key === 'ArrowRight') { e.preventDefault(); activate(tabs[(idx+1)%tabs.length].dataset.tab); tabs[(idx+1)%tabs.length].focus(); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); activate(tabs[(idx-1+tabs.length)%tabs.length].dataset.tab); tabs[(idx-1+tabs.length)%tabs.length].focus(); }
      });
    }
  }

  // Boot overlay — hide after animation (astra-landing)
  const mockBoot = $('#mockBoot');
  if (mockBoot) {
    if (prefersReduced) mockBoot.style.display = 'none';
    else setTimeout(() => { mockBoot.style.display = 'none'; }, 2600);
  }

  // Live embed — Run live here (desktop) / open new tab (mobile)
  const liveBtn = $('#mockLiveBtn');
  const liveFrame = $('#mockLiveFrame');
  const liveIframe = $('#mockLiveIframe');
  const liveClose = $('#mockLiveClose');
  const LIVE_URL2 = 'https://analoggeek.github.io/astrawebos/';
  if (liveBtn && liveFrame && liveIframe) {
    const openLive = () => {
      if (window.innerWidth < 1024) { window.open(LIVE_URL2, '_blank', 'noopener'); return; }
      liveIframe.src = LIVE_URL2;
      liveFrame.hidden = false;
      liveBtn.hidden = true;
      if (liveClose) liveClose.focus();
    };
    const closeLive = () => {
      liveFrame.hidden = true;
      liveBtn.hidden = false;
      liveIframe.src = 'about:blank';
      liveBtn.focus();
    };
    liveBtn.addEventListener('click', openLive);
    if (liveClose) liveClose.addEventListener('click', closeLive);
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && !liveFrame.hidden) closeLive(); });
  }

  // Tilt on bento cards — from astra-landing TiltCard
  if (!prefersReduced) {
    const cards = $$('.bcard');
    cards.forEach(card => {
      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width - 0.5;
        const cy = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(1000px) rotateY(${cx * 4}deg) rotateX(${cy * -4}deg) translateY(-2px)`;
      };
      const onLeave = () => { card.style.transform = ''; };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });
  }

  // Modern: scroll progress bar
  const prog = $('#scrollProgress');
  if (prog) {
    const upd = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? (window.scrollY / h) * 100 : 0;
      prog.style.width = p + '%';
    };
    addEventListener('scroll', upd, { passive: true });
    upd();
  }
  // Modern: glow follows mouse for cards
  $$('.bcard, .appCard, .whyCard, .stat').forEach(c => {
    c.addEventListener('mousemove', (e) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      c.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });
  // Modern: magnetic primary buttons
  if (!prefersReduced) {
    $$('.btn--primary').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.14;
        const y = (e.clientY - r.top - r.height / 2) * 0.18;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  // Live GitHub stats — public API, no token (astra-landing OpenSource)
  const ghStars = $('#ghStars'), ghForks = $('#ghForks'), ghIssues = $('#ghIssues'), ghUpdated = $('#ghUpdated');
  if (ghStars || ghForks || ghUpdated) {
    const api = 'https://api.github.com/repos/Analoggeek/astrawebos';
    const key = 'astra_gh_' + new Date().toISOString().slice(0,10);
    let cached = null;
    try { cached = JSON.parse(localStorage.getItem(key) || 'null'); } catch {}
    const render = (d) => {
      if (ghStars) ghStars.textContent = (d.stargazers_count ?? '—').toString();
      if (ghForks) ghForks.textContent = (d.forks_count ?? '—').toString();
      if (ghIssues) ghIssues.textContent = (d.open_issues_count ?? '—').toString();
      if (ghUpdated) ghUpdated.textContent = d.updated_at ? 'Updated ' + new Date(d.updated_at).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }) : '';
    };
    if (cached) render(cached);
    fetch(api, { headers: { 'Accept': 'application/vnd.github+json' } })
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(d => { render(d); try { localStorage.setItem(key, JSON.stringify(d)); } catch {} })
      .catch(() => { if (!cached && ghUpdated) ghUpdated.textContent = 'Live stats unavailable — open GitHub →'; });
  }

  // Smooth scroll offset handled by CSS scroll-padding, but ensure hash links close mobile
})();
