# Tandemly

Tandemly is a [Next.js](https://nextjs.org) project bootstrapped using [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Environment Variables](#environment-variables)
- [Learn More](#learn-more)
- [Deploy on Vercel](#deploy-on-vercel)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Project Structure

```
.
├── .env
├── .gitignore
├── drizzle.config.ts
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
├── public/
│   ├── cancelled.svg
│   ├── empty.svg
│   ├── file.svg
│   ├── globe.svg
│   ├── logo.svg
│   ├── next.svg
│   ├── processing.svg
│   ├── upcoming.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── constants.ts
│   ├── app/
│   ├── components/
│   ├── db/
│   ├── hooks/
│   ├── ingest/
│   ├── lib/
│   └── modules/
└── .next/
    ├── app-build-manifest.json
    ├── build-manifest.json
    ├── react-loadable-manifest.json
    ├── trace
    ├── cache/
    ├── server/
    ├── static/
    └── types/
```

- `public/`: Static assets such as SVG icons and images.  
- `src/`: Main source code, including components, modules, hooks, database logic, and utilities.  
- `.next/`: Build output (auto-generated, do not edit).  

## Available Scripts

- `npm run dev` – Start the development server  
- `npm run build` – Build the application for production  
- `npm start` – Start the production server  
- `npm run lint` – Run ESLint for code quality checks  

## Tech Stack

- **Framework**: Next.js 15.3.2  
- **Language**: TypeScript  
- **UI**: React 19, Tailwind CSS  
- **Markdown Rendering**: `react-markdown`  
- **Icons**: `lucide-react`, `react-icons`  
- **Forms**: `react-hook-form`  
- **Date Utilities**: `date-fns`  
- **Others**: `nanoid`, `zod`, `recharts`

## Features

- Modular component structure under `src/components` and `src/modules`
- Meeting management UI with Markdown-rendered completed states
- Custom avatars, badges, tabs, and scrollable UI areas
- Responsive and accessible UI using Tailwind CSS
- SVG icon support for various meeting states
- Type-safe forms and validation using `zod` and `react-hook-form`
- Utility functions for formatting and data handling

## Environment Variables

Create a `.env` file in the root directory to store environment-specific variables.

Example:

```
NEXT_PUBLIC_API_URL=https://your-api-url.com
DATABASE_URL=your_database_url
```

## Learn More

To learn more about Next.js, check out:

- [Next.js Documentation](https://nextjs.org/docs) – Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) – Interactive tutorial.
- [Next.js GitHub Repository](https://github.com/vercel/next.js)

## Deploy on Vercel

The easiest way to deploy your Next.js app is with [Vercel](https://vercel.com), the creators of Next.js.

Refer to the [Next.js Deployment Documentation](https://nextjs.org/docs/deployment) for more information.
