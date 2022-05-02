import { config } from '@keystone-6/core';
import { statelessSessions } from '@keystone-6/core/session';
import { createAuth } from '@keystone-6/auth';
import { lists } from './schema'

require('dotenv').config()

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  sessionData: 'name isAdmin',
});

let sessionSecret = process.env.SESSION_SECRET;
let sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret! || 'igoLqbHhm7qwiBNc8KgL4NQ8tD8fFVhNhNqZ2nRdprgnKNjgJHgvitWx6DPoZJpYHaDA',
});

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: process.env.POSTGRES_URL! || "postgresql://postgres:PxaYFjwMFVgYpOWFOyog@containers-us-west-36.railway.app:6302/railway",
    },
    lists,
    session,
  })
);
