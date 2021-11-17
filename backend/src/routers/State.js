const express = require("express");
const router = express.Router();
const state = require("../controllers/State");


router.get("/state/all",state.findAll)

router.post("/state/add",state.create)

router.get("/state/:id", state.findByPk);

router.put("/state/:id", state.update);

router.delete("/state/:id", state.delete);



module.exports = router;


  