import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinaryUploads } from './cloudinary.config';

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUploads,
  params: {
    public_id: (req, file) => {
      const originalName = file.originalname;
      const extension = originalName.split('.').pop();

      const baseName = originalName
        .replace(`.${extension}`, '')
        .toLowerCase()
        .replace(/\s+/g, '-') // replace spaces with dash
        .replace(/[^a-z0-9-]/g, ''); // remove special characters

      const uniqueFileName = `${baseName}-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${extension}`;

      return uniqueFileName;
    },
  },
});

export const multerUpload = multer({ storage });
