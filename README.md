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

En `proyectos.items`:

```javascript
{
  titulo: 'Reforma de Cocina',
  ubicacion: 'Burjassot',
  imagen: 'images/gallery_4.jpg',
  imagenAlt: 'Cocina moderna reformada en Burjassot',
},
```

Sube la foto a `images/gallery_4.jpg`.

## Colores y tipografías

Edita las variables al inicio de `style.css`:

- `--color-primary` — Negro principal
- `--color-accent` — Dorado Valencia (#D4A017)

## Formulario → correo electrónico

El formulario **envía a `empresa.email`** (`quique-galvez@hotmail.com` por defecto) usando [FormSubmit](https://formsubmit.co) (gratis, sin servidor).

### Activación (solo una vez, antes de usar en producción)

1. Publica la web (ver abajo) o pruébala en local con `npx serve .`
2. Envía un formulario de prueba desde la web
3. Revisa **quique-galvez@hotmail.com** (y la carpeta **Spam**)
4. Abre el correo de FormSubmit y pulsa el enlace **Activate Form**
5. A partir de ahí, cada solicitud de presupuesto llegará a ese buzón

### Opcional: Web3Forms (recomendado si hay muchos envíos)

1. Entra en [web3forms.com](https://web3forms.com) con el mismo email
2. Copia tu **Access Key**
3. En `js/config.js`:

```javascript
web3formsAccessKey: 'tu-clave-aqui',
```

Si hay clave, se usa Web3Forms en lugar de FormSubmit.

## Publicar en internet (recomendado: Netlify)

**Netlify** es la opción más sencilla para esta web estática + formulario:

1. Ve a [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arrastra la carpeta completa del proyecto
3. Te dará una URL tipo `https://nombre-random.netlify.app`
4. Activa el formulario (pasos de arriba) con la URL ya publicada

Otras opciones válidas: **GitHub Pages**, **Cloudflare Pages**, o tu hosting por FTP (sube todos los archivos).

Dominio propio: en Netlify → Domain settings → añade `www.tudominio.com`.

## Imágenes

Ver `images/LEEME.txt`. Sin fotos, el hero usa un degradado de respaldo definido en CSS.

## Soporte técnico

Para cambios de diseño grandes (nuevas páginas, blog, panel admin), conviene migrar a WordPress o un generador como Astro. Esta base es ideal para una landing de captación de presupuestos.
