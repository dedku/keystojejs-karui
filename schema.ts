import {User} from './schema/users'
import {Blog} from './schema/blogs'
import {Tag, Class, Post} from './schema/otherContent'
import {Build} from './schema/builds'

import { Lists } from '.keystone/types';

export const lists: Lists = {
  Blog,
  Build,
  User,
  Tag,
  Class,
  Post,
};
