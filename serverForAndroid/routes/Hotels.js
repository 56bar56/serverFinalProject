import express from 'express';
import { filterHotels } from '../controllers/Hotel.js';

const router = express.Router();

router.post('/filter', filterHotels);

export default router;
