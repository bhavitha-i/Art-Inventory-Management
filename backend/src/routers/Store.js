const express = require("express");
const router = express.Router();
const store = require("../controllers/Store");


router.get("/store/all", store.findAll)

router.post("/store/add",store.create)

router.get("/store/:id", store.findByPk);

router.put("/store/:id", store.update);

router.delete("/store/:id", store.delete);



module.exports = router;


  