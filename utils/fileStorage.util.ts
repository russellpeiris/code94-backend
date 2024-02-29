import multer from 'multer'

const imageStorage = multer.memoryStorage()

export const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error('Please upload PNG and JPG only'))
    }
    cb(null, true)
  },
})
