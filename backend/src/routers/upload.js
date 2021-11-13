const express = require("express");
const router = express.Router();
const multer = require("multer")
const path = require("path")
const db = require("../mysql");
const dbmodels = db.models



var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        console.log("Sgs");
        callBack(null, './src/public/uploadImages/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, new Date().toISOString() + file.originalname);
    }


})
 
var upload = multer({
    storage: storage
});
 
//@type   POST
//route for post data
router.post("/upload", upload.single('file'), (req, res) => {
    console.log(req.file)
    // console.log(storage)

    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log(req.file.filename)
        var imgsrc = 'http://127.0.0.1:5000/src/public/uploadImages/' + req.file.filename
        const Imagerow = { Name: imgsrc}
        dbmodels.Images.create(Imagerow)
        .then((imagefile) => {
        res.status(200).json({
          status: true,
          message: "Image Stored ",
        });
      })
      .catch(err => {
        res.send({
          message:
            err.message || "Some error occurred while retrieving Artists."
        });
      });
    }
});


module.exports = router;


