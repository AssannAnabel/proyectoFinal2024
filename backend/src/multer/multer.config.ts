/* import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import * as multer from 'multer';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'Agrotech',
            format: 'jpg',
            public_id: file.originalname
        }
    }
})

export const multerOptions = {
    storage: storage
}  */

import { diskStorage } from "multer";
import path from "path";

const multerOptions = {
  storage: diskStorage({
    destination: './uploads', // Directorio local
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      callback(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
  }),
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (!['.csv'].includes(ext)) {
      return callback(new Error('Solo se permiten archivos CSV'), false);
    }
    callback(null, true);
  }
};

export default multerOptions;