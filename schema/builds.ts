import { list } from '@keystone-6/core';
import {
    text,
    relationship,
    select,
  } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';

export const Build = list({
    access:{
        operation:{
            delete: ({session}) => session?.data.isAdmin
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
                if (author !== undefined || author !== null) {
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
  })