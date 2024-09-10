import express from 'express';
import { createTrip } from '../controllers/Trip.js';

const router = express.Router();

// POST route to create a new trip
router.post('/createTrip', createTrip);

export default router;
