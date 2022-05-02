import { cloudinaryImage } from '@keystone-6/cloudinary';

// Check if user is an admin
type Session = { data: { id: string; isAdmin: boolean; }}
export const isAdmin = ({session}:{session:Session}) => session?.data.isAdmin

// Cloud image setup
export const cloundImage = cloudinaryImage({
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME! || 'drx4dy0ep',
      apiKey: process.env.CLOUDINARY_API_KEY! || '851415739516514',
      apiSecret: process.env.CLOUDINARY_API_SECRET! || 'B8_GOCevaxPbH1HFyiWhsgpN-6s',
      folder: process.env.CLOUDINARY_API_FOLDER! || 'home',
    },
  })