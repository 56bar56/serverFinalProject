import express from 'express';
import { filterRestaurants } from '../controllers/Restaurant.js';

const router = express.Router();

router.post('/filter', filterRestaurants);

export default router;
