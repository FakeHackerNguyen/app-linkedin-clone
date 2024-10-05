import fs from 'fs';
import multer from 'multer';
import path from 'path';
import AppError from '../../utils/appError';
import {NextFunction, Request, Response} from 'express';

export default function avatarUpload(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const up_folder = path.join(__dirname, '../../assets/userAvatars');

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync(up_folder)) {
        fs.mkdirSync(up_folder, {recursive: true});
      }
      cb(null, up_folder);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 20 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png'
      ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
  });

  upload.any()(req, res, err => {
    if (err) {
      next(new AppError('Error uploading file', 500));
    } else {
      next();
    }
  });
}
