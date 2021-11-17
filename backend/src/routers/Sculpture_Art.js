const express = require("express");
const router = express.Router();
const sculpture_art = require("../controllers/Sculpture_Art");


router.get("/sculpture_art/all",sculpture_art.findAll)

router.post("/sculpture_art/add",sculpture_art.create)

router.get("/sculpture_art/:id", sculpture_art.findByPk);

router.put("/sculpture_art/:id", sculpture_art.update);

router.delete("/sculpture_art/:id", sculpture_art.delete);



module.exports = router;


  