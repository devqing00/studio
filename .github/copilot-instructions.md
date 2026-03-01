# GitHub Copilot Instructions — JANES Sanity Studio

## Project Overview
This is the Sanity v3 content studio for JANES, a luxury fashion e-commerce platform. It manages products, collections, orders, site settings, and contact messages.

## Project Details
- **Project ID:** `o2vehhtt`
- **Dataset:** `production`
- **Live URL:** `https://janes.sanity.studio`
- **App ID:** `ic482wgrl6zu84oeal043sf9`

## Schema Conventions

### Always use `defineField` and `defineType`
```typescript
import { defineField, defineType } from "sanity";

export const mySchema = defineType({
  name: "myType",
  title: "My Type",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
```

### Standard field patterns
- Slugs: `type: "slug"` with `source: "name"` or `source: "title"`
- Images: `type: "image"` with `options: { hotspot: true }`
- References: `type: "reference"`, `to: [{ type: "schemaName" }]`
- Arrays of blocks (rich text): `type: "array"`, `of: [{ type: "block" }]`

### Field groups
Use field groups for schemas with many fields (like `product` and `siteSettings`) to improve studio UX:
```typescript
defineType({
  groups: [
    { name: "details", title: "Details" },
    { name: "media", title: "Media" },
  ],
  fields: [
    defineField({ name: "title", ..., group: "details" }),
    defineField({ name: "image", ..., group: "media" }),
  ],
})
```

## Key Schemas

### `product`
Fields: `name`, `slug`, `price`, `comparePrice`, `description` (portable text), `images` (array), `sizes` (array of strings), `collection` (reference), `featured` (boolean), `inStock` (boolean).

### `collection`
Fields: `name`, `slug`, `image`, `description`.

### `order`
Fields: `reference`, `customerName`, `email`, `phone`, `deliveryAddress`, `items` (array), `subtotal`, `deliveryFee`, `total`, `status` (`pending` | `paid` | `awaiting_payment` | `processing` | `shipped` | `delivered` | `cancelled`), `paymentMethod` (`paystack` | `bank_transfer`), `paidAt`, `notes`.

### `siteSettings`
Fields: `socialLinks`, `paymentMethods` (object with `paystack` and `bankTransfer` booleans), `bankAccounts` (array of bank account objects).

### `contactMessage`
Fields: `name`, `email`, `subject`, `message`, `isRead` (boolean), `submittedAt` (datetime).

## Sync with Frontend
The frontend (`frontend/src/sanity/schemas/`) has mirrored copies of these schemas as plain TypeScript objects **without** `defineField`/`defineType`. When modifying a schema here, update the corresponding frontend schema file too.

## Adding a New Schema
1. Create `schemas/mySchema.ts` using `defineType`/`defineField`
2. Add to `schemas/index.ts` export array
3. Add corresponding plain-object version to `frontend/src/sanity/schemas/`
4. Update `frontend/src/sanity/schemas/index.ts`
