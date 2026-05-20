# Reformas N&N Valencia — Web corporativa

Sitio web estático para empresa de reformas en Valencia. Diseño premium (negro + dorado), responsive y fácil de modificar sin programar.

## Cómo ver la web en local

1. Abre la carpeta del proyecto.
2. Haz doble clic en `index.html`, o usa una extensión **Live Server** en VS Code / Cursor.
3. También puedes ejecutar en terminal:

```bash
npx serve .
```

## Estructura del proyecto

```
├── index.html          # Estructura de la página
├── style.css           # Estilos y colores (variables CSS al inicio)
├── script.js           # Menú, scroll, formulario, animaciones
├── js/
│   ├── config.js       ← EDITA AQUÍ textos, teléfono, servicios, proyectos
│   └── render.js       # Genera secciones desde config (no tocar salvo avanzado)
├── images/             # Fotos (hero.jpg, gallery_1.jpg, etc.)
└── DESIGN.md           # Guía de diseño original (Stitch)
```

## Cambios habituales (solo `js/config.js`)

| Qué cambiar | Dónde en config.js |
|-------------|-------------------|
| Nombre, teléfono, email | `empresa` |
| Título y descripción Google | `seo` |
| Texto del banner | `hero` |
| Servicios ofrecidos | `servicios.items` |
| Galería de obras | `proyectos.items` |
| Pasos del proceso | `proceso.pasos` |
| WhatsApp flotante | `whatsapp` |
| Enlaces redes sociales | `footer.redes` |

### Añadir un servicio nuevo

En `servicios.items`, copia un bloque y cambia título y descripción:

```javascript
{
  titulo: 'Suelos y Parquet',
  descripcion: 'Instalación de suelos laminados, parquet y porcelánico.',
  icono: 'integral', // integral | bano | cocina | pintura | albanileria | instalaciones
},
```

### Añadir un proyecto a la galería

En `js/config.js` → `proyectos.items`, copia un bloque:

```javascript
{
  id: 'cocina-valencia-2',
  titulo: 'Reforma de Cocina',
  ubicacion: 'Valencia',
  categoria: 'cocina',       // integral | bano | cocina | otro
  imagen: 'images/gallery_4.jpg',
  imagenAlt: 'Descripción de la foto',
  descripcion: 'Texto breve del proyecto.',
  destacado: false,          // true = aparece también en la página de inicio
  imagenes: ['images/gallery_4.jpg', 'images/gallery_4b.jpg'], // varias fotos
},
```

Sube las fotos a la carpeta `images/`. El botón **Ver todos los proyectos** abre `proyectos.html` en una pestaña nueva.

## Colores y tipografías

Edita las variables al inicio de `style.css`:

- `--color-primary` — Negro principal
- `--color-accent` — Dorado Valencia (#D4A017)

## Formulario → correo electrónico

El formulario envía a **Reformasnyn@hotmail.com** usando [FormSubmit](https://formsubmit.co) (gratis).

**Guía completa de activación:** lee `COMO-ACTIVAR-FORMSUBMIT.txt` en la raíz del proyecto.

### Activación (solo una vez — debes hacerlo tú)

1. Revisa **Reformasnyn@hotmail.com** (y **Spam**)
2. Busca un email de **FormSubmit** → asunto *Activate Form*
3. Pulsa el enlace **Activate Form**
4. Prueba el formulario en la web publicada (Vercel)
5. A partir de ahí, cada presupuesto llegará a ese buzón

### Opcional: Web3Forms (recomendado si hay muchos envíos)

1. Entra en [web3forms.com](https://web3forms.com) con el mismo email
2. Copia tu **Access Key**
3. En `js/config.js`:

```javascript
web3formsAccessKey: 'tu-clave-aqui',
```

Si hay clave, se usa Web3Forms en lugar de FormSubmit.

## Publicar en Vercel (recomendado)

Tu código ya está en GitHub: [github.com/nisansi/reformas_N-N](https://github.com/nisansi/reformas_N-N)

### Pasos

1. Entra en [vercel.com](https://vercel.com) e inicia sesión (con tu cuenta de **GitHub**).
2. Pulsa **Add New…** → **Project**.
3. Importa el repositorio **reformas_N-N** (si no aparece, autoriza a Vercel en GitHub).
4. Deja la configuración así:
   - **Framework Preset:** Other
   - **Build Command:** vacío (no hace falta compilar)
   - **Output Directory:** `.` o déjalo por defecto
5. Pulsa **Deploy**.
6. En 1–2 minutos tendrás una URL tipo `https://reformas-n-n.vercel.app`.

Cada vez que hagas `git push` a `main`, Vercel **actualizará la web sola**.

### Dominio propio

En el proyecto de Vercel → **Settings** → **Domains** → añade tu dominio (ej. `www.reformasnvalencia.com`) y sigue las instrucciones DNS.

### Activar el formulario

Tras el primer deploy, abre la URL de Vercel, envía un formulario de prueba y activa el correo de **FormSubmit** (ver sección anterior).

Otras opciones: **Netlify**, **GitHub Pages**, hosting por FTP.

## Imágenes

Ver `images/LEEME.txt`. Sin fotos, el hero usa un degradado de respaldo definido en CSS.

## Soporte técnico

Para cambios de diseño grandes (nuevas páginas, blog, panel admin), conviene migrar a WordPress o un generador como Astro. Esta base es ideal para una landing de captación de presupuestos.
