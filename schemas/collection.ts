import {defineField, defineType} from 'sanity'

export const collection = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'season',
      title: 'Season',
      type: 'string',
      description: 'Regional season for this collection',
      options: {
        list: [
          {title: 'Harmattan', value: 'harmattan'},
          {title: 'Dry Season', value: 'dry-season'},
          {title: 'Rainy Season', value: 'rainy-season'},
          {title: 'Festive', value: 'festive'},
          {title: 'Bridal', value: 'bridal'},
          {title: 'Resort', value: 'resort'},
        ],
      },
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'heroImages',
      title: 'Hero Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'lookbookImages',
      title: 'Lookbook Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'active',
      title: 'Active (Show on Homepage)',
      type: 'boolean',
      initialValue: true,
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
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'season',
      media: 'heroImages.0',
    },
  },
})
