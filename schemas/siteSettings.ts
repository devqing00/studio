import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    {name: 'general', title: 'General'},
    {name: 'hero', title: 'Hero Section'},
    {name: 'categories', title: 'Categories'},
    {name: 'editorial', title: 'Editorial Grid'},
    {name: 'parallax', title: 'Parallax'},
    {name: 'lookbook', title: 'Lookbook'},
    {name: 'contact', title: 'Contact & Social'},
  ],
  fields: [
    // ── General ──
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'tagline',
      title: 'Hero Tagline',
      type: 'text',
      description:
        'Main hero text, e.g. "Luxurious and Contemporary Apparel for Every Woman"',
      group: 'general',
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      options: {
        list: [
          {title: 'USD ($)', value: 'USD'},
          {title: 'EUR (€)', value: 'EUR'},
          {title: 'GBP (£)', value: 'GBP'},
          {title: 'NGN (₦)', value: 'NGN'},
        ],
      },
      initialValue: 'USD',
      group: 'general',
    }),
    defineField({
      name: 'shippingNote',
      title: 'Shipping Note',
      type: 'text',
      description: 'Displayed on product pages',
      group: 'general',
    }),

    // ── Hero Section ──
    defineField({
      name: 'heroImages',
      title: 'Hero Section Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      description: '3 images for the hero section (left, top-right, bottom-right)',
      group: 'hero',
    }),
    defineField({
      name: 'heroSeasonLabel',
      title: 'Hero Season Label',
      type: 'string',
      description: 'e.g. "SS 2026"',
      group: 'hero',
    }),
    defineField({
      name: 'heroCTAText',
      title: 'Hero CTA Button Text',
      type: 'string',
      description: 'e.g. "Explore Collection"',
      group: 'hero',
    }),

    // ── Categories Section ──
    defineField({
      name: 'categoryCards',
      title: 'Category Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'link',
              title: 'Link URL',
              type: 'string',
              description: 'e.g. "/shop?category=Womenswear"',
            }),
          ],
          preview: {
            select: {title: 'title', media: 'image'},
          },
        },
      ],
      group: 'categories',
    }),

    // ── Editorial Grid ──
    defineField({
      name: 'editorialItems',
      title: 'Editorial Grid Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({
              name: 'category',
              title: 'Category Label',
              type: 'string',
              description: 'e.g. "Editorial", "Trend Report"',
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'category', media: 'image'},
          },
        },
      ],
      description:
        '3 editorial items for the homepage grid (first is large, other two stack on the right)',
      group: 'editorial',
    }),

    // ── Parallax Section ──
    defineField({
      name: 'parallaxImage',
      title: 'Parallax Background Image',
      type: 'image',
      options: {hotspot: true},
      group: 'parallax',
    }),
    defineField({
      name: 'parallaxSubtitle',
      title: 'Parallax Subtitle',
      type: 'string',
      description: 'e.g. "Our Philosophy"',
      group: 'parallax',
    }),
    defineField({
      name: 'parallaxHeading',
      title: 'Parallax Heading',
      type: 'text',
      description: 'e.g. "Fashion that transcends the ordinary"',
      group: 'parallax',
    }),
    defineField({
      name: 'parallaxCTAText',
      title: 'Parallax CTA Text',
      type: 'string',
      description: 'e.g. "Our Story"',
      group: 'parallax',
    }),
    defineField({
      name: 'parallaxCTALink',
      title: 'Parallax CTA Link',
      type: 'string',
      description: 'e.g. "/about"',
      group: 'parallax',
    }),

    // ── Lookbook ──
    defineField({
      name: 'lookbookTitle',
      title: 'Lookbook Page Title',
      type: 'string',
      group: 'lookbook',
    }),
    defineField({
      name: 'lookbookSubtitle',
      title: 'Lookbook Italic Subtitle',
      type: 'string',
      description: 'e.g. "SS26"',
      group: 'lookbook',
    }),
    defineField({
      name: 'lookbookDescription',
      title: 'Lookbook Description',
      type: 'text',
      group: 'lookbook',
    }),
    defineField({
      name: 'lookbookImages',
      title: 'Lookbook Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({name: 'caption', title: 'Caption', type: 'string'}),
          ],
          preview: {
            select: {title: 'caption', media: 'image'},
          },
        },
      ],
      group: 'lookbook',
    }),

    // ── About ──
    defineField({
      name: 'aboutText',
      title: 'About Page Text',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Rich text content for the About page.',
      group: 'general',
    }),
    defineField({
      name: 'aboutImages',
      title: 'About Page Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      group: 'general',
    }),

    // ── Contact & Social ──
    defineField({
      name: 'instagramHandle',
      title: 'Instagram Handle',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'instagramImages',
      title: 'Instagram Section Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'phone',
      title: 'Contact Phone',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
      group: 'contact',
    }),
    defineField({
      name: 'activePaymentMethods',
      title: 'Active Payment Methods',
      type: 'array',
      description: 'Which payment methods are available to customers at checkout',
      group: 'general',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Paystack (Card / Bank / USSD)', value: 'paystack'},
          {title: 'Direct Bank Transfer', value: 'bank_transfer'},
        ],
      },
    }),
    defineField({
      name: 'bankAccounts',
      title: 'Bank Accounts',
      type: 'array',
      description: 'Bank account details shown to customers who choose direct transfer',
      group: 'general',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'bankName', title: 'Bank Name', type: 'string'}),
            defineField({name: 'accountName', title: 'Account Name', type: 'string'}),
            defineField({name: 'accountNumber', title: 'Account Number', type: 'string'}),
            defineField({name: 'sortCode', title: 'Sort Code / Routing Number', type: 'string'}),
          ],
          preview: {
            select: {title: 'bankName', subtitle: 'accountNumber'},
          },
        },
      ],
    }),
    defineField({
      name: 'shippingRates',
      title: 'Shipping Rates',
      type: 'array',
      description: 'Available shipping options shown to customers at checkout',
      group: 'general',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'string'}),
            defineField({name: 'price', title: 'Price', type: 'number'}),
            defineField({name: 'estimatedDays', title: 'Estimated Days', type: 'string'}),
          ],
          preview: {
            select: {title: 'name', subtitle: 'price'},
            prepare({title, subtitle}: {title: string; subtitle: number}) {
              return {title, subtitle: subtitle != null ? String(subtitle) : ''}
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
