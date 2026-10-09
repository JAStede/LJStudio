
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
