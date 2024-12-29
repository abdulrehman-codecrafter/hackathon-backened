const express = require('express');
const authVerify = require('../middlewares/auth');
const { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent, participateInEvent } = require('../controllers/eventControllers');
const eventRouter = express.Router();


// Get all events
eventRouter.get('/', getAllEvents);

// Get a single event by ID
eventRouter.get('/:eventId', getEventById);

// Create a new event (protected route)
eventRouter.post('/create', authVerify, createEvent);

// Update an event by ID (protected route)
eventRouter.put('/update/:eventId', authVerify, updateEvent);

// Delete an event by ID (protected route)
eventRouter.delete('/delete/:eventId', authVerify, deleteEvent);

// Participate in an event (protected route)
eventRouter.post('/participate/:eventId', authVerify, participateInEvent);

module.exports = eventRouter;
