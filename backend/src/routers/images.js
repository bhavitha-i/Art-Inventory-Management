const AWS = require('aws-sdk')
const multer = require("multer")
const multerS3 = require("multer-s3")
const express = require("express");
require('dotenv').config();
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    signatureVersion: 'v4'
});


const S3 = new AWS.S3();


const getUniqFileName = (originalname) => {
    const name = uuidv4();
    const ext = originalname.split('.').pop();
    return `${name}.${ext}`;
}

const fileFilter = (req, file, cb) => {
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
        cb(null, true);
    } else{
        cb(null, false);

    }
}





let upload = multer({ 
    fileFilter,
    storage: multerS3({
        s3: S3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            const fileName = getUniqFileName(file.originalname);
            const s3_inner_directory = 'uploadImages';
            const finalPath = `${s3_inner_directory}/${fileName}`;
    
            file.newName = fileName;
    
            cb(null, finalPath );
        }
    }), 
   
});


//@type   POST
//route for post data
router.post("/uploadImage", upload.single('Image'), (req, res) => {
    console.log(req.file)
    // console.log(storage)

    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log(req.file.fieldname,req.file.location,'---- files')
        var imgsrc = req.file.location
        console.log(imgsrc, "--imgsrc")
        res.status(200).json({
          status: true,
          message: "Image Stored ",
          filepath: imgsrc
        })
    }
});


module.exports = router;