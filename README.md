# gj-portfolio

Sitio personal de Gastón Jouglard — Full Stack Developer.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS 4
- Framer Motion
- next-intl (ES / EN / PT)
- next-themes (light / dark)
- Vercel Analytics

## Desarrollo

```bash
npm install
npm run dev
```

Abrí [http://localhost:4000](http://localhost:4000) — redirige automáticamente a `/es`, `/en` o `/pt` según el idioma del navegador.

## Build

```bash
npm run build
npm start
```

## Deploy

Pensado para Vercel. Conectá el repo y deployá con preview URL. Cuando el DNS de `gjouglard.com.ar` apunte a Vercel, configurá el dominio en el dashboard.

## Pendiente (v1.1)

- Reemplazar `/public/images/gaston.svg` por foto real (`gaston.jpg`)
- Screenshots reales de proyectos en lugar de placeholders con gradiente
- Migración DNS + redirect 301 desde GitHub Pages
