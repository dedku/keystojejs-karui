import { list } from '@keystone-6/core';
import {
    text,
    relationship,
    image,
  } from '@keystone-6/core/fields';
import {cloundImage} from './newAssets'
import { isAdmin } from './newAssets';

export const Tag = list({
    ui: {
      isHidden: !isAdmin,
    },
    fields: {
      name: text(),
      color: text(),
      blogs: relationship({
        ref: 'Blog.tags',
        many: true,
        ui:{
          hideCreate:true,
          createView: { fieldMode: 'hidden' },
        }
      }),
      builds: relationship({
        ref: 'Build.tags',
        many: true,
        ui:{
          hideCreate:true,
          createView: { fieldMode: 'hidden' },
        }
      }),
    },
    hooks: {
      // Change tah to be lower case
      resolveInput: ({ resolvedData }) => {
        const { name } = resolvedData;
        if (name) {
          return {
            ...resolvedData,
            title: name.toLowerCase()
          }
        }
        return resolvedData;
      }
    }
  })

  export const Class = list({
    access: {
      operation: {
          create: isAdmin,
          update: isAdmin,
          delete: isAdmin,
        },
    },
    ui: {
      isHidden: !isAdmin,
    },
    fields: {
      name: text(),
      image: cloundImage,
      builds: relationship({
        ref: 'Build.class',
        many: true,
        ui:{
          hideCreate:true
        }
      }),
    },
  })

  export const Post = list({
    fields: {
      name: text(),
      icon: text(),
      subtitle: text(),
    },
  })