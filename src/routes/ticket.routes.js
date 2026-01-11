const express = require("express");
const router = express.Router();

const ticketController = require("../controllers/ticket.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/", auth.protect, ticketController.createTicket);
router.get("/my", auth.protect, ticketController.getTicketsByUser);
router.get("/status/:status", auth.protect, ticketController.getTicketsByStatus);

router.put("/:id/assign", auth.protect, auth.isAgent, ticketController.assignTicket);
router.put("/:id/status", auth.protect, auth.isAgent, ticketController.updateTicketStatus);
router.post("/:id/reply", auth.protect, ticketController.replyToTicket);

module.exports = router;
