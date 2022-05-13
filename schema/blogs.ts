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
        hooks:{
          afterOperation: async ({operation, item, context}) => {
            if(operation == 'create' || operation == 'update' ) {
              console.log('work2')
              const documentContent: any = await context.query.Blog.findOne({
                where:{ id: item.id},
                query: 'content { document }'
              })
              const renderedDoc = renderDocument(documentContent.content)
              console.log(renderedDoc)
            }
          }
        }
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
      description: 'wtf is this, where is that?'
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