const express = require("express");
const router = express.Router();
const painting_art = require("../controllers/Painting_Art");


router.get("/painting_art/all",painting_art.findAll)

router.post("/painting_art/add",painting_art.create)

router.get("/painting_art/:id", painting_art.findByPk);

router.put("/painting_art/:id", painting_art.update);

router.delete("/painting_art/:id", painting_art.delete);



module.exports = router;


  