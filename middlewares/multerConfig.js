const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const AppError = require('../utils/errorHandler');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'assets/folder/products', // folder in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 512, height: 512, crop: 'limit' }],
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new AppError('Only image files are allowed!', 400), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
