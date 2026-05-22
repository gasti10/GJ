# Prompt — Sitio Personal: Gastón Jouglard

## Contexto general

Construí el sitio personal de **Gastón Jouglard**, Full Stack Developer de Argentina con 5+ años de experiencia. El sitio reemplaza su versión actual (gjouglard.com.ar), que es un CV minimalista hecho con Jekyll. El nuevo sitio debe ser su carta de presentación profesional orientada a **networking**, no a conseguir clientes freelance.

El diseño de referencia visual es **Akio Portfolio Template** (https://akiotemplate.framer.website/): tipografía grande y bold, layout editorial con grid asimétrico, modo claro/oscuro, micro-interacciones suaves, scroll fluido y personalidad visual fuerte. No copies el template — inspirate en él.

**Repositorio:** nuevo repo (carpeta `GJ`). No reutilizar `GJ-minimal-resume`.

---

## Stack técnico

- **Framework**: Next.js 16 (App Router) — versión LTS estable al momento de crear el proyecto. Usar la misma versión en todo el stack (no mezclar referencias a otras versiones).
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Internacionalización (i18n)**: `next-intl`
- **Tipografía**: Google Fonts (elegí una pareja de fuentes con personalidad — una display bold para títulos, una legible para cuerpo. Evitá Inter, Roboto, Arial y Space Grotesk)
- **Tema**: Light/Dark mode con next-themes
- **Analytics**: Vercel Analytics (sin cookies invasivas)
- **Deploy target**: Vercel — SSR/SSG híbrido con middleware de i18n. **No** usar `output: 'export'` (incompatible con middleware y detección de locale).

---

## Estrategia de dominio y migración

| Decisión | Valor |
|----------|-------|
| Repo | Nuevo repo en carpeta `GJ` |
| Dominio producción | `gjouglard.com.ar` |
| DNS → Vercel | **Todavía no** — deploy inicial en URL de preview de Vercel |
| Redirecciones 301 | Desde la URL vieja de GitHub Pages/Jekyll (`https://gjouglard.com.ar/`) hacia el nuevo sitio cuando se migre el DNS. Solo la raíz `/` — no hay sub-rutas legacy |
| Canonical URL | `https://gjouglard.com.ar` en todos los locales |

---

## Estructura de páginas y secciones

### `/` — Home (una sola página con scroll)

#### 1. Navbar
- Logo / nombre: `GJ` o `Gastón Jouglard`
- Links: Works, About, Contact (con anchors `#works`, `#about`, `#contact`)
- Toggle light/dark mode
- Selector de idioma (`ES · EN · PT`)
- Sticky, con blur backdrop al hacer scroll

#### 2. Hero
- **Título (H1):**
  > Convierto problemas complejos en software que la gente usa.
- **Subtítulo (ES):**
  > Soy Gastón Jouglard, Desarrollador Full Stack. Trabajo en todo el stack porque creo que las mejores soluciones nacen de entender el sistema completo — no solo la parte que te toca.
- **Subtítulo (EN/PT):** mantener "Full Stack Developer" para SEO internacional.
- **Stack tags** (pequeños chips o etiquetas — máximo 6, ordenados por relevancia):
  React · Next.js · TypeScript · Supabase · PostgreSQL · Node.js
- **CTAs**:
  - Primario: "Ver proyectos" (scroll a `#works`)
  - Secundarios: "LinkedIn" (https://www.linkedin.com/in/gastonjouglard) + "GitHub" (https://github.com/gasti10)
- Elemento visual de impacto: podés usar texto grande en loop/marquee, tipografía oversized, o un elemento gráfico abstracto. Que sea memorable.

#### 3. Works (id="works")
Tres proyectos en cards o layout editorial. Para cada uno:

**Proyecto 1 — Cladding Creations**
- Slug: `cladding`
- Descripción: App y sitio web de gestión de producción para una empresa de manufactura de aluminio en Gold Coast, Australia. Digitalizó el seguimiento de paneles, inventario y procesos internos. Resultado: reducción de errores, aumento de producción y mejora en la calidad del producto final.
- URL: https://claddingcreations.com.au
- Tags: React · Next.js · Supabase · PostgreSQL

**Proyecto 2 — Antarpply Expeditions**
- Slug: `antarpply`
- Descripción: Plataforma web y backend para la gestión de expediciones antárticas. Incluye catálogo de viajes, sistema de reservas y gestión de servicios operativos de cada expedición.
- URL: https://antarpplyexpeditions.com
- Tags: Next.js · TypeScript · Backend

**Proyecto 3 — Wymaq**
- Slug: `wymaq`
- Descripción: Desarrollé features del core de Wymaq, plataforma SaaS de digitalización y gestión de maquinaria pesada (alquiler, mantenimiento, combustible). Operan en Argentina, Chile y Perú.
- URL: https://wymaq.com
- Tags: SaaS · Full Stack · TypeScript

**Imágenes de proyectos (v1):**
- Placeholders con gradiente sólido + nombre del proyecto encima
- Preparar estructura para reemplazar por screenshots reales después
- `next/image` con lazy loading y formatos WebP/AVIF

Las cards deben mostrar: imagen/placeholder, nombre del proyecto, descripción breve (2 líneas), tags de tecnología, y link al sitio.

#### 4. Experience (id="experience") — timeline compacta
Líneas editoriales minimalistas, sin barras de progreso ni diseño de CV tradicional:

- `2022–2024 · Cladding Creations, Gold Coast · Full Stack`
- `2020–2022 · Wymaq · Full Stack Developer`
- `Proyecto · Antarpply Expeditions · Web Platform`

#### 5. About (id="about")
- **Foto:** imagen circular o cuadrada con bordes suaves, tamaño modesto (~80–120px), al lado o encima del texto. Humaniza el perfil para networking en LinkedIn. Archivo en `/public/images/gaston.jpg` (placeholder aceptable en v1).
- Texto humano y directo:
  > Soy Ingeniero en Sistemas de Argentina. Llevo más de 5 años desarrollando software — desde interfaces hasta infraestructura. Viví y trabajé en Australia, lo que me dio perspectiva global y experiencia trabajando en equipos distribuidos. Me muevo cómodo en React, Next.js, Supabase y PostgreSQL, pero lo que más me importa es entender el problema antes de elegir la herramienta.
- Links: GitHub (https://github.com/gasti10) · LinkedIn (https://www.linkedin.com/in/gastonjouglard) · Instagram (https://www.instagram.com/gastonjou)

#### 6. Contact / Footer (id="contact")
- Texto: `¿Tenés algo en mente? Hablemos.`
- Email: `gastonjouglard.10@gmail.com` — visible, clickeable con `mailto:gastonjouglard.10@gmail.com`
- Links sociales: GitHub, LinkedIn, Instagram
- Año dinámico: `© {new Date().getFullYear()} Gastón Jouglard`

---

## Diseño y estilo

- **Paleta**: Definí una paleta con máximo 3 colores base + 1 acento. Debe funcionar en modo claro y oscuro. Evitá el azul genérico de portafolios de devs.
- **Tipografía**: Bold y oversized en los títulos. Limpia y legible en el cuerpo. Debe tener carácter.
- **Layout**: Asimétrico, con jerarquía visual clara. Podés romper la grilla en el hero o en las cards de proyectos.
- **Animaciones** (Framer Motion):
  - Fade + slide up al entrar cada sección al viewport
  - Hover en las cards de proyectos (leve escala o cambio de borde)
  - Transición suave entre light/dark mode
  - Texto marquee o rotativo en el hero (opcional pero recomendado)
- **Cursor personalizado** (opcional): solo desktop, desactivado con `prefers-reduced-motion`

---

## SEO y compartir en redes

Crítico para networking — cuando alguien comparte el link en LinkedIn debe verse profesional.

### Metadata por locale
Implementar en `layout.tsx` de `[locale]` con `generateMetadata`:

| Locale | Title | Description |
|--------|-------|-------------|
| `es` | Gastón Jouglard — Desarrollador Full Stack | Convierto problemas complejos en software que la gente usa. Desarrollador Full Stack de Argentina con experiencia internacional. |
| `en` | Gastón Jouglard — Full Stack Developer | I build software people actually use. Full Stack Developer from Argentina with international experience. |
| `pt` | Gastón Jouglard — Full Stack Developer | Transformo problemas complexos em software que as pessoas usam. Full Stack Developer da Argentina com experiência internacional. |

### Open Graph + Twitter Cards
- `og:title`, `og:description`, `og:url`, `og:locale` por idioma
- `og:image`: `/public/og-image.png` — 1200×630px, diseño con nombre + rol + paleta del sitio
- `twitter:card`: `summary_large_image`

### Favicon e iconos
- `favicon.ico` + `apple-touch-icon.png` (180×180) en `/public`

### Sitemap y robots
- `app/sitemap.ts` — generar entradas para `/es`, `/en`, `/pt`
- `app/robots.ts` — allow all, apuntar sitemap a `https://gjouglard.com.ar/sitemap.xml`

### hreflang
En cada página, incluir alternates:
```html
<link rel="alternate" hreflang="es" href="https://gjouglard.com.ar/es" />
<link rel="alternate" hreflang="en" href="https://gjouglard.com.ar/en" />
<link rel="alternate" hreflang="pt" href="https://gjouglard.com.ar/pt" />
<link rel="alternate" hreflang="x-default" href="https://gjouglard.com.ar/es" />
```

### Canonical
- `<link rel="canonical" href="https://gjouglard.com.ar/{locale}" />`

---

## Internacionalización (i18n)

El sitio debe estar disponible en **3 idiomas**: Español (es), Inglés (en) y Portugués (pt).

### Librería
Usá **`next-intl`** con el App Router de **Next.js 16**. Seguí su patrón oficial de rutas con locale en el path:
- `/es` → Español (default)
- `/en` → Inglés
- `/pt` → Portugués

### Selector de idioma
- Ubicado en la Navbar, junto al toggle de tema
- Mostrar como códigos de idioma (`ES · EN · PT`)
- **Al cambiar idioma, preservar la sección activa vía hash:** los links del switcher deben apuntar a `/{locale}#works`, `/{locale}#about`, etc., según el hash actual en la URL. Si no hay hash, ir a `/{locale}` sin scroll forzado.

### Estructura de carpetas con i18n
```
/app
  /[locale]
    layout.tsx          ← generateMetadata por locale
    page.tsx
  sitemap.ts
  robots.ts
/components
  Navbar.tsx
  Hero.tsx
  Works.tsx
  Experience.tsx
  About.tsx
  Contact.tsx
  ThemeToggle.tsx
  LocaleSwitcher.tsx
/messages
  es.json
  en.json
  pt.json
/lib
  projects.ts           ← datos estáticos de proyectos
  experience.ts         ← datos estáticos de timeline
/i18n.ts
/middleware.ts
/public
  /images
    gaston.jpg          ← foto About (placeholder ok en v1)
  og-image.png          ← 1200×630
  favicon.ico
  apple-touch-icon.png
```

### Estructura de `projects.ts`
Datos estáticos separados de los textos traducibles:

```ts
export type Project = {
  slug: 'cladding' | 'antarpply' | 'wymaq';
  url: string;
  tags: string[];
  gradient: string; // clases Tailwind para placeholder, ej. 'from-emerald-500 to-teal-700'
};

export const projects: Project[] = [
  {
    slug: 'cladding',
    url: 'https://claddingcreations.com.au',
    tags: ['React', 'Next.js', 'Supabase', 'PostgreSQL'],
    gradient: 'from-slate-700 to-zinc-900',
  },
  {
    slug: 'antarpply',
    url: 'https://antarpplyexpeditions.com',
    tags: ['Next.js', 'TypeScript', 'Backend'],
    gradient: 'from-blue-900 to-indigo-800',
  },
  {
    slug: 'wymaq',
    url: 'https://wymaq.com',
    tags: ['SaaS', 'Full Stack', 'TypeScript'],
    gradient: 'from-amber-600 to-orange-800',
  },
];

// En componentes: projects.map(p => t(`works.${p.slug}.description`))
// Nombre del proyecto: t(`works.${p.slug}.name`)
```

### Estructura de `experience.ts`
```ts
export type ExperienceEntry = {
  id: string;
  period: string;       // '2022–2024' — no traducir
  translationKey: string; // clave en messages, ej. 'experience.cladding'
};

export const experience: ExperienceEntry[] = [
  { id: 'cladding', period: '2022–2024', translationKey: 'experience.cladding' },
  { id: 'wymaq', period: '2020–2022', translationKey: 'experience.wymaq' },
  { id: 'antarpply', period: '', translationKey: 'experience.antarpply' },
];
```

### Archivos de traducción

**`/messages/es.json`**
```json
{
  "metadata": {
    "title": "Gastón Jouglard — Desarrollador Full Stack",
    "description": "Convierto problemas complejos en software que la gente usa. Desarrollador Full Stack de Argentina con experiencia internacional.",
    "keywords": "desarrollador full stack, react, next.js, typescript, argentina, software"
  },
  "nav": {
    "works": "Proyectos",
    "about": "Sobre mí",
    "contact": "Contacto"
  },
  "hero": {
    "headline": "Convierto problemas complejos en software que la gente usa.",
    "subheadline": "Soy Gastón Jouglard, Desarrollador Full Stack. Trabajo en todo el stack porque creo que las mejores soluciones nacen de entender el sistema completo — no solo la parte que te toca.",
    "cta_works": "Ver proyectos",
    "cta_linkedin": "LinkedIn",
    "cta_github": "GitHub"
  },
  "works": {
    "title": "Proyectos destacados",
    "cladding": {
      "name": "Cladding Creations",
      "description": "App y sitio web de gestión de producción para una empresa de manufactura de aluminio en Gold Coast, Australia. Digitalizó el seguimiento de paneles, inventario y procesos internos."
    },
    "antarpply": {
      "name": "Antarpply Expeditions",
      "description": "Plataforma web y backend para la gestión de expediciones antárticas. Incluye catálogo de viajes, sistema de reservas y gestión de servicios operativos."
    },
    "wymaq": {
      "name": "Wymaq",
      "description": "Desarrollé features del core de Wymaq, plataforma SaaS de digitalización y gestión de maquinaria pesada. Operan en Argentina, Chile y Perú."
    }
  },
  "experience": {
    "title": "Experiencia",
    "cladding": "Cladding Creations, Gold Coast · Full Stack",
    "wymaq": "Wymaq · Full Stack Developer",
    "antarpply": "Antarpply Expeditions · Web Platform"
  },
  "about": {
    "title": "Sobre mí",
    "body": "Soy Ingeniero en Sistemas de Argentina. Llevo más de 5 años desarrollando software — desde interfaces hasta infraestructura. Viví y trabajé en Australia, lo que me dio perspectiva global y experiencia trabajando en equipos distribuidos. Me muevo cómodo en React, Next.js, Supabase y PostgreSQL, pero lo que más me importa es entender el problema antes de elegir la herramienta.",
    "photo_alt": "Foto de Gastón Jouglard"
  },
  "contact": {
    "title": "¿Tenés algo en mente?",
    "subtitle": "Hablemos.",
    "email_label": "Escribime",
    "email": "gastonjouglard.10@gmail.com"
  },
  "footer": {
    "copyright": "© {year} Gastón Jouglard"
  },
  "a11y": {
    "theme_toggle": "Cambiar tema claro/oscuro",
    "locale_switcher": "Cambiar idioma",
    "skip_to_content": "Saltar al contenido"
  }
}
```

**`/messages/en.json`**
```json
{
  "metadata": {
    "title": "Gastón Jouglard — Full Stack Developer",
    "description": "I build software people actually use. Full Stack Developer from Argentina with international experience.",
    "keywords": "full stack developer, react, next.js, typescript, argentina, software"
  },
  "nav": {
    "works": "Works",
    "about": "About",
    "contact": "Contact"
  },
  "hero": {
    "headline": "I turn complex problems into software people actually use.",
    "subheadline": "I'm Gastón Jouglard, Full Stack Developer. I work across the entire stack because I believe the best solutions come from understanding the whole system — not just your piece of it.",
    "cta_works": "See projects",
    "cta_linkedin": "LinkedIn",
    "cta_github": "GitHub"
  },
  "works": {
    "title": "Selected Works",
    "cladding": {
      "name": "Cladding Creations",
      "description": "Production management app and website for an aluminium manufacturing company in Gold Coast, Australia. Digitized panel tracking, inventory, and internal processes."
    },
    "antarpply": {
      "name": "Antarpply Expeditions",
      "description": "Web platform and backend for managing Antarctic expeditions. Includes trip catalog, booking system, and operational service management."
    },
    "wymaq": {
      "name": "Wymaq",
      "description": "Built core features for Wymaq, a SaaS platform for digitizing and managing heavy machinery. Operates in Argentina, Chile, and Peru."
    }
  },
  "experience": {
    "title": "Experience",
    "cladding": "Cladding Creations, Gold Coast · Full Stack",
    "wymaq": "Wymaq · Full Stack Developer",
    "antarpply": "Antarpply Expeditions · Web Platform"
  },
  "about": {
    "title": "About me",
    "body": "I'm a Systems Engineer from Argentina with 5+ years building software — from interfaces to infrastructure. I lived and worked in Australia, which gave me a global perspective and experience in distributed teams. I'm comfortable with React, Next.js, Supabase and PostgreSQL, but what matters most to me is understanding the problem before picking the tool.",
    "photo_alt": "Photo of Gastón Jouglard"
  },
  "contact": {
    "title": "Got something in mind?",
    "subtitle": "Let's talk.",
    "email_label": "Send me an email",
    "email": "gastonjouglard.10@gmail.com"
  },
  "footer": {
    "copyright": "© {year} Gastón Jouglard"
  },
  "a11y": {
    "theme_toggle": "Toggle light/dark theme",
    "locale_switcher": "Change language",
    "skip_to_content": "Skip to content"
  }
}
```

**`/messages/pt.json`**
```json
{
  "metadata": {
    "title": "Gastón Jouglard — Full Stack Developer",
    "description": "Transformo problemas complexos em software que as pessoas usam. Full Stack Developer da Argentina com experiência internacional.",
    "keywords": "full stack developer, react, next.js, typescript, argentina, software"
  },
  "nav": {
    "works": "Projetos",
    "about": "Sobre mim",
    "contact": "Contato"
  },
  "hero": {
    "headline": "Transformo problemas complexos em software que as pessoas usam.",
    "subheadline": "Sou Gastón Jouglard, Full Stack Developer. Trabalho em toda a stack porque acredito que as melhores soluções nascem de entender o sistema completo — não só a sua parte.",
    "cta_works": "Ver projetos",
    "cta_linkedin": "LinkedIn",
    "cta_github": "GitHub"
  },
  "works": {
    "title": "Projetos em destaque",
    "cladding": {
      "name": "Cladding Creations",
      "description": "App e site de gestão de produção para uma empresa de manufatura de alumínio em Gold Coast, Austrália. Digitalizou o rastreamento de painéis, estoque e processos internos."
    },
    "antarpply": {
      "name": "Antarpply Expeditions",
      "description": "Plataforma web e backend para gestão de expedições antárticas. Inclui catálogo de viagens, sistema de reservas e gestão de serviços operacionais."
    },
    "wymaq": {
      "name": "Wymaq",
      "description": "Desenvolvi features do core da Wymaq, plataforma SaaS de digitalização e gestão de maquinário pesado. Atuam na Argentina, Chile e Peru."
    }
  },
  "experience": {
    "title": "Experiência",
    "cladding": "Cladding Creations, Gold Coast · Full Stack",
    "wymaq": "Wymaq · Full Stack Developer",
    "antarpply": "Antarpply Expeditions · Web Platform"
  },
  "about": {
    "title": "Sobre mim",
    "body": "Sou Engenheiro de Sistemas da Argentina. Tenho mais de 5 anos desenvolvendo software — de interfaces até infraestrutura. Morei e trabalhei na Austrália, o que me deu uma perspectiva global e experiência em times distribuídos. Trabalho bem com React, Next.js, Supabase e PostgreSQL, mas o que mais importa para mim é entender o problema antes de escolher a ferramenta.",
    "photo_alt": "Foto de Gastón Jouglard"
  },
  "contact": {
    "title": "Tem algo em mente?",
    "subtitle": "Vamos conversar.",
    "email_label": "Me manda um e-mail",
    "email": "gastonjouglard.10@gmail.com"
  },
  "footer": {
    "copyright": "© {year} Gastón Jouglard"
  },
  "a11y": {
    "theme_toggle": "Alternar tema claro/escuro",
    "locale_switcher": "Mudar idioma",
    "skip_to_content": "Pular para o conteúdo"
  }
}
```

### Configuración de next-intl
Usá el siguiente `middleware.ts` para redirigir automáticamente al locale correcto según el idioma del navegador:
```ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['es', 'en', 'pt'],
  defaultLocale: 'es',
  localeDetection: true
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
```

---

## Accesibilidad (a11y)

- Contraste mínimo **WCAG AA** en modo claro y oscuro
- Navegación por teclado completa en navbar, cards de proyectos y CTAs
- `aria-label` en toggles de tema e idioma (textos desde `messages.a11y`)
- Link "Saltar al contenido" visible al foco (`skip to content`)
- Imágenes con `alt` descriptivo
- Animaciones respetan `prefers-reduced-motion`
- Cursor personalizado (si se implementa): solo desktop, off con `prefers-reduced-motion`

---

## Performance

Targets concretos:

| Métrica | Target |
|---------|--------|
| Lighthouse Performance | ≥ 90 |
| LCP | < 2.5s |
| CLS | ≈ 0 (sin layout shift en animaciones) |

Implementación:
- `next/font` para fuentes (zero layout shift)
- `next/image` con lazy loading, WebP/AVIF, `sizes` correctos
- Framer Motion: animar `transform` y `opacity` solamente (no `width`/`height`)
- Code splitting automático de Next.js — evitar imports pesados en client components

---

## Consideraciones técnicas

- Usá `next/font` para cargar las tipografías de Google Fonts
- El toggle de tema debe persistir en `localStorage` vía `next-themes`
- El locale seleccionado debe persistir vía cookie manejada por `next-intl`
- Las animaciones deben respetar `prefers-reduced-motion`
- Mobile-first: el sitio tiene que verse y funcionar perfecto en celular
- **Todos los textos del sitio deben venir de `/messages/*.json` — cero strings hardcodeados en los componentes**
- Contacto vía `mailto:` directo — sin formulario en v1
- Vercel Analytics: instalar `@vercel/analytics` en el root layout
- La estructura de carpetas ya está definida en la sección de i18n — seguila

---

## Lo que NO querés

- Diseño corporativo o de CV tradicional
- Paleta azul/blanco genérica de portafolios de devs
- Tipografías sin personalidad (Inter, Roboto, Arial)
- Layout simétrico y aburrido de 3 cards iguales en una fila
- Animaciones exageradas que distraigan del contenido
- Secciones de "skills" con barras de progreso (anticuado)
- `output: 'export'` — incompatible con middleware de i18n

---

## Resultado esperado

Un sitio de una sola página, fast, con fuerte identidad visual, que en 5 segundos comunique quién es Gastón y qué hace — y que a quien lo visite le queden ganas de conectar. Optimizado para compartir en LinkedIn con preview rica (OG image), accesible, performante, y listo para migrar a `gjouglard.com.ar` cuando el DNS apunte a Vercel.
