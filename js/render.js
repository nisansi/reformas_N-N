/**
 * Genera el HTML de secciones dinámicas desde SITE_CONFIG.
 */
(function () {
  const cfg = typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG : null;
  if (!cfg) return;

  const ICONS = {
    integral:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
    bano:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/><rect x="2" y="2" width="20" height="20" rx="2"/></svg>',
    cocina:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01"/></svg>',
    pintura:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
    albanileria:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="22" height="12" rx="2"/><path d="M1 10h22"/><path d="M6 6v-2"/><path d="M18 6v-2"/></svg>',
    instalaciones:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    location:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    facebook:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>',
    google:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
    phone:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>',
    email:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    stat: [
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M9 12l2 2 4-4"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/></svg>',
    ],
  };

  function setText(el, text, html) {
    if (!el) return;
    if (html) el.innerHTML = text;
    else el.textContent = text;
  }

  function renderNav(container, links, activeId) {
    if (!container) return;
    container.innerHTML = links
      .map(
        (l) =>
          `<a href="#${l.id}"${l.id === activeId ? ' class="active"' : ''}>${l.label}</a>`
      )
      .join('');
  }

  function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid) return;
    grid.innerHTML = cfg.estadisticas
      .map((stat, i) => {
        const dataNum =
          stat.animarNumero != null ? ` data-animate="${stat.animarNumero}"` : '';
        return `
        <div class="stat-item">
          <div class="stat-icon">${ICONS.stat[i] || ICONS.stat[0]}</div>
          <div class="stat-value"${dataNum}>${stat.texto}</div>
        </div>`;
      })
      .join('');
  }

  function renderServices() {
    const grid = document.getElementById('services-grid');
    const title = document.getElementById('services-title');
    if (title) setText(title, cfg.servicios.titulo);
    if (!grid) return;
    grid.innerHTML = cfg.servicios.items
      .map(
        (s) => `
      <div class="service-card reveal">
        <div class="service-card-icon">${ICONS[s.icono] || ICONS.integral}</div>
        <h3>${s.titulo}</h3>
        <p>${s.descripcion}</p>
      </div>`
      )
      .join('');
  }

  function renderProjects() {
    const grid = document.getElementById('projects-grid');
    const title = document.getElementById('projects-title');
    const btn = document.getElementById('projects-btn');
    const utils = window.ProjectUtils;

    if (title) setText(title, cfg.proyectos.titulo);
    if (btn) {
      btn.textContent = cfg.proyectos.boton.texto;
      btn.href = cfg.proyectos.boton.enlace;
      if (cfg.proyectos.boton.nuevaPestana) {
        btn.target = '_blank';
        btn.rel = 'noopener noreferrer';
      } else {
        btn.removeAttribute('target');
        btn.removeAttribute('rel');
      }
    }
    if (!grid || !utils) return;

    const featured = utils.getFeaturedProjects(cfg.proyectos.items, 3);
    grid.innerHTML = featured
      .map((p) => utils.buildProjectCard(p))
      .join('');
  }

  function renderProcess() {
    const grid = document.getElementById('process-grid');
    const title = document.getElementById('process-title');
    const subtitle = document.getElementById('process-subtitle');
    if (title) setText(title, cfg.proceso.titulo);
    if (subtitle) setText(subtitle, cfg.proceso.subtitulo);
    if (!grid) return;
    grid.innerHTML = cfg.proceso.pasos
      .map(
        (paso, i) => `
      <div class="process-step reveal">
        <div class="process-step-num">${i + 1}</div>
        <h3>${paso.titulo}</h3>
        <p>${paso.descripcion}</p>
      </div>`
      )
      .join('');
  }

  function renderReformOptions() {
    const select = document.getElementById('reform-type');
    if (!select) return;
    const placeholder = select.querySelector('option[disabled]');
    select.innerHTML = '';
    if (placeholder) select.appendChild(placeholder);
    cfg.contacto.tiposReforma.forEach((t) => {
      const opt = document.createElement('option');
      opt.value = t.value;
      opt.textContent = t.label;
      select.appendChild(opt);
    });
  }

  function renderFooterLinks() {
    const serv = document.getElementById('footer-servicios');
    const emp = document.getElementById('footer-empresa');
    const legal = document.getElementById('footer-legal');
    const social = document.getElementById('footer-social');

    const linkHtml = (items) =>
      items.map((l) => `<a href="${l.enlace}">${l.texto}</a>`).join('');

    if (serv) serv.innerHTML = linkHtml(cfg.footer.servicios);
    if (emp) emp.innerHTML = linkHtml(cfg.footer.empresa);
    if (legal) legal.innerHTML = linkHtml(cfg.footer.legal);
    if (social) {
      social.innerHTML = cfg.footer.redes
        .map(
          (r) =>
            `<a href="${r.enlace}" aria-label="${r.nombre}" target="_blank" rel="noopener noreferrer">${ICONS[r.red] || ICONS.google}</a>`
        )
        .join('');
    }
  }

  function applySiteMeta() {
    document.title = cfg.seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', cfg.seo.description);

    document.querySelectorAll('[data-site="nombre"]').forEach((el) => {
      setText(el, cfg.empresa.nombre);
    });
    document.querySelectorAll('[data-site="tagline"]').forEach((el) => {
      setText(el, cfg.empresa.tagline);
    });
    document.querySelectorAll('[data-site="copyright"]').forEach((el) => {
      setText(
        el,
        `© ${cfg.empresa.copyrightYear} ${cfg.empresa.nombre}. Excelencia en construcción y reformas en ${cfg.empresa.ciudad}.`
      );
    });

    const phoneLinks = document.querySelectorAll('[data-site="telefono"]');
    phoneLinks.forEach((el) => {
      el.href = cfg.empresa.telefonoHref;
      const display = el.querySelector('[data-site="telefono-texto"]');
      if (display) setText(display, cfg.empresa.telefono);
      else if (el.tagName === 'A' && !el.querySelector('svg')) setText(el, cfg.empresa.telefono);
    });

    const contactPhone = document.getElementById('contact-phone-display');
    if (contactPhone) setText(contactPhone, cfg.empresa.telefonoDisplay);

    const contactEmail = document.getElementById('contact-email-display');
    const contactEmailLink = document.getElementById('contact-email-link');
    if (contactEmail) setText(contactEmail, cfg.empresa.email);
    if (contactEmailLink) contactEmailLink.href = cfg.empresa.emailHref;

    const heroImg = document.getElementById('hero-img');
    if (heroImg) {
      heroImg.src = cfg.hero.imagen;
      heroImg.alt = cfg.hero.imagenAlt;
    }
    setText(document.getElementById('hero-title'), cfg.hero.titulo, true);
    setText(document.getElementById('hero-subtitle'), cfg.hero.subtitulo);

    const heroCta1 = document.getElementById('hero-cta-primary');
    const heroCta2 = document.getElementById('hero-cta-secondary');
    if (heroCta1) {
      heroCta1.textContent = cfg.hero.ctaPrincipal.texto;
      heroCta1.href = cfg.hero.ctaPrincipal.enlace;
    }
    if (heroCta2) {
      heroCta2.textContent = cfg.hero.ctaSecundario.texto;
      heroCta2.href = cfg.hero.ctaSecundario.enlace;
    }

    setText(document.getElementById('contact-title'), cfg.contacto.titulo, true);
    setText(document.getElementById('contact-desc'), cfg.contacto.descripcion);

    const submitBtn = document.getElementById('form-submit-btn');
    if (submitBtn) submitBtn.textContent = cfg.contacto.formulario.botonEnviar;

    const chatBtn = document.getElementById('chat-btn');
    if (chatBtn && cfg.whatsapp.activo) {
      const msg = encodeURIComponent(cfg.whatsapp.mensaje);
      chatBtn.href = `https://wa.me/${cfg.whatsapp.numero}?text=${msg}`;
      chatBtn.setAttribute('aria-label', 'Contactar por WhatsApp');
      chatBtn.removeAttribute('role');
    } else if (chatBtn) {
      chatBtn.style.display = 'none';
    }
  }

  function boot() {
    renderNav(document.getElementById('main-nav'), cfg.navegacion, 'inicio');
    renderNav(document.getElementById('mobile-nav-links'), cfg.navegacion);
    renderStats();
    renderServices();
    renderProjects();
    renderProcess();
    renderReformOptions();
    renderFooterLinks();
    applySiteMeta();
    document.dispatchEvent(new CustomEvent('site:rendered'));
  }

  function scheduleBoot() {
    const run = () => setTimeout(boot, 0);
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run);
    } else {
      run();
    }
  }
  scheduleBoot();
})();
