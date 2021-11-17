const express = require("express");
const router = express.Router();
const customer = require("../controllers/Customer");


router.get("/customer/all",customer.findAll)

router.post("/customer/add",customer.create)

router.get("/customer/:id", customer.findByPk);

router.put("/customer/:id", customer.update);

router.delete("/customer/:id", customer.delete);



module.exports = router;


  