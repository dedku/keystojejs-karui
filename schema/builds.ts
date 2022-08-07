import { list } from '@keystone-6/core';
import {
  text,
  relationship,
  select,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { isAdmin, renderDocument } from './newAssets';

export const Build = list({
  access: {
    operation: {
      delete: isAdmin
    }
  },
  fields: {
    title: text({ validation: { isRequired: true } }),
    class: relationship({
      ref: 'Class.builds',
      ui: {
        hideCreate: true,
        linkToItem: true,
      },
      many: false,
      hooks: {
        validateInput: ({ addValidationError, resolvedData, fieldKey, operation }) => {
          if (operation == 'create') {
            const classSelect = resolvedData[fieldKey];
            if (classSelect == null) {
              addValidationError(`Class = ${classSelect}. Set class field before save`);
            }
          }
        },
      }
    }),
    slug: text({
      access: {
        update: isAdmin,
      },
      isIndexed: 'unique',
    }),
    renderedDoc: text({
      access: {
        update: isAdmin,
      }
    }),
    views: text({
      defaultValue: '1',
      access: {
        update: isAdmin,
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
      many: false,
      hooks: {
        validateInput: ({ addValidationError, resolvedData, fieldKey, operation }) => {
          if (operation == 'create') {
            const author = resolvedData[fieldKey];
            if (author == null) {
              addValidationError(`Author = ${author}. Set author field before save`);
            }
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
  hooks: {
    resolveInput: async ({ resolvedData, operation, context, item }) => {
      // Creare||update slug
      const { title } = resolvedData
      if (title) {
        return {
          ...resolvedData,
          slug: title?.trim()?.toLowerCase()?.replace(/[^\w ]+/g, '')?.replace(/ +/g, '-') ?? ''
        }
      }
      // Get documentQuery
      const documentContent: any = await context.query.Build.findOne({
        where: { id: item!.id },
        query: 'content { document }'
      })
      // Render to markup document field
      const renderedDocVal = renderDocument(documentContent.content);
      if (operation == 'update') {
        return {
          ...resolvedData,
          renderedDoc: renderedDocVal
        }
      }
      return resolvedData
    }
  }
})
