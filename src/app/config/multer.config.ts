import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinaryUploads } from './cloudinary.config';

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUploads,
  params: {
    public_id: (_req, file) => {
      // Remove extension from the original name
      const nameWithoutExtension = file.originalname
        .split('.')
        .slice(0, -1)
        .join('.');

      const fileName = nameWithoutExtension
        .toLowerCase()
        .replace(/\s+/g, '-') // replace spaces with dashes
        .replace(/[^a-z0-9-]/g, ''); // remove non-alphanumeric chars except dashes

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

      const uniqueFileName = uniqueSuffix + '-' + fileName;

      return uniqueFileName;
    },
  },
});

export const multerUpload = multer({ storage: storage });
