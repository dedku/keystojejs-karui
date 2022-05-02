import { list } from '@keystone-6/core';
import {
    text,
    relationship,
    select,
  } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { isAdmin } from './newAssets';

export const Build = list({
    access:{
        operation:{
            delete: isAdmin
        }
    },
    fields: {
      title: text({ validation: { isRequired: true } }),
      class: relationship({
          ref:'Class.builds',
          ui: {
            hideCreate: true,
            linkToItem: true,
          },
          many: false
        }),
      slug: text({
        ui: { createView: { fieldMode: 'hidden' }, itemView: { fieldMode: 'hidden' } },
        isIndexed: 'unique',
        access:{
          update: isAdmin,
          read: isAdmin
        }
      }),
      skill: text({ validation: { isRequired: true } }),
      patch: text({ validation: { isRequired: true } }),
      status: select({
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
          { label: 'Trash', value: 'trash' },
        ],
        defaultValue: 'draft',
        ui: {
          displayMode: 'segmented-control',
        },
      }),
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      author: relationship({
        ref: 'User.builds',
        ui: {
          hideCreate: true,
        },
        many:false,
        hooks:{
            validateInput: ({ addValidationError, resolvedData, fieldKey }) => {
                const author = resolvedData[fieldKey];
                if (author == null) {
                addValidationError(`Author = ${author}. Set author field before save`);
                }
            },
        }
      }),
      tags: relationship({
        ref: 'Tag.builds',
        many: true,
      }),
    },
    ui: {
      labelField: 'title',
    },
    hooks:{
      // Create slug
      resolveInput: ({ resolvedData }) => {
        const { title } = resolvedData;
        if (title) {
          return {
            ...resolvedData,
            slug: title?.trim()?.toLowerCase()?.replace(/[^\w ]+/g, '')?.replace(/ +/g, '-') ?? ''
          }
        }
        return resolvedData;
      }
    }
  })
