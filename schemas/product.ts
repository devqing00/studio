import {defineField, defineType} from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Leave blank for fabric variants — they are named automatically from their tag.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Main Category',
      type: 'reference',
      to: [{type: 'category'}],
      options: {
        filter: 'level == 1',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subcategory',
      title: 'Sub-section',
      type: 'reference',
      to: [{type: 'category'}],
      options: {
        filter: 'level == 2',
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags (Sub-sub-sections)',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
      description: 'Level 3 category tags for this product',
    }),
    defineField({
      name: 'priceType',
      title: 'Price Type',
      type: 'string',
      options: {
        list: [
          {title: 'Single (fixed price)', value: 'single'},
          {title: 'Range (min – max)', value: 'range'},
        ],
      },
      initialValue: 'single',
      description: 'Single = one fixed price. Range = customer pays within a min–max bandwidth set by admin.',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Fixed price when Price Type is Single, or the minimum price when Range.',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'priceMax',
      title: 'Maximum Price',
      type: 'number',
      description: 'Only used when Price Type is Range. The upper end of the price bandwidth.',
      hidden: ({document}) => document?.priceType !== 'range',
      validation: (rule) =>
        rule.custom((value, context) => {
          const doc = context.document as {priceType?: string; price?: number}
          if (doc?.priceType === 'range') {
            if (!value) return 'Maximum price is required for range pricing'
            if (doc.price && value <= doc.price) return 'Must be greater than the minimum price'
          }
          return true
        }),
    }),
    defineField({
      name: 'comparePrice',
      title: 'Compare-at Price',
      type: 'number',
      description: 'Original price before discount. Leave empty if not on sale.',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Product detail bullet points',
    }),
    defineField({
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Available sizes e.g. XS, S, M, L, XL',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'},
        ],
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isFabricVariant',
      title: 'Fabric Variant',
      type: 'boolean',
      description: 'Enable for images in the Fabrics category. Pricing, unit, and description come from the tag.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'images.0',
    },
  },
})
