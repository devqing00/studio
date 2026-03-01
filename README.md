# JANES — Sanity Studio

Sanity v3 content studio for the JANES fashion e-commerce platform. Manages products, collections, orders, site settings, and contact messages.

**Live Studio:** [https://janes.sanity.studio](https://janes.sanity.studio)

---

## Sanity Project Details

| Property | Value |
|---|---|
| Project ID | `o2vehhtt` |
| Dataset | `production` |
| Studio URL | `https://janes.sanity.studio` |
| App ID | `ic482wgrl6zu84oeal043sf9` |

---

## Getting Started

```bash
npm install
npm run dev
```

Opens the studio at [http://localhost:3333](http://localhost:3333).

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local studio server |
| `npm run build` | Build studio for deployment |
| `npm run deploy` | Deploy to Sanity-hosted URL |

---

## Schema Overview

| Schema | Description |
|---|---|
| `product` | Fashion products — name, slug, price, images, sizes, collection, featured flag |
| `collection` | Product collections / categories — name, slug, image |
| `order` | Customer orders — items, delivery, payment status, reference, payment method |
| `siteSettings` | Global settings — social links, payment method toggles, bank accounts |
| `contactMessage` | Inbound contact form submissions — name, email, message, read status |

---

## Schema Conventions

- Use `defineField` and `defineType` from `sanity` for all schema definitions
- Field groups are used in `product` and `siteSettings` for better UX in the studio
- Slugs should always use `source: "name"` or `source: "title"`
- Images should use the `image` type with `hotspot: true`

---

## Relation to Frontend

The frontend (`frontend/`) has a mirrored copy of these schemas in `frontend/src/sanity/schemas/` as plain TypeScript objects (without `defineField`/`defineType`). When you update a schema here, update the corresponding file in the frontend too.

The frontend reads data using GROQ queries via `@sanity/client`. The studio writes data that the frontend consumes.

---

## Deployment

```bash
npm run deploy
```

Deploys to `https://janes.sanity.studio` using the app ID configured in `sanity.cli.ts`.
