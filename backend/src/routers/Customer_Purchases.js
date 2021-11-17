const express = require("express");
const router = express.Router();
const customer_purchases = require("../controllers/Customer_Purchases");


router.get("/customer_purchases/all",customer_purchases.findAll)

router.post("/customer_purchases/add",customer_purchases.create)

router.get("/customer_purchases/:id", customer_purchases.findByPk);

router.put("/customer_purchases/:id", customer_purchases.update);

router.delete("/customer_purchases/:id", customer_purchases.delete);



module.exports = router;


  