import multer from "multer";

// disk storage - for storing uploaded files in temporary local storage

const storage = multer.diskStorage(
    {
        destination: function (req, file, cb){
            cb(null, './public/temp')
        },
        filename: function (req, file, cb) {
            //we can add unique suffix to the file name aswell -> (Self study component)
            cb(null, file.originalname)
        }
    }
)


export const upload = multer({
    storage
})