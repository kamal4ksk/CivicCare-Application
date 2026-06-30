import express from 'express';
const router = express.Router();
import {
  createArticle,
  getArticles,
  updateArticle,
  deleteArticle
} from '../controllers/articleController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/')
  .post(protect, admin, createArticle)
  .get(getArticles);

router.route('/:id')
  .put(protect, admin, updateArticle)
  .delete(protect, admin, deleteArticle);

export default router;
