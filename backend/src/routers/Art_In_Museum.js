const express = require("express");
const router = express.Router();
const art_in_museum = require("../controllers/Art_In_Museum");


router.get("/art_in_museum/all",art_in_museum.findAll)

router.post("/art_in_museum/add",art_in_museum.create)

router.get("/art_in_museum/:id", art_in_museum.findByPk);

router.put("/art_in_museum/:id", art_in_museum.update);

router.delete("/art_in_museum/:id", art_in_museum.delete);

router.get("/art_in_museum_artCount",art_in_museum.findCount)


router.get("/artlist_in_museum/:id", art_in_museum.findAllinMuseum);


module.exports = router;


  