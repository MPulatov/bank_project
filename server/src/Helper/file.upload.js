//Image uploader
const multer = require('multer')

// Upload controller
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    },
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes('pkcs12')) {
        return cb(null, true)
    } else {
        return cb(null, false)
    }
}

module.exports = {
    upload: multer({
        storage: storage,
        limits: {
            fileSize: '1000000',
        }, //1m
        fileFilter: fileFilter,
    }).single('certificateFileName'),
}
