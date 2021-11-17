const express = require("express");
const router = express.Router();
const zipcode = require("../controllers/ZipCode_in_States");


router.get("/zipcode/all", zipcode.findAll)

router.post("/zipcode/add",zipcode.create)

router.get("/zipcode/:id", zipcode.findByPk);

router.put("/zipcode/:id", zipcode.update);

router.delete("/zipcode/:id", zipcode.delete);



module.exports = router;


  