const express = require("express");
const router = express.Router();
const art_in_exhibition = require("../controllers/Art_Exhibition");


router.get("/art_in_exhibition/all",art_in_exhibition.findAll)

router.post("/art_in_exhibition/add",art_in_exhibition.create)

router.get("/art_in_exhibition/:id", art_in_exhibition.findByPk);

router.put("/art_in_exhibition/:id", art_in_exhibition.update);

router.delete("/art_in_exhibition/:id", art_in_exhibition.delete);



module.exports = router;


  