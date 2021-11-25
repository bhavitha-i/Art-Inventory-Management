const express = require("express");
const router = express.Router();
const artists = require("../controllers/artist");





router.get("/artist/all",artists.findAll)

router.post("/artist/add", artists.create)

router.get("/artist/:id", artists.findByPk);

router.put("/artist/:id", artists.update);

router.delete("/artist/:id", artists.delete);



module.exports = router;


  