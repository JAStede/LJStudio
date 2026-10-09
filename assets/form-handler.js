/* LJ Studio — formulierverzending via FormSubmit AJAX */
(() => {
  const endpoint = 'https://formsubmit.co/ajax/info@ljstudio.nl';
  document.querySelectorAll('[data-ajax-form]').forEach(form => {
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const button = form.querySelector('button[type="submit"]');
      const status = form.querySelector('.form-status');
      const original = button?.innerHTML;
      if (button) { button.disabled = true; button.textContent = 'Aanvraag wordt verzonden…'; }
      if (status) status.textContent = 'Even geduld, we versturen je aanvraag.';
      try {
        const data = new FormData(form);
        data.set('_subject', 'Nieuwe LJ Studio aanvraag - ' + (data.get('onderwerp') || 'Website'));
        data.set('_captcha', 'false');
        const response = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        const result = await response.json();
        if (!response.ok || result.success === false || result.success === 'false') {
          throw new Error('De aanvraag kon niet worden verwerkt.');
        }
        if (status) status.textContent = 'Bedankt! Je aanvraag is verzonden. We nemen zo snel mogelijk contact met je op.';
        form.reset();
      } catch (error) {
        if (status) status.textContent = 'Verzenden is niet gelukt. Probeer het opnieuw of mail naar info@ljstudio.nl.';
      } finally {
        if (button) { button.disabled = false; button.innerHTML = original; }
      }
    });
  });
})();
