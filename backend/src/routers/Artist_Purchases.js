const express = require("express");
const router = express.Router();
const artist_purchaces = require("../controllers/Artist_Purchases");


router.get("/artist_purchaces/all",artist_purchaces.findAll)

router.post("/artist_purchaces/add",artist_purchaces.create)

router.get("/artist_purchaces/:id", artist_purchaces.findByPk);

router.put("/artist_purchaces/:id", artist_purchaces.update);

router.delete("/artist_purchaces/:id", artist_purchaces.delete);



module.exports = router;


  