import { list } from '@keystone-6/core';
import {
    text,
    relationship,
    password,
    checkbox,
  } from '@keystone-6/core/fields';;
import { isAdmin } from './newAssets';

export const User =  list({
    access: {
        operation: {
            create: isAdmin,
            update: isAdmin,
            delete: isAdmin,
          },
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
      isAdmin: checkbox({
        defaultValue: false,
        access: {
            update: isAdmin,
      },
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
    ui:{
      isHidden: ({session}) => !session?.data.isAdmin,
    }
  })
