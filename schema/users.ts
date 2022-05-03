import { list } from '@keystone-6/core';
import {
    text,
    relationship,
    password,
    checkbox,
  } from '@keystone-6/core/fields';;
import { filterUser, isAdmin, showIfAdmin } from './newAssets';

export const User =  list({
    access: {
        operation: {
            delete: isAdmin,
        },
        filter: {
          query: filterUser,
        }
    },
    fields: {
      name: text({
        validation: { isRequired: true },
      }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        isFilterable: true,
      }),
      slug: text({
        ui: { createView: { fieldMode: showIfAdmin }, itemView: { fieldMode: showIfAdmin } },
        access:{
          update: isAdmin,
          read: isAdmin
        }
      }),
      isAdmin: checkbox({
        defaultValue: false,
        access: {
            update: isAdmin,
        },
        ui:{
           createView: { fieldMode: showIfAdmin }, itemView: { fieldMode: showIfAdmin }
        }
      }),
      password: password({ validation: { isRequired: true } }),
      blogs: relationship({
        ref: 'Blog.author',
        many: true,
        ui: {
          hideCreate: !isAdmin,
          createView: { fieldMode: 'hidden' },
        },
      }),
      builds: relationship({
        ref: 'Build.author',
        many: true,
        ui: {
          hideCreate: !isAdmin,
          createView: { fieldMode: 'hidden' },
        },
      }),
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
