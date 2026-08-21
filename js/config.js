/**
 * CONFIGURACIÓN DE LA WEB — Reformas N&N Valencia
 * ================================================
 * Edita este archivo para cambiar textos, teléfonos, servicios,
 * proyectos y enlaces sin tocar el HTML ni el CSS.
 */
const SITE_CONFIG = {
  empresa: {
    nombre: 'Reformas N&N',
    ciudad: 'Valencia',
    tagline: 'Excelencia en construcción y reformas integrales en Valencia. Diseñamos espacios, construimos hogares.',
    telefono: '+34 619 45 34 12',
    telefonoHref: 'tel:+34619453412',
    telefonoDisplay: '619 45 34 12',
    email: 'Reformasnyn@hotmail.com',
    emailHref: 'mailto:Reformasnyn@hotmail.com',
    copyrightYear: new Date().getFullYear(),
  },

  seo: {
    title: 'Reformas N&N Valencia — Reformas Integrales de Calidad',
    description:
      'Especialistas en reformas integrales en Valencia. Transformamos tu hogar con calidad, garantía y materiales de primera. Presupuesto gratuito en 48h.',
  },

  navegacion: [
    { id: 'inicio', label: 'Inicio' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'proceso', label: 'Proceso' },
    { id: 'contacto', label: 'Contacto' },
  ],

  hero: {
    titulo: 'Reformamos tu hogar<br>con calidad y garantía',
    subtitulo:
      'Especialistas en reformas integrales en Valencia. Transformamos espacios con precisión arquitectónica y materiales de primera calidad. Presupuesto gratuito en 48h.',
    imagen: 'images/hero.png',
    imagenAlt: 'Reforma integral de vivienda en Valencia',
    ctaPrincipal: { texto: 'Solicitar presupuesto', enlace: '#contacto' },
    ctaSecundario: { texto: 'Ver nuestros proyectos', enlace: '#proyectos' },
  },

  estadisticas: [
    { texto: '+10 años de experiencia', animarNumero: 10 },
    { texto: '+200 proyectos completados', animarNumero: 200 },
    { texto: 'Presupuesto en 48h sin compromiso', animarNumero: null },
    { texto: 'Garantía de calidad', animarNumero: null },
  ],

  servicios: {
    titulo: '¿En qué podemos ayudarte?',
    items: [
      {
        titulo: 'Reforma Integral',
        descripcion: 'Transformación completa de viviendas y locales comerciales con gestión integral.',
        icono: 'integral',
      },
      {
        titulo: 'Reforma de Baño',
        descripcion: 'Modernización de baños con diseños funcionales y acabados premium.',
        icono: 'bano',
      },
      {
        titulo: 'Reforma de Cocina',
        descripcion: 'Cocinas a medida que combinan estética contemporánea y alta funcionalidad.',
        icono: 'cocina',
      },
      {
        titulo: 'Pintura y Acabados',
        descripcion: 'Trabajos de pintura interior/exterior y alisado de paredes con resultados impecables.',
        icono: 'pintura',
      },
      {
        titulo: 'Albañilería General',
        descripcion: 'Estructuras, tabiques y demoliciones ejecutadas por profesionales cualificados.',
        icono: 'albanileria',
      },
      {
        titulo: 'Instalaciones',
        descripcion: 'Renovación completa de fontanería, electricidad y climatización certificada.',
        icono: 'instalaciones',
      },
    ],
  },

  proyectos: {
    titulo: 'Nuestros últimos proyectos',
    boton: {
      texto: 'Ver todos los proyectos',
      enlace: 'proyectos.html',
      nuevaPestana: true,
    },
    galeria: {
      titulo: 'Galería de proyectos',
      subtitulo:
        'Reformas integrales, baños y cocinas realizadas en Valencia y provincia. Haz clic en un proyecto para ver las fotos.',
      seoTitle: 'Proyectos — Reformas N&N Valencia',
      seoDescription:
        'Galería de reformas integrales, baños y cocinas en Valencia. Trabajos realizados por Reformas N&N.',
    },
    /* Filtros de la galería (categoria debe coincidir con items[].categoria) */
    categorias: [
      { id: 'todos', label: 'Todos' },
      { id: 'integral', label: 'Integrales' },
      { id: 'bano', label: 'Baños' },
      { id: 'cocina', label: 'Cocinas' },
      { id: 'otro', label: 'Otros' },
    ],
    /*
     * AÑADE TUS PROYECTOS AQUÍ (copia un bloque y cambia datos + imagen)
     * destacado: true → aparece en la página de inicio (máx. 3)
     * imagenes: [] → fotos extra en el visor al hacer clic
     */
    items: [
      {
        id: 'integral-liria-1',
        titulo: 'Reforma Integral',
        ubicacion: 'Llíria',
        categoria: 'integral',
        imagen: 'images/gallery_1.jpg',
        imagenAlt: 'Reforma integral en Llíria',
        descripcion: 'Renovación completa de vivienda con acabados de calidad.',
        destacado: true,
        imagenes: ['images/gallery_1.jpg'],
      },
      {
        id: 'bano-liria-1',
        titulo: 'Reforma de Baño',
        ubicacion: 'Llíria',
        categoria: 'bano',
        imagen: 'images/gallery_3.jpg',
        imagenAlt: 'Reforma de baño en Llíria',
        descripcion: 'Optimización del espacio con materiales resistentes y plato de ducha con mampara.',
        destacado: true,
        imagenes: ['images/gallery_3.jpg',
                  'images/gallery_2.jpg',
                  ],
      },
      /* Ejemplo: descomenta y añade tu foto en images/gallery_4.jpg
      {
        id: 'cocina-benisano-1',
        titulo: 'Reforma de Cocina',
        ubicacion: 'Valencia',
        categoria: 'cocina',
        imagen: 'images/gallery_4.jpg',
        imagenAlt: 'Cocina reformada en Valencia',
        descripcion: 'Cocina abierta con isla central.',
        destacado: true,
        imagenes: ['images/gallery_4.jpg'],
      },
      */
    {
        id: 'cocina-benisano-1',
        titulo: 'Reforma de Cocina',
        ubicacion: 'Valencia',
        categoria: 'cocina',
        imagen: 'images/gallery_4.jpg',
        imagenAlt: 'Cocina reformada en Valencia',
        descripcion: 'Cocina abierta con isla central.',
        destacado: true,
        imagenes: ['images/gallery_4.jpg'],
      },
            {
        id: 'paellero-liria-1',
        titulo: 'Reforma de Paellero',
        ubicacion: 'Llíria',
        categoria: 'otro',
        imagen: 'images/gallery_5.jpg',
        imagenAlt: 'Zona de paellero en Lliria',
        descripcion: 'Paellero completamente reformado en Llíria.',
        destacado: true,
        imagenes: ['images/gallery_5.jpg'],
      },
    ],
  },


  proceso: {
    titulo: 'Nuestro proceso',
    subtitulo: 'De la idea a la realidad en 4 sencillos pasos',
    pasos: [
      { titulo: 'Contacto', descripcion: 'Cuéntanos tu proyecto y te asesoramos sin compromiso.' },
      { titulo: 'Presupuesto', descripcion: 'Visita gratuita y presupuesto detallado en 48 horas.' },
      { titulo: 'Ejecución', descripcion: 'Realizamos la reforma con profesionales cualificados.' },
      { titulo: 'Entrega', descripcion: 'Te entregamos tu espacio renovado con total garantía.' },
    ],
  },

  contacto: {
    titulo: '¿Listo para<br>transformar tu hogar?',
    descripcion:
      'Rellena el formulario y nuestro equipo de expertos se pondrá en contacto contigo en menos de 48 horas para organizar una visita gratuita y sin compromiso.',
    tiposReforma: [
      { value: 'integral', label: 'Reforma Integral' },
      { value: 'bano', label: 'Reforma de Baño' },
      { value: 'cocina', label: 'Reforma de Cocina' },
      { value: 'pintura', label: 'Pintura y Acabados' },
      { value: 'albanileria', label: 'Albañilería General' },
      { value: 'instalaciones', label: 'Instalaciones' },
      { value: 'otro', label: 'Otro' },
    ],
    formulario: {
      /*
       * ENVÍO AL CORREO (funciona al publicar la web)
       * Por defecto usa empresa.email vía FormSubmit (gratis).
       * La primera vez debes activar el enlace que llega a ese correo.
       *
       * Opcional (más estable): regístrate en https://web3forms.com,
       * copia tu Access Key y pégala en web3formsAccessKey.
       */
      emailDestino: 'Reformasnyn@hotmail.com', // FormSubmit envía aquí
      web3formsAccessKey: '',
      formspreeEndpoint: '', // ej: https://formspree.io/f/xxxxxx
      asuntoEmail: 'Nuevo presupuesto — Reformas N&N Valencia',
      mensajeEnviando: 'Enviando solicitud…',
      mensajeExito: '✓ Solicitud enviada. Te contactaremos en menos de 48 horas.',
      mensajeError:
        'No se pudo enviar. Activa FormSubmit en Reformasnyn@hotmail.com (ver COMO-ACTIVAR-FORMSUBMIT.txt) o llámanos al 619 45 34 12.',
      botonEnviar: 'Quiero mi presupuesto gratuito',
    },
  },

  footer: {
    servicios: [
      { texto: 'Reformas Integrales', enlace: '#servicios' },
      { texto: 'Reformas de Baños', enlace: '#servicios' },
      { texto: 'Reformas de Cocinas', enlace: '#servicios' },
      { texto: 'Pintura y Acabados', enlace: '#servicios' },
    ],
    empresa: [
      { texto: 'Sobre Nosotros', enlace: '#' },
      { texto: 'Proyectos', enlace: 'proyectos.html' },
      { texto: 'Presupuesto', enlace: '#contacto' },
      { texto: 'Contacto', enlace: '#contacto' },
    ],
    legal: [
      { texto: 'Aviso Legal', enlace: '#' },
      { texto: 'Política de Privacidad', enlace: '#' },
      { texto: 'Cookies', enlace: '#' },
    ],
    redes: [
      { nombre: 'Instagram', enlace: '#', red: 'instagram' },
      { nombre: 'Facebook', enlace: '#', red: 'facebook' },
      { nombre: 'Google', enlace: '#', red: 'google' },
    ],
  },

  whatsapp: {
    /* Número sin + ni espacios, ej: 34619453412 */
    numero: '34619453412',
    mensaje: 'Hola, me gustaría solicitar información sobre una reforma.',
    activo: true,
  },
};
