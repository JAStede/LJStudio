
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
