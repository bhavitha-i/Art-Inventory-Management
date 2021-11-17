const express = require("express");
const router = express.Router();
const purchase_types = require("../controllers/Purchase_Types");


router.get("/purchase_types/all",purchase_types.findAll)

router.post("/purchase_types/add",purchase_types.create)

router.get("/purchase_types/:id", purchase_types.findByPk);

router.put("/purchase_types/:id", purchase_types.update);

router.delete("/purchase_types/:id", purchase_types.delete);



module.exports = router;


  