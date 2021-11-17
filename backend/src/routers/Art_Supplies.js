const express = require("express");
const router = express.Router();
const art_supplies = require("../controllers/Art_Supplies");


router.get("/art_supplies/all",art_supplies.findAll)

router.post("/art_supplies/add",art_supplies.create)

router.get("/art_supplies/:id", art_supplies.findByPk);

router.put("/art_supplies/:id", art_supplies.update);

router.delete("/art_supplies/:id", art_supplies.delete);



module.exports = router;


  