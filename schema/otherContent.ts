import { list } from '@keystone-6/core';
import {
    text,
    relationship,
  } from '@keystone-6/core/fields';
import {cloundImage} from './newAssets'
import { isAdmin } from './newAssets';

export const Tag = list({
    ui: {
      isHidden: true,
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
          itemView: { fieldMode: 'hidden' }
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
      isHidden: true,
    },
    fields: {
      name: text(),
      image: cloundImage,
      builds: relationship({
        ref: 'Build.class',
        many: true,
        ui:{
          hideCreate:true,
          createView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'hidden' }
        }
      }),
    },
  })
