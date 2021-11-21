const express = require("express");
const router = express.Router();
const art_in_auction = require("../controllers/Art_in_Auction");


router.get("/art_in_auction/all",art_in_auction.findAll)

router.post("/art_in_auction/add",art_in_auction.create)

router.get("/art_in_auction/:id", art_in_auction.findByPk);

router.put("/art_in_auction/:id", art_in_auction.update);

router.delete("/art_in_auction/:id", art_in_auction.delete);

router.get("/art_in_auction_artCount",art_in_auction.findCount)

router.get("/art_in_auction_arts/:id",art_in_auction.findArtInShow)






module.exports = router;


  