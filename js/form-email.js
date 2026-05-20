/**
 * Envío del formulario de contacto al correo de la empresa.
 * Proveedor: FormSubmit → Reformasnyn@hotmail.com (API en minúsculas)
 */
(function () {
  const cfg = typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG : {};
  const formCfg = cfg.contacto?.formulario || {};
  const empresa = cfg.empresa || {};

  function getDestinoEmail() {
    const raw = (formCfg.emailDestino || empresa.email || '').trim();
    return raw.toLowerCase();
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
    if (window.location.protocol === 'file:') {
      return 'Abre la web desde Vercel o ejecuta "npx serve ." en la carpeta del proyecto. El formulario no funciona abriendo solo el archivo HTML.';
    }
    if (!data.name) return 'Indica tu nombre.';
    if (!data.phone) return 'Indica tu teléfono.';
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return 'El email no es válido.';
    }
    return null;
  }

  function parseFormSubmitResponse(res, text) {
    let json = {};
    try {
      json = text ? JSON.parse(text) : {};
    } catch (_) {
      /* respuesta no JSON */
    }

    if (!res.ok) {
      const msg = json.message || json.error || `Error del servidor (${res.status})`;
      throw new Error(msg);
    }

    if (json.success === false || json.success === 'false') {
      const msg = json.message || 'FormSubmit rechazó el envío';
      if (/activat/i.test(msg)) {
        throw new Error(
          'Activa el formulario: revisa Reformasnyn@hotmail.com (y Spam) y abre el correo de FormSubmit → "Activate Form".'
        );
      }
      throw new Error(msg);
    }

    return true;
  }

  async function sendViaFormSubmit(email, data) {
    const body = new FormData();
    body.append('name', data.name);
    body.append('phone', data.phone);
    body.append('email', data.email || 'No indicado');
    body.append('Tipo de reforma', data.reformType);
    body.append('message', data.message || '(sin mensaje adicional)');
    body.append('_subject', formCfg.asuntoEmail || `Nuevo presupuesto — ${empresa.nombre}`);
    body.append('_template', 'table');
    body.append('_captcha', 'false');
    if (data.email) body.append('_replyto', data.email);

    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body,
    });

    const text = await res.text();
    return parseFormSubmitResponse(res, text);
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

    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body });
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

  /** Envío clásico FormSubmit (redirige y vuelve a la web) */
  function sendViaFormSubmitRedirect(email, data) {
    const temp = document.createElement('form');
    temp.method = 'POST';
    temp.action = `https://formsubmit.co/${encodeURIComponent(email)}`;
    temp.style.display = 'none';

    const fields = {
      name: data.name,
      phone: data.phone,
      email: data.email || 'No indicado',
      'Tipo de reforma': data.reformType,
      message: data.message || '(sin mensaje adicional)',
      _subject: formCfg.asuntoEmail || `Nuevo presupuesto — ${empresa.nombre}`,
      _template: 'table',
      _captcha: 'false',
      _next: `${window.location.origin}${window.location.pathname}#contacto?enviado=1`,
    };

    Object.entries(fields).forEach(([key, val]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = val;
      temp.appendChild(input);
    });

    document.body.appendChild(temp);
    temp.submit();
  }

  async function sendForm(form, useRedirectFallback) {
    const data = readFormData(form);
    const err = validate(data);
    if (err) throw new Error(err);

    const email = getDestinoEmail();
    const accessKey = (formCfg.web3formsAccessKey || '').trim();
    const formspree = (formCfg.formspreeEndpoint || formCfg.action || '').trim();

    if (useRedirectFallback && email) {
      sendViaFormSubmitRedirect(email, data);
      return 'redirect';
    }

    if (accessKey) return sendViaWeb3Forms(accessKey, data);
    if (formspree) return sendViaFormspree(formspree, form);
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

  function showEnviadoDesdeUrl() {
    const hash = window.location.hash || '';
    const params = new URLSearchParams(window.location.search);
    if (!hash.includes('enviado=1') && params.get('enviado') !== '1') return;

    const statusEl = document.getElementById('form-status');
    setStatus(
      statusEl,
      formCfg.mensajeExito || '✓ Solicitud enviada. Te contactaremos en menos de 48 horas.',
      'success'
    );

    const contacto = document.getElementById('contacto');
    if (contacto) contacto.scrollIntoView({ behavior: 'smooth' });
  }

  function initContactForm() {
    const form = document.getElementById('contact-form');
    const statusEl = document.getElementById('form-status');
    const btn = document.getElementById('form-submit-btn');
    if (!form) return;

    showEnviadoDesdeUrl();

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      setStatus(statusEl, formCfg.mensajeEnviando || 'Enviando solicitud…', 'loading');
      setLoading(btn, true);

      try {
        const result = await sendForm(form, false);
        if (result === 'redirect') return;

        setStatus(statusEl, formCfg.mensajeExito || '✓ Solicitud enviada correctamente', 'success');
        form.reset();
        const select = form.querySelector('#reform-type');
        if (select) select.selectedIndex = 0;
      } catch (error) {
        const isNetwork =
          !error.message ||
          /fetch|network|failed|abort/i.test(error.message) ||
          error.name === 'TypeError';

        if (isNetwork && window.location.protocol !== 'file:') {
          setStatus(statusEl, 'Reintentando con método alternativo…', 'loading');
          try {
            const result = await sendForm(form, true);
            if (result === 'redirect') return;
          } catch (_) {
            /* sigue al mensaje de error */
          }
        }

        const msg = isNetwork
          ? formCfg.mensajeError ||
            'No se pudo enviar. Comprueba tu conexión o activa FormSubmit en Reformasnyn@hotmail.com.'
          : error.message ||
            formCfg.mensajeError ||
            'No se pudo enviar. Llámanos al 619 45 34 12 o por WhatsApp.';

        setStatus(statusEl, msg, 'error');
      } finally {
        setLoading(btn, false);
      }
    });
  }

  document.addEventListener('site:rendered', initContactForm, { once: true });
})();
