const express = require("express");
const router = express.Router();
const payment_status = require("../controllers/Payment_Status");


router.get("/payment_status/all",payment_status.findAll)

router.post("/payment_status/add",payment_status.create)

router.get("/payment_status/:id", payment_status.findByPk);

router.put("/payment_status/:id", payment_status.update);

router.delete("/payment_status/:id", payment_status.delete);



module.exports = router;


  