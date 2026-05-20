/**
 * Envío del formulario de contacto al correo de la empresa.
 * Funciona en cualquier hosting estático (Netlify, GitHub Pages, etc.).
 *
 * Proveedor por defecto: FormSubmit → empresa.email
 * Opcional: clave de https://web3forms.com en config (más estable a largo plazo)
 */
(function () {
  const cfg = typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG : {};
  const formCfg = cfg.contacto?.formulario || {};
  const empresa = cfg.empresa || {};

  function getDestinoEmail() {
    return (formCfg.emailDestino || empresa.email || '').trim();
  }

  function getReformLabel(form) {
    const select = form.querySelector('#reform-type');
    if (!select || !select.value) return 'No indicado';
    const opt = select.options[select.selectedIndex];
    return opt ? opt.textContent.trim() : select.value;
  }

  function readFormData(form) {
    const fd = new FormData(form);
    return {
      name: (fd.get('name') || '').toString().trim(),
      phone: (fd.get('phone') || '').toString().trim(),
      email: (fd.get('email') || '').toString().trim(),
      reformType: getReformLabel(form),
      message: (fd.get('message') || '').toString().trim(),
    };
  }

  function validate(data) {
    if (!data.name) return 'Indica tu nombre.';
    if (!data.phone) return 'Indica tu teléfono.';
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return 'El email no es válido.';
    }
    const select = document.getElementById('reform-type');
    if (select && !select.value) return 'Selecciona un tipo de reforma.';
    return null;
  }

  async function sendViaFormSubmit(email, data) {
    const payload = {
      name: data.name,
      phone: data.phone,
      email: data.email || 'No indicado',
      'Tipo de reforma': data.reformType,
      message: data.message || '(sin mensaje adicional)',
      _subject: formCfg.asuntoEmail || `Nuevo presupuesto — ${empresa.nombre}`,
      _template: 'table',
      _captcha: 'false',
    };
    if (data.email) payload._replyto = data.email;

    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('FormSubmit error');
    const json = await res.json().catch(() => ({}));
    if (json.success === false) throw new Error(json.message || 'FormSubmit rejected');
    return true;
  }

  async function sendViaWeb3Forms(accessKey, data) {
    const body = new FormData();
    body.append('access_key', accessKey);
    body.append('subject', formCfg.asuntoEmail || `Nuevo presupuesto — ${empresa.nombre}`);
    body.append('name', data.name);
    body.append('phone', data.phone);
    body.append('email', data.email || 'No indicado');
    body.append('reform_type', data.reformType);
    body.append('message', data.message || '(sin mensaje adicional)');
    body.append('from_name', empresa.nombre || 'Web reformas');

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body,
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Web3Forms error');
    return true;
  }

  async function sendViaFormspree(endpoint, form) {
    const res = await fetch(endpoint, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error('Formspree error');
    return true;
  }

  async function sendForm(form) {
    const data = readFormData(form);
    const err = validate(data);
    if (err) throw new Error(err);

    const email = getDestinoEmail();
    const accessKey = (formCfg.web3formsAccessKey || '').trim();
    const formspree = (formCfg.formspreeEndpoint || formCfg.action || '').trim();

    if (accessKey) {
      return sendViaWeb3Forms(accessKey, data);
    }
    if (formspree) {
      return sendViaFormspree(formspree, form);
    }
    if (!email) {
      throw new Error('Falta email de destino en config.js (empresa.email)');
    }
    return sendViaFormSubmit(email, data);
  }

  function setStatus(el, message, type) {
    if (!el) return;
    el.textContent = message;
    el.className = 'form-status' + (type ? ` form-status--${type}` : '');
  }

  function setLoading(btn, loading) {
    if (!btn) return;
    btn.disabled = loading;
    btn.classList.toggle('is-loading', loading);
  }

  function initContactForm() {
    const form = document.getElementById('contact-form');
    const statusEl = document.getElementById('form-status');
    const btn = document.getElementById('form-submit-btn');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      setStatus(statusEl, formCfg.mensajeEnviando || 'Enviando solicitud…', 'loading');
      setLoading(btn, true);

      try {
        await sendForm(form);
        setStatus(statusEl, formCfg.mensajeExito || '✓ Solicitud enviada correctamente', 'success');
        form.reset();
        const select = form.querySelector('#reform-type');
        if (select) {
          select.selectedIndex = 0;
        }
      } catch (error) {
        const msg =
          error.message && !error.message.includes('fetch')
            ? error.message
            : formCfg.mensajeError ||
              'No se pudo enviar. Llámanos por teléfono o WhatsApp.';
        setStatus(statusEl, msg, 'error');
      } finally {
        setLoading(btn, false);
      }
    });
  }

  document.addEventListener('site:rendered', initContactForm, { once: true });
})();
