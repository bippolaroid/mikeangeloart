# Project Overview

This is a portfolio website for a design technologist named Mike. It showcases his projects and skills in a visually appealing and interactive way.

## Technologies Used

*   **Framework:** [SolidJS](https://www.solidjs.com/) with [SolidStart](https://start.solidjs.com/)
*   **Bundler:** [Vinxi](https://vinxi.dev/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **3D Graphics:** [Three.js](https://threejs.org/)
*   **Deployment:** [Cloudflare Workers](https://workers.cloudflare.com/)

## Architecture

The application is a single-page application (SPA) with file-based routing. The main application component is in `src/app.tsx`, and the routes are defined in the `src/routes` directory. The project data is stored in a JSON file at `src/db.json`. Individual project pages are dynamically generated using the `src/routes/projects/[slug].tsx` file.

# Building and Running

## Development

To run the project in development mode, use the following command:

```bash
bun run dev
```

## Build

To build the project for production, use the following command:

```bash
bun run build
```

## Preview

To preview the production build locally, use the following command:

```bash
bun run preview
```

## Deployment

To deploy the project to Cloudflare Workers, use the following command:

```bash
bun run deploy
```

# Development Conventions

*   The project uses TypeScript.
*   The project uses file-based routing.
*   The project data is stored in a JSON file.
*   The project uses Tailwind CSS for styling.
*   The project uses Three.js for 3D graphics.
