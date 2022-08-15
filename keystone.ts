import { config } from '@keystone-6/core';
import { statelessSessions } from '@keystone-6/core/session';
import { createAuth } from '@keystone-6/auth';
import { lists } from './schema'
import dotenv from 'dotenv'

dotenv.config()

const {
  // The S3 Bucket Name used to store assets
  S3_BUCKET_NAME: bucketName = 'keystone-test',
  // The region of the S3 bucket
  S3_REGION: region = 'ap-southeast-2',
  // The Access Key ID and Secret that has read/write access to the S3 bucket
  S3_ACCESS_KEY_ID: accessKeyId = 'keystone',
  S3_SECRET_ACCESS_KEY: secretAccessKey = 'keystone',
  // The base URL to serve assets from
  ASSET_BASE_URL: baseUrl = 'http://localhost:3000',
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
      my_local_images: {
        kind: 'local',
        type: 'image',
        generateUrl: path => `${baseUrl}/images${path}`,
        serverRoute: {
          path: '/images',
        },
        storagePath: 'public/images',
      },
      my_s3_files: {
        kind: 's3',
        type: 'file',
        bucketName,
        region,
        accessKeyId,
        secretAccessKey,
        signed: { expiry: 5000 },
      },
    }
  })
);
