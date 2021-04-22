const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;


const VALID_TYPE_FILES = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
});

const fileFilter = (req, file, cb) => {
  if (VALID_TYPE_FILES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new Error('Invalidad file type!');
    cb(error);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

const uploadToCloudinary = async (req, res, next) => {
  if (req.file) {
    try {
      const filePath = req.file.path;
      const image = await cloudinary.uploader.upload(filePath);
      await fs.unlinkSync(filePath);
      req.file_url = image.secure_url || 'https://pngimage.net/wp-content/uploads/2018/06/user-logo-png-4.png';
      return next();
    } catch (err) {
      return next(err);
    }
  } else {
    return next();
  }
};


module.exports = {upload, uploadToCloudinary};
