import { cloudinaryImage } from '@keystone-6/cloudinary';

// Check if user is an admin
type SessionContext = { data: { id: string; isAdmin: boolean; }}
export const isAdmin = ({session}:{session:SessionContext}) => session?.data.isAdmin

// Cloud image setup
export const cloundImage = cloudinaryImage({
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
      apiKey: process.env.CLOUDINARY_API_KEY!,
      apiSecret: process.env.CLOUDINARY_API_SECRET!,
      folder: process.env.CLOUDINARY_API_FOLDER!
    },
  })