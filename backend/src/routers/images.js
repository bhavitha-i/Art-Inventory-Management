const express = require("express");
const router = express.Router();
const multer = require("multer")
// const path = require("path")
require('dotenv').config();




const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        cb(null, './src/public/uploadImages/');
        console.log("Are we even here ?")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "--" + file.originalname);
    }
});  

const fileFilter = (req, file, cb) => {
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
        cb(null, true);
    } else{
        cb(null, false);

    }

};
 
let upload = multer({ storage: storage, fileFilter: fileFilter});



//@type   POST
//route for post data
router.post("/uploadImage", upload.single('Image'), (req, res) => {
    console.log(req.file)
    // console.log(storage)

    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log(req.file.filename)
        var imgsrc = process.env.EXPRESS_HOST+'uploadImages/' + req.file.filename
        console.log(imgsrc, "--imgsrc")
        res.status(200).json({
          status: true,
          message: "Image Stored ",
          filepath: imgsrc
        })
    }
});


module.exports = router;



  