# Xingcheng Huang — personal portfolio

A React and TypeScript portfolio built with Vite. Motion handles transitions and micro-interactions, and React Router provides separate views in a single-page app. The content is in `src/content.ts`; the résumé is `public/xingcheng-huang-resume.pdf`.

The app uses hash-based routes such as `/#/work`, so views can be refreshed or shared on static hosts without server-side rewrite rules. Animations respect the visitor's reduced-motion setting.

## Local development

```bash
npm install
npm run dev
```

Run a type check and create the production build with `npm run build`. Preview the built site with `npm run preview`.

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and deploys the site to `https://xingchengh.github.io/Web/` when changes are pushed to `main`. In the repository settings, GitHub Pages must use **GitHub Actions** as its publishing source.

The default local build assumes the site is hosted at a domain root. To reproduce the GitHub Pages build locally, set the base path when building:

```bash
VITE_BASE_PATH=/Web/ npm run build
```

Update the résumé PDF in `public/` when a newer version is ready.
