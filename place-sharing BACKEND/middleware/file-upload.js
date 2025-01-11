const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// MIME type map to validate allowed file types
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, 'uploads/images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


// Multer configuration
const fileUpload = multer({
  limits: { fileSize: 500000 }, // Limit file size to 500 KB
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir); // Directory for storing uploaded files
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype]; // Extract file extension
      if (!ext) {
        return cb(new Error('Invalid file type'), false); // Reject invalid file types
      }
      cb(null, uuidv4() + '.' + ext); // Unique filename
    }
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype]; // Check if MIME type is valid
    const error = isValid ? null : new Error('Invalid mime type!');
    cb(error, isValid);
  },
  onError: (err, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
      err.message = 'File size exceeds the 500 KB limit';
    }
    next(err); 
  }
});

module.exports = fileUpload;