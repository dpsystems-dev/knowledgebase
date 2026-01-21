# DPSystems Knowledge Base

Documentation site for DPSystems products, built with [Docusaurus](https://docusaurus.io/).

## Development

```bash
npm install
npm run start
```

This starts a local development server at http://localhost:3000.

## Build

```bash
npm run build
```

Generates static content into the `build` directory.

## Deployment

The site is automatically deployed to GitHub Pages when pushing to the `master` branch via GitHub Actions.

Live site: https://dpsystems-dev.github.io/knowledgebase/

## Adding Products

To add a new product:

1. Create folder: `products/<product-name>/`
2. Add docs: `description.md`, subfolders for sections
3. Create sidebar: `sidebars<ProductName>.ts`
4. Add plugin to `docusaurus.config.ts`
5. Add navbar item
