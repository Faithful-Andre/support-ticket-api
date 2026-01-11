const Ticket = require("../models/ticket.model");

/**
 * @desc    Create support ticket
 * @route   POST /api/tickets
 * @access  User
 */
const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const ticket = await Ticket.create({
      title,
      description,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Ticket created successfully",
      ticket
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Assign ticket to agent
 * @route   PUT /api/tickets/:id/assign
 * @access  Agent
 */
const assignTicket = async (req, res) => {
  try {
    const { agentId } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      {
        assignedTo: agentId,
        status: "pending"
      },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({
      message: "Ticket assigned to agent",
      ticket
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update ticket status
 * @route   PUT /api/tickets/:id/status
 * @access  Agent
 */
const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({
      message: "Ticket status updated",
      ticket
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Reply to ticket
 * @route   POST /api/tickets/:id/reply
 * @access  User / Agent
 */
const replyToTicket = async (req, res) => {
  try {
    const { message } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.replies.push({
      message,
      sender: req.user.id,
      senderRole: req.user.role
    });

    await ticket.save();

    res.json({
      message: "Reply added successfully",
      ticket
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get tickets created by logged-in user
 * @route   GET /api/tickets/my
 * @access  User
 */
const getTicketsByUser = async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.user.id })
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get tickets by status
 * @route   GET /api/tickets/status/:status
 * @access  Agent
 */
const getTicketsByStatus = async (req, res) => {
  try {
    const tickets = await Ticket.find({ status: req.params.status })
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTicket,
  assignTicket,
  updateTicketStatus,
  replyToTicket,
  getTicketsByUser,
  getTicketsByStatus
};
