import { list } from '@keystone-6/core';
import {
    text,
    relationship,
    select,
  } from '@keystone-6/core/fields';
  import { document } from '@keystone-6/fields-document';
import { isAdmin } from './newAssets';

export const PostCategory = list({
    access:{
        operation:{
            delete: isAdmin
        }
    },
    fields: {
      name: text(),
      icon: text(),
      subtitle: text(),
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
      content: relationship({
          ref: 'PostContent.category',
          many:true,
      })
    },
  })

export const PostContent = list({
    access:{
        operation:{
            delete: isAdmin
        }
    },
    fields: {
        name: text(),
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
            category: relationship({
                ref:'PostCategory.content',
                many:false,
        })
    },
})
