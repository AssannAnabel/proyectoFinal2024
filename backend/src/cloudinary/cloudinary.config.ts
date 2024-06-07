import { v2 as cloudinary }  from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    console.log('Cloudinary Config:', {
      cloud_name: process.env.CLOUDINARY_cloud_name,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    return cloudinary.config({
      cloud_name: process.env.CLOUDINARY_cloud_name,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
};