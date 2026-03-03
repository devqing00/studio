import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    // ── Payment & Shipping ──
    defineField({
      name: 'activePaymentMethods',
      title: 'Active Payment Methods',
      type: 'array',
      description: 'Which payment methods are available to customers at checkout',
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
    // ── Lookbook ──
    defineField({
      name: 'lookbookTitle',
      title: 'Lookbook Title',
      type: 'string',
      description: 'Main heading, e.g. "The Edit"',
    }),
    defineField({
      name: 'lookbookSubtitle',
      title: 'Lookbook Subtitle (italic)',
      type: 'string',
      description: 'Displayed in italics after the title',
    }),
    defineField({
      name: 'lookbookDescription',
      title: 'Lookbook Description',
      type: 'text',
      description: 'Short paragraph beneath the heading',
    }),
    defineField({
      name: 'lookbookImages',
      title: 'Lookbook Images',
      type: 'array',
      description: 'Editorial images displayed in the lookbook grid',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
            defineField({name: 'caption', title: 'Caption', type: 'string'}),
          ],
          preview: {
            select: {title: 'caption', media: 'image'},
            prepare({title, media}: {title: string; media: unknown}) {
              return {title: title || 'Untitled', media}
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
