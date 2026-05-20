/**
 * Interactividad: menú, scroll, formulario y animaciones.
 * Los textos y listas se cargan desde js/config.js + js/render.js
 */
(function () {
  function init() {
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initReveal();
    initActiveNav();
    initStatsAnimation();
  }

  function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (!menuToggle || !mobileNav) return;

    const closeMenu = () => {
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      mobileNav.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  function initSmoothScroll() {
    const header = document.querySelector('.header');
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  function initReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }

  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
      });
    });
  }

  function initStatsAnimation() {
    const statsSection = document.querySelector('.stats-bar');
    if (!statsSection) return;

    let statsAnimated = false;
    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || statsAnimated) return;
        statsAnimated = true;

        document.querySelectorAll('.stat-value[data-animate]').forEach((stat) => {
          const target = parseInt(stat.getAttribute('data-animate'), 10);
          const text = stat.textContent;
          const match = text.match(/(\d+)/);
          if (!match) return;

          const prefix = text.substring(0, text.indexOf(match[0]));
          const suffix = text.substring(text.indexOf(match[0]) + match[0].length);
          let current = 0;
          const step = Math.max(1, Math.ceil(target / 40));

          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            stat.textContent = prefix + current + suffix;
          }, 30);
        });
      },
      { threshold: 0.5 }
    );

    statsObserver.observe(statsSection);
  }

  document.addEventListener('site:rendered', init, { once: true });
})();
