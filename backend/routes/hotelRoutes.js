import express from 'express';
import { getHotels, getHotel, createHotel } from '../controllers/hotelController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getHotels);
router.get('/:id', getHotel);
// Admin only
router.post('/', protect, admin, createHotel);

export default router;
