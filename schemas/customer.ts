import {defineField, defineType} from 'sanity'

export const customer = defineType({
  name: 'customer',
  title: 'Customer',
  type: 'document',
  fields: [
    defineField({
      name: 'firebaseUid',
      title: 'Firebase UID',
      type: 'string',
      description: 'Unique identifier from Firebase Auth',
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
    }),
    defineField({
      name: 'photoURL',
      title: 'Photo URL',
      type: 'url',
    }),
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'state',
      title: 'State / Province',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
    defineField({
      name: 'wishlist',
      title: 'Wishlist',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'productId', type: 'string', title: 'Product ID'},
            {name: 'name', type: 'string', title: 'Name'},
            {name: 'slug', type: 'string', title: 'Slug'},
            {name: 'price', type: 'number', title: 'Price'},
            {name: 'image', type: 'string', title: 'Image URL'},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'displayName', subtitle: 'email'},
  },
})
