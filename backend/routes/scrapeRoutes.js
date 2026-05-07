import express from 'express';
import { scrapeHackerNews } from '../controllers/scrapeController.js';

const router = express.Router();

router.post('/', scrapeHackerNews);

export default router;
