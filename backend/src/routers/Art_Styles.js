const express = require("express");
const router = express.Router();
const artStyles = require("../controllers/Art_Styles");


router.get("/artStyle/all",artStyles.findAll)

router.post("/artStyle/add",artStyles.create)

router.get("/artStyle/:id", artStyles.findByPk);

router.put("/artStyle/:id", artStyles.update);

router.delete("/artStyle/:id", artStyles.delete);



module.exports = router;


  