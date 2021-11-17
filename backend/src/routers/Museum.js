const express = require("express");
const router = express.Router();
const museum = require("../controllers/Museum");


router.get("/museum/all",museum.findAll)

router.post("/museum/add",museum.create)

router.get("/museum/:id", museum.findByPk);

router.put("/museum/:id", museum.update);

router.delete("/museum/:id", museum.delete);



module.exports = router;


  