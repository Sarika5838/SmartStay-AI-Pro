import express from 'express';
import { handleChat } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to handle chat messages
// Using protect middleware if we want only logged-in users to chat, 
// but for now let's keep it public so anyone can chat, or require auth based on requirements.
// For a production app, auth is usually required to track history, but public demo is fine.
router.post('/', handleChat);

export default router;
