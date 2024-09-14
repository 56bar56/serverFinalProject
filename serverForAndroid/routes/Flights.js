import express from 'express';
import { filterFlights, sortFlights } from '../controllers/Flight.js';


const router = express.Router();

router.post('/filter', filterFlights);
router.post('/sort', sortFlights);


export default router;
