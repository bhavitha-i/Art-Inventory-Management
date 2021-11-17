const express = require("express");
const router = express.Router();
const art_show = require("../controllers/Art_Show");


router.get("/art_show/all",art_show.findAll)

router.post("/art_show/add",art_show.create)

router.get("/art_show/:id", art_show.findByPk);

router.put("/art_show/:id", art_show.update);

router.delete("/art_show/:id", art_show.delete);



module.exports = router;


  