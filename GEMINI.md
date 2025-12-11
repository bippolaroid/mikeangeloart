# GEMINI.md

## Project Overview

This is a portfolio website built with [SolidStart](https://start.solidjs.com/), a framework for the [SolidJS](https://www.solidjs.com/) UI library. The project uses [Tailwind CSS](https://tailwindcss.com/) for styling and [three.js](https://threejs.org/) for 3D graphics. The application is configured to be deployed to [Cloudflare Workers](https://workers.cloudflare.com/).

The website features a 3D logo, a video background, and a portfolio section. The portfolio data is stored in `src/db.json`. The main page is `src/routes/index.tsx`, which includes a contact form that submits to `web3forms`.

## Building and Running

### Development

To start the development server, run:

```bash
npm run dev
```

This will start a development server on `localhost:3000`.

### Building

To build the project for production, run:

```bash
npm run build
```

This will create a production build in the `dist` directory.

### Running

To run the production build, run:

```bash
npm run start
```

### Cloudflare Workers

The project can be previewed and deployed to Cloudflare Workers using the following commands:

**Preview:**

```bash
npm run preview
```

**Deploy:**

```bash
npm run deploy
```

## Development Conventions

*   **File-based Routing:** The project uses file-based routing, with routes defined in the `src/routes` directory.
*   **Components:** Reusable components are located in the `src/components` directory.
*   **Layout:** The main layout is defined in `src/app.tsx`, with layout components in `src/layout`.
*   **Styling:** The project uses Tailwind CSS for styling. Utility classes are used directly in the JSX.
*   **3D:** 3D scenes are managed by the `SceneManager` class in `src/components/Panel3d.tsx`.
*   **Data:** Portfolio data is stored in `src/db.json`.
