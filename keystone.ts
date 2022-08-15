import { config } from '@keystone-6/core';
import { statelessSessions } from '@keystone-6/core/session';
import { createAuth } from '@keystone-6/auth';
import { lists } from './schema'
import dotenv from 'dotenv'

dotenv.config()

const {
  S3_BUCKET_NAME: bucketName = 'keystone-test',
  S3_REGION: region = 'ap-southeast-2',
  S3_ACCESS_KEY_ID: accessKeyId = 'keystone',
  S3_SECRET_ACCESS_KEY: secretAccessKey = 'keystone',
} = process.env;

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  sessionData: 'name isAdmin',
});

let sessionSecret = process.env.SESSION_SECERT;
let sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret!
});

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: process.env.POSTGRES_URL!,
    },
    server: {
      cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
      }
    },
    graphql: {
      path: '/api/graphql',
      cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
      },
    },
    lists,
    session,
    storage: {
      my_s3_files: {
        kind: 's3',
        type: 'image',
        bucketName,
        region,
        accessKeyId,
        secretAccessKey,
        signed: { expiry: 5000 },
      },
    }
  })
);
