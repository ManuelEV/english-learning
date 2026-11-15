# NextStop English

Plataforma interactiva para aprender y practicar inglés de **B1 a C1**, pensada para hispanohablantes.
El currículo es un mapa de metro: cada nivel es una línea y cada tema, una estación.

- **Aprende** — lecciones paso a paso con líneas de tiempo animadas, estructuras por bloques, comparaciones, ejemplos con audio y la trampa típica del español.
- **Practica** — 8 tipos de ejercicio (elegir, completar, ordenar, cazar el error, unir, clasificar, dictado y transformar) con corrección inmediata y explicada.
- **Repara** — los errores van al *Taller* y vuelven con repaso espaciado (1, 3, 7 y 16 días). El *Viaje exprés* mezcla temas ya vistos.

| Línea | Nivel | Estaciones |
| --- | --- | --- |
| Coral | B1 | 8 |
| Turquesa | B2 | 9 |
| Violeta | C1 | 5 |
| Ñ | Trampas para hispanohablantes | 3 |

25 estaciones · 300 ejercicios. El progreso se guarda en `localStorage`; no hay backend.

## Desarrollo

```bash
npm install
npm run dev        # servidor local
npm run validate   # revisa la coherencia de todo el contenido
npm run build      # typecheck + validate + build a dist/
```

Stack: React 19, Vite 8, TypeScript 7, Tailwind CSS 4, Motion, React Router 8, Zustand.

## Desplegar en Cloudflare Pages

**Con Git (recomendado):** en el panel de Cloudflare → Workers & Pages → Create → Pages → conecta el repositorio.

- Build command: `npm run build`
- Build output directory: `dist`
- Variable de entorno: `NODE_VERSION=22` (o superior)

**Desde la terminal:**

```bash
npx wrangler login
npm run deploy
```

Las rutas (`/u/…`, `/taller`) funcionan sin configuración extra: Pages sirve `index.html` como SPA cuando no existe un `404.html`.

## Agregar contenido

Cada estación es un archivo en `src/content/units/` que exporta un `Unit` (esquema en `src/content/types.ts`).
Para publicarla, agrega su `id` a la línea correspondiente en `src/content/index.ts` y ejecuta `npm run validate`.
