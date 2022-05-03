import { cloudinaryImage } from '@keystone-6/cloudinary';
import dotenv from 'dotenv'
dotenv.config()

// Check if user is an admin
type SessionContext = { data: { id: string; isAdmin: boolean; name: string }}
export const isAdmin = ({session}:{session:SessionContext}) => session?.data.isAdmin

// Show ony user profile to exact session user
export const filterUser = ({ session }: { session: SessionContext }) => {
  if (session?.data.isAdmin) return true;
  return { name: { equals: session?.data.name} };
}


// Show only when session user isAdmin
export const showIfAdmin = ({ session }: { session: SessionContext }) => {
  if (session?.data.isAdmin) return 'edit';
  return 'hidden';
}

// Cloud image setup
export const cloundImage = cloudinaryImage({
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    apiSecret: process.env.CLOUDINARY_API_SECRET!,
    folder: process.env.CLOUDINARY_API_FOLDER!
  },
})