import { defineField, defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
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
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'number',
      description: '1 = Main (e.g. Womenswear), 2 = Sub-section, 3 = Tag',
      options: {
        list: [
          { title: 'Main Category', value: 1 },
          { title: 'Sub-section', value: 2 },
          { title: 'Tag (Sub-sub-section)', value: 3 },
        ],
      },
      validation: (rule) => rule.required().min(1).max(3),
      initialValue: 1,
    }),
    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Leave empty for main categories. For sub-sections, pick the main category. For tags, pick the sub-section.',
      options: {
        filter: ({ document }) => {
          const level = (document as { level?: number }).level
          if (level === 2) return { filter: 'level == 1' }
          if (level === 3) return { filter: 'level == 2' }
          return { filter: 'level < 1' } // main categories can't have parents
        },
      },
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional image for this category (used on the shop page)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first',
    }),
  ],
  orderings: [
    {
      title: 'Level, then Order',
      name: 'levelOrder',
      by: [
        { field: 'level', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      level: 'level',
      parentTitle: 'parent.title',
      media: 'image',
    },
    prepare({ title, level, parentTitle, media }) {
      const levelLabels: Record<number, string> = { 1: '●', 2: '├─', 3: '│  └─' }
      return {
        title: `${levelLabels[level as number] || ''} ${title}`,
        subtitle: parentTitle ? `↳ ${parentTitle}` : level === 1 ? 'Main Category' : '',
        media,
      }
    },
  },
})
