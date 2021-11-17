const express = require("express");
const router = express.Router();
const exhibition_tickets = require("../controllers/Exhibition_Tickets");


router.get("/exhibition_tickets/all",exhibition_tickets.findAll)

router.post("/exhibition_tickets/add",exhibition_tickets.create)

router.get("/exhibition_tickets/:id", exhibition_tickets.findByPk);

router.put("/exhibition_tickets/:id", exhibition_tickets.update);

router.delete("/exhibition_tickets/:id", exhibition_tickets.delete);



module.exports = router;


  