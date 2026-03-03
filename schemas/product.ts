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
      validation: (rule) => rule.required(),
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
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required().positive(),
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
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'images.0',
    },
  },
})
