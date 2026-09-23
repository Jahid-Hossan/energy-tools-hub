# Energy Tools Hub

Energy Tools Hub is a fast, US-focused utility site with free calculators for generator sizing, electrical conversions, energy use and cost, and battery planning. Calculators run without accounts and keep their assumptions visible.

## Local development

Requirements:

- Node.js 20+
- npm

Install dependencies:

```bash
npm install
```

Create a local environment file when you want to override the default local URL:

```bash
copy .env.example .env.local
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000.

## Environment variables

| Variable               | Purpose                                                                      | Local default                          |
| ---------------------- | ---------------------------------------------------------------------------- | -------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin used by metadata, sitemap, robots, and structured data | `http://localhost:3000` in development |

Before a production build or deployment, set `NEXT_PUBLIC_SITE_URL` to the real HTTPS domain. The production fallback is a documented placeholder, not a launch domain.

`.env.example` is safe to commit. Do not commit `.env`, `.env.local`, or other secret environment files.

## Quality checks

```bash
npm test
npm run lint
npm run build
```

The production build uses Webpack because this Windows development environment may not have compatible native Turbopack bindings.

## GitHub

Before pushing:

1. Confirm `.env.example` is tracked and real `.env*` files are ignored.
2. Run the quality checks above.
3. Review the diff for secrets, generated files, and local-only changes.
4. Push the repository to GitHub without committing `node_modules`, `.next`, or local environment files.

## Vercel deployment

1. Import the GitHub repository into Vercel.
2. Use the detected Next.js framework settings and the repository's npm scripts.
3. Add `NEXT_PUBLIC_SITE_URL` in Vercel Project Settings for the production environment, using the final HTTPS domain.
4. Deploy only after the domain, contact information, privacy/legal copy, and production environment variables have been reviewed.
5. Verify the deployed homepage, category routes, calculator routes, `/sitemap.xml`, and `/robots.txt`.

No database, authentication, real advertising code, or affiliate links are required for the current application.
