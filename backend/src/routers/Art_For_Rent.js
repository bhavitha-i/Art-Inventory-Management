const express = require("express");
const router = express.Router();
const art_for_rent = require("../controllers/Art_For_Rent");


router.get("/art_for_rent/all",art_for_rent.findAll)

router.post("/art_for_rent/add",art_for_rent.create)

router.get("/art_for_rent/:id", art_for_rent.findByPk);

router.put("/art_for_rent/:id", art_for_rent.update);

router.delete("/art_for_rent/:id", art_for_rent.delete);



module.exports = router;


  