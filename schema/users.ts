import { list } from '@keystone-6/core';
import {
  text,
  relationship,
  password,
  checkbox,
  image
} from '@keystone-6/core/fields';;
import { filterUser, isAdmin, showIfAdmin } from './newAssets';

export const User = list({
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
      access: {
        update: isAdmin,
      }
    }),
    ytID: text({
      access: {
        update: isAdmin,
      }
    }),
    twitchID: text({
      access: {
        update: isAdmin,
      }
    }),
    ytVideosID: text({
      access: {
        update: isAdmin,
      }
    }),
    image: image({ storage: 'my_s3_files' }),
    isAdmin: checkbox({
      defaultValue: false,
      access: {
        update: isAdmin,
      },
      ui: {
        createView: { fieldMode: showIfAdmin }, itemView: { fieldMode: showIfAdmin }
      }
    }),
    isOnline: checkbox({
      defaultValue: false,
      access: {
        update: isAdmin,
      },
      ui: {
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
  hooks: {
    // Create slug
    resolveInput: ({ resolvedData }) => {
      const { name } = resolvedData;
      if (name) {
        return {
          ...resolvedData,
          slug: name?.trim()?.toLowerCase()?.replace(/[^\w ]+/g, '')?.replace(/ +/g, '-') ?? ''
        }
      }
      return resolvedData;
    }
  }
})
