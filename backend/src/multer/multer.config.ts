import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import * as multer from 'multer';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: './uploads-images',
            format: 'jpg|jpeg|png|gif',
            public_id: file.originalname
        }
    }
})

export const multerOptions = {
    storage: storage
}