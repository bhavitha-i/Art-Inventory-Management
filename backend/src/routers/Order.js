const express = require("express");
const router = express.Router();
const order = require("../controllers/Order");


router.get("/order/all",order.findAll)

router.post("/order/add",order.create)

router.get("/order/:id", order.findByPk);

router.put("/order/:id", order.update);

router.delete("/order/:id", order.delete);

router.put("/order/buy/:id",order.buy)



module.exports = router;


  