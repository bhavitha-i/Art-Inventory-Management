const express = require("express");
const router = express.Router();
const art_in_store = require("../controllers/Art_In_Store");


router.get("/art_in_store/all",art_in_store.findAll)

router.post("/art_in_store/add",art_in_store.create)

router.get("/art_in_store/:id", art_in_store.findByPk);

router.put("/art_in_store/:id", art_in_store.update);

router.delete("/art_in_store/:id", art_in_store.delete);



module.exports = router;


  