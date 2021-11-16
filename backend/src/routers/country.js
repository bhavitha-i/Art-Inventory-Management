const express = require("express");
const router = express.Router();
const country = require("../controllers/country");


router.get("/country/all",country.findAll)

router.post("/country/add",country.create)

router.get("/country/:id", country.findByPk);

router.put("/country/:id", country.update);

router.delete("/country/:id", country.delete);



module.exports = router;


  