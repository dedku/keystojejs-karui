import { list } from '@keystone-6/core';
import {
    text,
    relationship,
    select,
  } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { isAdmin, cloundImage, renderDocument } from './newAssets'
import { componentBlocks } from '../components/component-blocks';

export const Blog = list({
    access:{
        operation:{
            delete: isAdmin
        }
    },
    fields: {
      title: text({ validation: { isRequired: true } }),
      cardAvatar: cloundImage,
      coverPhoto: cloundImage,
      slug: text({
        access:{
          update: isAdmin,
        }
      }),
      views: text({
        defaultValue:'1',
        access:{
          update: isAdmin,
      }}),
      renderedDoc: text({
        access:{
          update: isAdmin,
      }}),
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
        ui: {
          views: require.resolve('../components/component-blocks')
        },
        componentBlocks,
      }),
      author: relationship({
        ref: 'User.blogs',
        ui: {
          hideCreate: true,
        },
        many:false,
        hooks:{
          validateInput: ({ addValidationError, resolvedData, fieldKey, operation }) => {
            if(operation == 'create'){
                const author = resolvedData[fieldKey];
                if (author == null) {
                addValidationError(`Author = ${author}. Set author field before save`);
                }
            }
          },
        }
      }),
      tags: relationship({
        ref: 'Tag.blogs',
        many: true,
      }),
    },
    ui: {
      labelField: 'title',
    },
    hooks:{
      // Create slug
      // Rendered doc value add to item
      resolveInput: async ({ resolvedData, operation, context, item }) => {
        const { title } = resolvedData
        if(operation == 'create' || operation == 'update' ) {
          const documentContent: any = await context.query.Blog.findOne({
            where:{ id: item!.id},
            query: 'content { document }'
          })
          const renderedDocVal = renderDocument(documentContent.content);
          if (renderedDocVal.length > 0) {
            return {
              ...resolvedData,
              renderedDoc: renderedDocVal,
              slug: title?.trim()?.toLowerCase()?.replace(/[^\w ]+/g, '')?.replace(/ +/g, '-') ?? ''
            }
          }
          return resolvedData;
        }
      }
    }
  })