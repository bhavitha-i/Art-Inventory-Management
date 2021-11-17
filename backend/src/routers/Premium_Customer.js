const express = require("express");
const router = express.Router();
const premimum_customer = require("../controllers/Premium_Customer");


router.get("/premimum_customer/all",premimum_customer.findAll)

router.post("/premimum_customer/add",premimum_customer.create)

router.get("/premimum_customer/:id", premimum_customer.findByPk);

router.put("/premimum_customer/:id", premimum_customer.update);

router.delete("/premimum_customer/:id", premimum_customer.delete);



module.exports = router;


  