import express from 'express';
import { filterAttractions } from '../controllers/Attractions.js';

const router = express.Router();

router.post('/filter', filterAttractions);

export default router;
