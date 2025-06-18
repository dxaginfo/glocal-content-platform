import express from 'express';
import {
  getAllContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
  getContentTranslations
} from '../controllers/content.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateContentCreate, validateContentUpdate } from '../middleware/validation.middleware';
import { checkRole } from '../middleware/role.middleware';
import { UserRole } from '../models/User';

const router = express.Router();

/**
 * @route GET /api/content
 * @desc Get all content items with filtering and pagination
 * @access Private
 */
router.get('/', authenticate, getAllContent);

/**
 * @route GET /api/content/:id
 * @desc Get single content item by ID
 * @access Private
 */
router.get('/:id', authenticate, getContentById);

/**
 * @route POST /api/content
 * @desc Create new content item
 * @access Private - Editor, Admin
 */
router.post(
  '/',
  authenticate,
  checkRole([UserRole.ADMIN, UserRole.EDITOR]),
  validateContentCreate,
  createContent
);

/**
 * @route PUT /api/content/:id
 * @desc Update content item
 * @access Private - Editor, Admin
 */
router.put(
  '/:id',
  authenticate,
  checkRole([UserRole.ADMIN, UserRole.EDITOR]),
  validateContentUpdate,
  updateContent
);

/**
 * @route DELETE /api/content/:id
 * @desc Delete content item
 * @access Private - Admin only
 */
router.delete(
  '/:id',
  authenticate,
  checkRole([UserRole.ADMIN]),
  deleteContent
);

/**
 * @route GET /api/content/:id/translations
 * @desc Get all translations of a content item
 * @access Private
 */
router.get(
  '/:id/translations',
  authenticate,
  getContentTranslations
);

export default router;