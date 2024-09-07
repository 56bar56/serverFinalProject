import express from 'express';
import { filterFlights } from '../controllers/Flight.js';

const router = express.Router();

router.post('/filter', filterFlights);

export default router;
