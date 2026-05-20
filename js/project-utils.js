/**
 * Utilidades compartidas para tarjetas de proyectos (inicio + galería).
 */
(function (global) {
  const ICON_LOCATION =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>';

  function getFeaturedProjects(items, limit) {
    if (!items?.length) return [];
    const featured = items.filter((p) => p.destacado !== false);
    return featured.slice(0, limit ?? 3);
  }

  function getProjectImages(project) {
    if (project.imagenes?.length) return project.imagenes;
    return project.imagen ? [project.imagen] : [];
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function buildProjectCard(project, options) {
    const opts = options || {};
    const extraClass = opts.extraClass || '';
    const dataAttrs = opts.dataAttrs || '';
    const tag = opts.clickable ? 'button' : 'div';
    const typeAttr = opts.clickable ? ' type="button"' : '';
    const desc = project.descripcion
      ? `<p class="project-card-desc">${escapeHtml(project.descripcion)}</p>`
      : '';

    return `
      <${tag} class="project-card reveal ${extraClass}"${typeAttr} ${dataAttrs}>
        <div class="project-card-img">
          <img src="${escapeHtml(project.imagen)}" alt="${escapeHtml(project.imagenAlt || project.titulo)}" loading="lazy">
          <div class="project-card-overlay"><span>Ver fotos</span></div>
        </div>
        <div class="project-card-info">
          <h3>${escapeHtml(project.titulo)}</h3>
          <div class="location">${ICON_LOCATION} ${escapeHtml(project.ubicacion)}</div>
          ${desc}
        </div>
      </${tag}>`;
  }

  global.ProjectUtils = {
    ICON_LOCATION,
    getFeaturedProjects,
    getProjectImages,
    buildProjectCard,
    escapeHtml,
  };
})(window);
