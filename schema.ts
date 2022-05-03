import {User} from './schema/users'
import {Blog} from './schema/blogs'
import {Tag, Class} from './schema/otherContent'
import {Build} from './schema/builds'
import { PostCategory, PostContent } from './schema/posts'

import { Lists } from '.keystone/types';

export const lists: Lists = {
  Blog,
  Build,
  User,
  Tag,
  Class,
  PostCategory,
  PostContent
};
