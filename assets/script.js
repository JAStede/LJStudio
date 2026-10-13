
(() => {
  // Mobiele navigatie
  const menu = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');

  const close = () => {
    nav?.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  menu?.addEventListener('click', () => {
    if (!nav) return;

    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });

  nav?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', close);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });

  // Automatisch jaartal
  document.querySelectorAll('[data-year]').forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  // Scrollanimaties
  const items = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.07,
      rootMargin: '0px 0px 30px 0px'
    });

    items.forEach(item => observer.observe(item));
  } else {
    items.forEach(item => item.classList.add('visible'));
  }

  // Scrollvoortgang
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.append(progress);

  let raf = false;

  window.addEventListener('scroll', () => {
    if (raf) return;
    raf = true;

    requestAnimationFrame(() => {
      const html = document.documentElement;
      const maximum = Math.max(
        1,
        html.scrollHeight - html.clientHeight
      );

      const percentage = Math.max(
        0,
        Math.min(1, html.scrollTop / maximum)
      );

      progress.style.transform = `scaleX(${percentage})`;
      raf = false;
    });
  }, { passive: true });

  // Contactgegevens
  document.querySelectorAll('[data-contact-email]').forEach(link => {
    link.href = 'mailto:info@ljstudio.nl';
    link.textContent = 'info@ljstudio.nl';
  });

  // Automatisch pakket selecteren via URL
  const params = new URLSearchParams(location.search);
  const subject = document.querySelector('#onderwerp');
  const pakket = params.get('pakket');

  if (subject && pakket) {
    const option = [...subject.options].find(option =>
      option.textContent.toLowerCase().includes(pakket.toLowerCase())
    );

    if (option) subject.value = option.value;
  }

  // Ondersteuning voor eventuele oude mailformulieren
  document.querySelectorAll('[data-mail-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const lines = [
        'Nieuwe aanvraag via LJ Studio',
        '',
        ...Array.from(data.entries(), ([key, value]) =>
          key + ': ' + String(value).trim()
        )
      ];

      const url =
        'mailto:info@ljstudio.nl?subject=' +
        encodeURIComponent(
          'LJ Studio aanvraag - ' +
          (data.get('onderwerp') || 'Website')
        ) +
        '&body=' +
        encodeURIComponent(lines.join('\n'));

      const status = form.querySelector('.form-status');

      if (status) {
        status.textContent =
          'Je e-mailprogramma wordt geopend. Verstuur de e-mail zelf om de aanvraag te verzenden.';
      }

      window.location.href = url;
    });
  });

  // Gouden ster: gebruik tekstvariant in plaats van emoji
  document.querySelectorAll('.page-symbol').forEach(star => {
    star.textContent = '\u2733\uFE0E';
  });
})();

/* LJ Studio - SVG pijltjes voor desktop en mobiel */
(() => {
  const svgNS = 'http://www.w3.org/2000/svg';

  function createArrow() {
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '1em');
    svg.setAttribute('height', '1em');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');

    svg.style.display = 'inline-block';
    svg.style.verticalAlign = '-0.12em';
    svg.style.flexShrink = '0';

    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', 'M7 17 17 7 M8 7h9v9');
    svg.appendChild(path);

    return svg;
  }

  document.querySelectorAll('a, button').forEach(element => {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT
    );

    const nodes = [];
    while (walker.nextNode()) {
      if (walker.currentNode.nodeValue.includes('↗')) {
        nodes.push(walker.currentNode);
      }
    }

    nodes.forEach(node => {
      const parts = node.nodeValue.split('↗');
      const fragment = document.createDocumentFragment();

      parts.forEach((part, index) => {
        if (index > 0) {
          fragment.appendChild(createArrow());
        }
        fragment.appendChild(document.createTextNode(part));
      });

      node.replaceWith(fragment);
    });
  });
})();

/* LJ Studio - SVG pijlen bij de vier processtappen */
(() => {
  document.querySelectorAll('.step-arrow').forEach(element => {
    if (!element.textContent.includes('↗')) return;

    const svg = document.createElementNS(
      'http://www.w3.org/2000/svg', 'svg'
    );

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '1em');
    svg.setAttribute('height', '1em');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');

    svg.style.display = 'inline-block';
    svg.style.verticalAlign = '-0.12em';

    const path = document.createElementNS(
      'http://www.w3.org/2000/svg', 'path'
    );

    path.setAttribute('d', 'M7 17 17 7 M8 7h9v9');
    svg.appendChild(path);

    element.replaceChildren(svg);
  });
})();
/* LJ Studio - laatste blauwe pijl in decoratief vlak */
(() => {
  const selectors = '.split-art, .shape-frame, .shape-badge, .shape-disc';

  document.querySelectorAll(selectors).forEach(container => {
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT
    );

    const nodes = [];

    while (walker.nextNode()) {
      if (walker.currentNode.nodeValue.includes('↗')) {
        nodes.push(walker.currentNode);
      }
    }

    nodes.forEach(node => {
      const parts = node.nodeValue.split('↗');
      const fragment = document.createDocumentFragment();

      parts.forEach((part, index) => {
        if (index > 0) {
          const svg = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'svg'
          );

          svg.setAttribute('viewBox', '0 0 24 24');
          svg.setAttribute('width', '1em');
          svg.setAttribute('height', '1em');
          svg.setAttribute('fill', 'none');
          svg.setAttribute('stroke', 'currentColor');
          svg.setAttribute('stroke-width', '2');
          svg.setAttribute('stroke-linecap', 'round');
          svg.setAttribute('stroke-linejoin', 'round');
          svg.setAttribute('aria-hidden', 'true');

          svg.style.display = 'inline-block';
          svg.style.verticalAlign = '-0.12em';

          const path = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path'
          );

          path.setAttribute('d', 'M7 17 17 7 M8 7h9v9');
          svg.appendChild(path);
          fragment.appendChild(svg);
        }

        fragment.appendChild(document.createTextNode(part));
      });

      node.replaceWith(fragment);
    });
  });
})();


/* Gratis cookiebeheer LJ Studio: GA4 laadt uitsluitend na expliciete toestemming. */
(() => {
  'use strict';
  const STORAGE_KEY = 'ljstudio_analytics_consent_v1';
  const MEASUREMENT_ID = 'G-YC8VL5WH6Q';
  const readConsent = () => {
    try { const v = localStorage.getItem(STORAGE_KEY); return v === 'accepted' || v === 'rejected' ? v : null; }
    catch (_) { return null; }
  };
  const writeConsent = value => {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (_) { /* Privacy-instellingen blijven in deze sessie actief. */ }
  };
  let state = readConsent();
  let analyticsLoaded = false;
  const loadAnalytics = () => {
    if (analyticsLoaded || state !== 'accepted') return;
    analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID, { anonymize_ip: true });
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
    document.head.appendChild(tag);
  };
  const css = document.createElement('style');
  css.textContent = '.lj-cookie-panel{position:fixed;bottom:16px;left:16px;right:16px;z-index:2147483646;max-width:650px;margin:auto;padding:23px;background:#15120e;color:#f8f2e8;border:1px solid #b88b4b;border-radius:12px;box-shadow:0 15px 55px #0009;font-family:inherit}.lj-cookie-panel h2{font-size:19px;line-height:1.35;margin:0 0 9px;color:#f4e5cd}.lj-cookie-panel p{font-size:13px;line-height:1.65;margin:0 0 15px;color:#e0d1ba}.lj-cookie-panel a{color:#eac58a;text-decoration:underline}.lj-cookie-actions{display:flex;gap:9px;flex-wrap:wrap}.lj-cookie-actions button{flex:1 1 160px;min-height:43px;border-radius:6px;border:1px solid #a98854;background:#282117;color:#fff;padding:9px 12px;cursor:pointer;font:inherit;font-size:13px;font-weight:700}.lj-cookie-actions button[data-accept]{background:#d6a65d;border-color:#d6a65d;color:#15100a}.lj-cookie-actions button:focus-visible,.lj-cookie-settings:focus-visible{outline:3px solid #e9b66a;outline-offset:3px}.lj-cookie-settings{background:none;border:0;color:inherit;text-decoration:underline;cursor:pointer;font:inherit;font-size:12px;margin-top:8px}.lj-cookie-panel[hidden]{display:none!important}@media(max-width:480px){.lj-cookie-panel{bottom:8px;left:8px;right:8px;padding:16px}.lj-cookie-actions button{flex-basis:100%}}';
  document.head.appendChild(css);
  const panel = document.createElement('section');
  panel.className = 'lj-cookie-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Cookievoorkeuren');
  panel.innerHTML = '<h2>Jouw privacy, jouw keuze.</h2><p>Wij gebruiken noodzakelijke technieken voor de website. Alleen met jouw toestemming laden we Google Analytics om te zien welke pagina’s worden bezocht. We gebruiken geen advertentiecookies. Je kunt je keuze altijd wijzigen. Lees onze <a href="/privacyverklaring.html">privacyverklaring</a>.</p><div class="lj-cookie-actions"><button type="button" data-reject>Alleen noodzakelijk</button><button type="button" data-accept>Alles toestaan</button></div>';
  panel.hidden = true;
  document.body.appendChild(panel);
  const show = () => { panel.hidden = false; };
  const hide = () => { panel.hidden = true; };
  const decide = value => {
    const old = state;
    state = value;
    writeConsent(value);
    hide();
    if (value === 'accepted') loadAnalytics();
    // Na intrekken: herladen verwijdert de GA4-runtime; er worden geen nieuwe hits verstuurd.
    if (old === 'accepted' && value === 'rejected') location.reload();
  };
  panel.querySelector('[data-reject]').addEventListener('click', () => decide('rejected'));
  panel.querySelector('[data-accept]').addEventListener('click', () => decide('accepted'));
  const footer = document.querySelector('footer') || document.body;
  const settings = document.createElement('button');
  settings.type = 'button';
  settings.className = 'lj-cookie-settings';
  settings.textContent = 'Cookie-instellingen';
  settings.addEventListener('click', show);
  footer.appendChild(settings);
  if (state === 'accepted') loadAnalytics();
  else if (state === null) show();
})();


/* LJ Studio: subtiele terug-naar-boven knop met scrollvoortgang. */
(() => {
  'use strict';
  const init = () => {
    if (document.querySelector('.lj-scroll-top')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'lj-scroll-top';
    button.setAttribute('aria-label', 'Terug naar boven');
    button.setAttribute('title', 'Terug naar boven');
    button.innerHTML = '<svg class="lj-scroll-ring" viewBox="0 0 60 60" aria-hidden="true"><circle class="lj-scroll-track" cx="30" cy="30" r="26"/><circle class="lj-scroll-progress" cx="30" cy="30" r="26"/></svg><span class="lj-scroll-mark" aria-hidden="true"></span>';
    document.body.appendChild(button);
    const circle = button.querySelector('.lj-scroll-progress');
    const length = 2 * Math.PI * 26;
    circle.style.strokeDasharray = String(length);
    const update = () => {
      const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = max ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      circle.style.strokeDashoffset = String(length * (1 - ratio));
      button.classList.toggle('is-visible', window.scrollY > 180 && max > 0);
      button.style.setProperty('--lj-mark-opacity', String(0.35 + ratio * 0.65));
    };
    let pending = false;
    window.addEventListener('scroll', () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => { pending = false; update(); });
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    button.addEventListener('click', () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' });
    });
    update();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
