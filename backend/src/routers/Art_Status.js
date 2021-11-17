const express = require("express");
const router = express.Router();
const art_status = require("../controllers/Art_Status");


router.get("/art_status/all",art_status.findAll)

router.post("/art_status/add",art_status.create)

router.get("/art_status/:id", art_status.findByPk);

router.put("/art_status/:id", art_status.update);

router.delete("/art_status/:id", art_status.delete);



module.exports = router;


  