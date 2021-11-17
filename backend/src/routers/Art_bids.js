const express = require("express");
const router = express.Router();
const art_bids = require("../controllers/Art_bids");


router.get("/art_bids/all",art_bids.findAll)

router.post("/art_bids/add",art_bids.create)

router.get("/art_bids/:id", art_bids.findByPk);

router.put("/art_bids/:id", art_bids.update);

router.delete("/art_bids/:id", art_bids.delete);



module.exports = router;


  