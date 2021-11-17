const express = require("express");
const router = express.Router();
const address = require("../controllers/Address");


router.get("/address/all",address.findAll)

router.post("/address/add",address.create)

router.get("/address/:id", address.findByPk);

router.put("/address/:id", address.update);

router.delete("/address/:id", address.delete);



module.exports = router;


  