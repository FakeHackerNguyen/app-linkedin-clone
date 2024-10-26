import {Response, NextFunction, Request} from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import AppError from '../../utils/appError';

export default function fileUpload(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const up_folder = path.join(__dirname, '../../assets/userFiles');

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
      fileSize: 50 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype.startsWith('image/') ||
        file.mimetype.startsWith('video/')
      ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
  });

  upload.any()(req, res, err => {
    if (err) {
      return next(new AppError('Error uploading file', 500));
    }

    if (!req.files || req.files.length === 0) {
      return next();
    }

    if (Array.isArray(req.files) && req.files[0]) {
      const file = req.files[0];
      const fileUrl = `${req.protocol}://${req.get('host')}/assets/userFiles/${
        file.filename
      }`;

      req.file = file;
      req.fileUrl = fileUrl;
      req.fileType = file.mimetype.split('/')[0];

      next();
    }
  });
}
