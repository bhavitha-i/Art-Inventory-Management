const express = require("express");
const router = express.Router();
const art = require("../controllers/Art");


router.get("/art/all",art.findAll)

router.post("/art/add",art.create)

router.get("/art/:id", art.findByPk);

router.put("/art/:id", art.update);

router.delete("/art/:id", art.delete);



module.exports = router;


  