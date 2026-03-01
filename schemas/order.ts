import {defineField, defineType} from 'sanity'

export const order = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    defineField({
      name: 'reference',
      title: 'Order Reference',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: ['pending', 'awaiting_payment', 'success', 'failed', 'processing', 'shipped', 'delivered'],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: ['paystack', 'bank_transfer'],
      },
    }),
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
    }),
    defineField({
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'productId', title: 'Product ID', type: 'string'}),
            defineField({name: 'name', title: 'Product Name', type: 'string'}),
            defineField({name: 'price', title: 'Unit Price', type: 'number'}),
            defineField({name: 'quantity', title: 'Quantity', type: 'number'}),
            defineField({name: 'size', title: 'Size', type: 'string'}),
            defineField({name: 'image', title: 'Image URL', type: 'string'}),
          ],
        },
      ],
    }),
    defineField({
      name: 'subtotal',
      title: 'Subtotal',
      type: 'number',
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'NGN',
    }),
    defineField({
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'object',
      fields: [
        defineField({name: 'line1', title: 'Address Line 1', type: 'string'}),
        defineField({name: 'line2', title: 'Address Line 2', type: 'string'}),
        defineField({name: 'city', title: 'City', type: 'string'}),
        defineField({name: 'state', title: 'State / Province', type: 'string'}),
        defineField({name: 'country', title: 'Country', type: 'string'}),
        defineField({name: 'postalCode', title: 'Postal Code', type: 'string'}),
      ],
    }),
    defineField({
      name: 'paidAt',
      title: 'Paid At',
      type: 'datetime',
    }),
    defineField({
      name: 'shippingMethod',
      title: 'Shipping Method',
      type: 'object',
      fields: [
        defineField({name: 'name', title: 'Name', type: 'string'}),
        defineField({name: 'price', title: 'Price', type: 'number'}),
        defineField({name: 'estimatedDays', title: 'Estimated Days', type: 'string'}),
      ],
    }),
    defineField({
      name: 'note',
      title: 'Customer Note',
      type: 'text',
      description: 'Optional note from the customer to the merchant',
    }),
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'createdAtDesc',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
  ],
})
