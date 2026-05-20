/**
 * Página galería de proyectos (proyectos.html)
 */
(function () {
  const cfg = typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG : null;
  const utils = window.ProjectUtils;
  if (!cfg || !utils) return;

  const galeria = cfg.proyectos.galeria || {};
  const items = cfg.proyectos.items || [];
  const categorias = cfg.proyectos.categorias || [{ id: 'todos', label: 'Todos' }];

  let filtroActivo = 'todos';
  let lightboxImages = [];
  let lightboxIndex = 0;
  let lightboxProject = null;

  function applyMeta() {
    document.title = galeria.seoTitle || `Proyectos — ${cfg.empresa.nombre}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && galeria.seoDescription) meta.setAttribute('content', galeria.seoDescription);

    document.querySelectorAll('[data-site="nombre"]').forEach((el) => {
      el.textContent = cfg.empresa.nombre;
    });
    const copy = document.querySelector('[data-site="copyright"]');
    if (copy) {
      copy.textContent = `© ${cfg.empresa.copyrightYear} ${cfg.empresa.nombre}. Excelencia en construcción y reformas en ${cfg.empresa.ciudad}.`;
    }

    const title = document.getElementById('gallery-title');
    const subtitle = document.getElementById('gallery-subtitle');
    if (title) title.textContent = galeria.titulo || 'Galería de proyectos';
    if (subtitle) subtitle.textContent = galeria.subtitulo || '';
  }

  function renderFilters() {
    const wrap = document.getElementById('gallery-filters');
    if (!wrap) return;

    wrap.innerHTML = categorias
      .map(
        (cat) =>
          `<button type="button" class="gallery-filter${cat.id === filtroActivo ? ' is-active' : ''}" data-filter="${cat.id}" role="tab" aria-selected="${cat.id === filtroActivo}">${utils.escapeHtml(cat.label)}</button>`
      )
      .join('');

    wrap.querySelectorAll('.gallery-filter').forEach((btn) => {
      btn.addEventListener('click', () => {
        filtroActivo = btn.getAttribute('data-filter');
        renderFilters();
        renderGrid();
      });
    });
  }

  function getFilteredItems() {
    if (filtroActivo === 'todos') return items;
    return items.filter((p) => p.categoria === filtroActivo);
  }

  function renderGrid() {
    const grid = document.getElementById('gallery-grid');
    const empty = document.getElementById('gallery-empty');
    if (!grid) return;

    const filtered = getFilteredItems();
    if (empty) empty.hidden = filtered.length > 0;

    grid.innerHTML = filtered
      .map((p, i) =>
        utils.buildProjectCard(p, {
          clickable: true,
          extraClass: 'project-card--gallery',
          dataAttrs: `data-project-index="${i}" data-project-id="${utils.escapeHtml(p.id || '')}"`,
        })
      )
      .join('');

    grid.querySelectorAll('.project-card--gallery').forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-project-id');
        const project = filtered.find((p) => p.id === id) || filtered[Number(card.getAttribute('data-project-index'))];
        if (project) openLightbox(project);
      });
    });

    initReveal(grid);
  }

  function initReveal(container) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    (container || document).querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }

  function openLightbox(project) {
    lightboxProject = project;
    lightboxImages = utils.getProjectImages(project);
    lightboxIndex = 0;
    updateLightbox();
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.hidden = false;
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.hidden = true;
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const img = document.getElementById('lightbox-img');
    const title = document.getElementById('lightbox-title');
    const loc = document.getElementById('lightbox-location');
    const desc = document.getElementById('lightbox-desc');
    const counter = document.getElementById('lightbox-counter');
    const prev = document.getElementById('lightbox-prev');
    const next = document.getElementById('lightbox-next');

    if (!lightboxProject || !lightboxImages.length) return;

    const src = lightboxImages[lightboxIndex];
    if (img) {
      img.src = src;
      img.alt = lightboxProject.imagenAlt || lightboxProject.titulo;
    }
    if (title) title.textContent = lightboxProject.titulo;
    if (loc) loc.textContent = lightboxProject.ubicacion;
    if (desc) {
      desc.textContent = lightboxProject.descripcion || '';
      desc.hidden = !lightboxProject.descripcion;
    }
    if (counter) {
      counter.textContent =
        lightboxImages.length > 1 ? `${lightboxIndex + 1} / ${lightboxImages.length}` : '';
    }
    if (prev) prev.disabled = lightboxIndex <= 0;
    if (next) next.disabled = lightboxIndex >= lightboxImages.length - 1;
  }

  function initLightbox() {
    document.querySelectorAll('[data-close-lightbox]').forEach((el) => {
      el.addEventListener('click', closeLightbox);
    });

    document.getElementById('lightbox-prev')?.addEventListener('click', () => {
      if (lightboxIndex > 0) {
        lightboxIndex -= 1;
        updateLightbox();
      }
    });

    document.getElementById('lightbox-next')?.addEventListener('click', () => {
      if (lightboxIndex < lightboxImages.length - 1) {
        lightboxIndex += 1;
        updateLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      const lb = document.getElementById('lightbox');
      if (!lb || lb.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && lightboxIndex > 0) {
        lightboxIndex -= 1;
        updateLightbox();
      }
      if (e.key === 'ArrowRight' && lightboxIndex < lightboxImages.length - 1) {
        lightboxIndex += 1;
        updateLightbox();
      }
    });
  }

  function openFromHash() {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const project = items.find((p) => p.id === hash);
    if (project) openLightbox(project);
  }

  function boot() {
    applyMeta();
    renderFilters();
    renderGrid();
    initLightbox();
    openFromHash();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
