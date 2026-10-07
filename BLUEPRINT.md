# Energy Tools Hub - Technical Blueprint

## Tech Stack & Dependencies
- **Framework:** Next.js (App Router, v14/15 based on `react` 19.x)
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/postcss`)
- **Testing:** Vitest
- **Key Dependencies:**
  - `next`, `react`, `react-dom`
  - No CMS or external component libraries are currently used.

## Project Directory Structure
A simplified overview of the project structure focusing on the main architectural components:

```text
/
├── app/                  # Next.js App Router root
│   ├── about/            # Static informational page
│   ├── battery-tools/    # Category page for battery calculators
│   ├── contact/          # Static informational page
│   ├── disclaimer/       # Static informational page
│   ├── electrical-tools/ # Category page for electrical calculators
│   ├── generator-tools/  # Category page for generator calculators
│   ├── privacy/          # Static informational page
│   ├── solar-tools/      # Category page for solar calculators
│   ├── terms/            # Static informational page
│   ├── tools/            # All tools directory and dynamic routes
│   │   ├── [slug]/       # Dynamic route for individual calculator pages
│   │   └── page.tsx      # All tools index
│   ├── layout.tsx        # Global layout & metadata
│   └── page.tsx          # Homepage
├── components/           # React components
│   ├── BatteryCalculatorContent.tsx
│   ├── BreadcrumbJsonLd.tsx
│   ├── CalculatorClient.tsx  # Main interactive calculator client
│   ├── CategoryPage.tsx
│   ├── ElectricalCalculatorContent.tsx
│   ├── GeneratorCalculatorContent.tsx
│   ├── GeneratorSizeCalculator.tsx
│   ├── GoogleAnalytics.tsx
│   ├── Header.tsx
│   └── WattsToAmpsContent.tsx
├── data/                 # Static data (e.g., appliances.ts)
├── lib/                  # Utility functions and shared logic
│   ├── calculations.ts   # Core math/logic for calculators
│   ├── site.ts           # Site configuration
│   └── tools.ts          # Tool definitions and categories
└── public/               # Static assets (SVGs, icons, etc.)
```

## Routing Strategy
The application utilizes the Next.js App Router for all routing:
- **Static Site Generation (SSG):** Almost all pages (`app/page.tsx`, `app/tools/[slug]/page.tsx`, category pages) are implemented as React Server Components (RSCs). This allows them to be statically generated at build time for optimal performance.
- **Client-Side Rendering (CSR):** Client-side interactivity is pushed down the component tree. Components requiring state or user interaction, specifically the calculators, are marked with `"use client"` (e.g., `CalculatorClient.tsx`).

## Calculator Architecture
- **State Management:** Calculators are driven by `CalculatorClient.tsx` (a Client Component). It maintains local state for the calculator's inputs.
- **Execution:** When inputs are changed or a calculation is triggered, the client component references shared logic residing in `lib/calculations.ts`. The inputs are passed to pure mathematical functions, and the results are updated in the component's state to reflect on the UI immediately.
- **Modularity:** The layout and form rendering for specific types of calculators are handled by specialized content components (e.g., `GeneratorCalculatorContent.tsx`, `BatteryCalculatorContent.tsx`), keeping `CalculatorClient` focused on state and the content components focused on display.

## SEO & Metadata Strategy
- **Global Metadata:** Base metadata (e.g., title templates, Open Graph defaults) is defined in the root layout (`app/layout.tsx`).
- **Dynamic Metadata:** Individual tool pages (`app/tools/[slug]/page.tsx`) utilize `generateMetadata` to dynamically inject SEO-optimized titles and descriptions based on the specific tool being viewed.
- **JSON-LD Schema:**
  - **Implemented:** `BreadcrumbJsonLd.tsx` is currently used to inject BreadcrumbList schema for better navigational context in search engines.
  - **Missing (Action Required):** The application is currently missing `WebApplication` and `FAQPage` JSON-LD schemas on the calculator pages, which should be added in future updates to enhance rich snippets.

## Analytics Integration
- **Implementation:** Google Analytics (GA4) is integrated via the `GoogleAnalytics.tsx` component, which uses `next/script` to load the GA4 scripts.
- **Initialization:** It initializes using the `NEXT_PUBLIC_GA_ID` environment variable.
- **Missing (Action Required):** Currently, there is no custom event tracking implemented. Future enhancements should include tracking specific user interactions, such as clicking a 'Calculate' button or viewing a calculation result.

## Hosting & Configurations
- **Hosting Platform:** Deployed on Vercel.
- **Environment Variables:** Relies on `NEXT_PUBLIC_SITE_URL` for determining the canonical origin in production.
- **Configurations:**
  - The `next.config.mjs` file is currently mostly empty.
  - There is no `vercel.json` file.
  - **Missing (Action Required):** There are currently no redirects or rewrites configured. These will need to be added to `next.config.mjs` or Vercel settings when migrating to a custom domain.
