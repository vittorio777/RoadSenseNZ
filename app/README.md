# RoadSenseNZ Application

The React practice application. See the [project homepage](../README.md) for the demo, motivation, and project overview.

## Local Setup

Use Node.js 22.13+ within the Node 22 release line, or Node.js 24, with npm. The application's `.nvmrc` selects Node 22.

```sh
git clone https://github.com/vittorio777/RoadSenseNZ.git
cd RoadSenseNZ/app
npm ci
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`. Without a map key, the map shows a configuration message; use **Chapters** to practise.

This project uses npm for local development, CI, and deployment. Keep `package-lock.json` as the only dependency lockfile. Use `npm ci` for reproducible installs and `npm install` when adding or updating dependencies.

## Environment Variables

Copy `.env.example` to `.env.local` next to `package.json`, then set:

```dotenv
VITE_MAPTILER_KEY=your_maptiler_api_key
```

Vite reads the value from `.env.local` or the environment of the process running it. The map component accesses it through `import.meta.env.VITE_MAPTILER_KEY` and adds it to the MapTiler style request. The fallback name `VITE_MAPTILER_API_KEY` is used when the primary variable is not defined.

During a production build, Vite writes the value into the generated JavaScript. The browser then uses it to request map styles and tiles. On Vercel, configure the variable in the project's environment settings before building; a local `.env.local` file is not uploaded by Git. Restart the development server after local changes, or rebuild and deploy after changes to deployment variables.

Use a MapTiler browser-access key and allow your local and deployed origins. The key is visible to the browser; keeping `.env.local` out of Git protects the repository copy, but does not hide the key used by the website. See [Vite's environment variable documentation](https://vite.dev/guide/env-and-mode).

MapLibre and its worker are bundled locally. Map styles and tiles require internet access to MapTiler. Automated tests do not require a key.

## Commands

Run these commands from `app/`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Check TypeScript and build into `dist/`. |
| `npm run preview` | Preview an existing production build. |
| `npm test` | Run automated tests once. |
| `npm run test:watch` | Run tests while developing. |
| `npm run lint` | Check code with ESLint. |
| `npm run check` | Run lint, tests, and the production build. |

## Implementation

| Directory | Purpose |
| --- | --- |
| `src/components/` | Practice interface, map, player, and static visuals. |
| `src/content/` | Scenarios, reusable road templates, and content guide. |
| `src/contracts/` | TypeScript types for scenarios and visuals. |
| `src/engine/` | Animation calculations, Canvas drawing, and map runtime loading. |
| `src/config/` | Chapter labels and map regions. |
| `src/test/` | Shared test setup and map sanitization regression test. |
| `public/scenario-assets/` | Static question images. |
| `docs/` | Application architecture and testing documentation. |

Scenario files are bundled at build time. `PracticePage` manages selection, answers, and local persistence; `ScenarioPlayer` coordinates questions, feedback, and playback. The playback engine calculates frame states separately from Canvas drawing. Static questions use image and SVG overlays.

Read [Architecture](docs/ARCHITECTURE.md) for the data flow and limitations.

## Development Workflow

1. Install dependencies with `npm ci`.
2. Use `npm run dev` while editing; use `npm run test:watch` for behavioural changes.
3. Run `npm run check` before submitting changes.
4. Preview the production build with `npm run preview` and perform the [manual smoke test](docs/TESTING.md#manual-smoke-test), including real map and Canvas rendering.

GitHub Actions runs `npm ci` and `npm run check` for application changes on pushes and pull requests. Its working directory and npm cache path both use `app/`.

For new content, follow the [Scenario Content Guide](src/content/SCENARIO_GUIDE.md). Content tests discover new scenario files automatically.

## Deployment

The [live app](https://roadsense-nz.vercel.app/) is hosted on Vercel.

| Setting | Value |
| --- | --- |
| Root Directory | `app` |
| Framework | Vite |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Environment variable | `VITE_MAPTILER_KEY` |

**Directory migration:** when deploying this repository layout, change the existing Vercel project's Root Directory from its previous application directory to `app` before deploying. This account setting is managed outside the repository and is not changed by renaming the folder.

Set the key before building and allow the deployed origin in MapTiler. Vite embeds the value at build time. Generated files can also be served by a static host. Deployment triggers and Vercel account settings are configured outside this repository.

## Documentation

- [Project homepage](../README.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Testing](docs/TESTING.md)
- [Scenario/content guide](src/content/SCENARIO_GUIDE.md)
