import express from 'express';
const router = express.Router();
import {
  createCommunity,
  getCommunities,
  toggleJoinLeave,
  updateCommunity,
  deleteCommunity
} from '../controllers/communityController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/')
  .post(protect, createCommunity)
  .get(getCommunities);

router.route('/:id/join')
  .post(protect, toggleJoinLeave);

router.route('/:id')
  .put(protect, updateCommunity)
  .delete(protect, deleteCommunity);

export default router;
