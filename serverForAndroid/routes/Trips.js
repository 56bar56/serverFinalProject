import express from 'express';
import { createTrip, getUserTrips } from '../controllers/Trip.js';

const router = express.Router();

// POST route to create a new trip
router.post('/createTrip', createTrip);
router.get('/getUserTrips', getUserTrips);

export default router;
