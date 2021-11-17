const express = require("express");
const router = express.Router();
const art_exhibition = require("../controllers/Art_Exhibition");


router.get("/art_exhibition/all",art_exhibition.findAll)

router.post("/art_exhibition/add",art_exhibition.create)

router.get("/art_exhibition/:id", art_exhibition.findByPk);

router.put("/art_exhibition/:id", art_exhibition.update);

router.delete("/art_exhibition/:id", art_exhibition.delete);



module.exports = router;


  