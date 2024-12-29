// const Event = require("../models/Event");
const Event = require("../models/eventModel");
const User = require("../models/userModel");

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate({
      path: 'participants',
      select: 'profilePic name',  
    })
    .populate({
      path: 'createdBy',
      select: 'profilePic name',  
    }) 

    res.status(200).json({
      data: events,
      message: "Events fetched successfully",
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: "Failed to fetch events",
      error: err.message,
    });
  }
};

// Get a single event by its ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId) // Find event by ID
    if (!event) {
      return res.status(404).json({
        data: null,
        error: true,
        message: "Event not found",
      });
    }
    res.status(200).json({
      data: event,
      message: "Event fetched successfully",
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: "Failed to fetch event",
      error: err.message,
    });
  }
};

// Create a new event
const createEvent = async (req, res) => {
  try {
    const { title, description, date, category, address, eventType, image } = req.body;
    const newEvent = new Event({
      title,
      description,
      date,
      category,
      address,
      eventType,
      image,
      createdBy: req.user._id, // Assuming you are using JWT to set the user ID
    });

    await newEvent.save(); // Save the new event to the database
    res.status(201).json({
      data: newEvent,
      message: "Event created successfully",
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: "Failed to create event",
      error: err.message,
    });
  }
};

// Update an event by its ID
const updateEvent = async (req, res) => {
  try {
    const  {eventId}  = req.params;
    const updatedData = req.body;
    const event = await Event.findByIdAndUpdate(eventId, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Validate the data before saving
    });

    if (!event) {
      return res.status(404).json({
        data: null,
        error: true,
        message: "Event not found",
      });
    }

    res.status(200).json({
      data: event,
      message: "Event updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: "Failed to update event",
      error: err.message,
    });
  }
};

// Delete an event by its ID
const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findByIdAndDelete(eventId); // Delete the event

    if (!event) {
      return res.status(404).json({
        data: null,
        error: true,
        message: "Event not found",
      });
    }

    res.status(200).json({
      data: null,
      message: "Event deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: "Failed to delete event",
      error: err.message,
    });
  }
};

// Participate in an event
const participateInEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id; // Get the user ID from the authenticated user

    // Find the event by its ID
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        data: null,
        error: true,
        message: "Event not found",
      });
    }

    // Check if the user is already participating
    if (event.participants.includes(userId)) {
      return res.status(400).json({
        data: null,
        error: true,
        message: "You are already participating",
      });
    }

    // Add the user to the participants list
    event.participants.push(userId);
    await event.save(); // Save the updated event

    res.status(200).json({
      data: event,
      message: "You have successfully joined the event",
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: "Failed to participate in the event",
      error: err.message,
    });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  participateInEvent,
};
