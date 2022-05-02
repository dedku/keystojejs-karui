import { list } from '@keystone-6/core';
import {
    text,
    relationship,
    password,
    checkbox,
  } from '@keystone-6/core/fields';;

export const User =  list({
    access: {
        operation: {
            create: ({session}) => session?.data.isAdmin,
            update: ({session}) => session?.data.isAdmin,
            delete: ({session}) => session?.data.isAdmin,
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
            update: ({session}) => session?.data.isAdmin,
      },
      }),
      password: password({ validation: { isRequired: true } }),
      blogs: relationship({
        ref: 'Blog.author',
        many: true,
        ui: {
          hideCreate: true,
        },
      }),
      builds: relationship({
        ref: 'Build.author',
        many: true,
        ui: {
          hideCreate: true,
        },
      }),
    },
    ui:{
      isHidden: ({session}) => !session?.data.isAdmin,
    }
  })
