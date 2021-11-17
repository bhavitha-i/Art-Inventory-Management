const express = require("express");
const router = express.Router();
const inStore_art_status = require("../controllers/InStore_Art_Status");


router.get("/inStore_art_status/all",inStore_art_status.findAll)

router.post("/inStore_art_status/add",inStore_art_status.create)

router.get("/inStore_art_status/:id", inStore_art_status.findByPk);

router.put("/inStore_art_status/:id", inStore_art_status.update);

router.delete("/inStore_art_status/:id", inStore_art_status.delete);



module.exports = router;


  