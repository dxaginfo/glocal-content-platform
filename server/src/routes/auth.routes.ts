import express from 'express';
import { register, login, getProfile } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateRegistration, validateLogin } from '../middleware/validation.middleware';

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', validateRegistration, register);

/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT token
 * @access Public
 */
router.post('/login', validateLogin, login);

/**
 * @route GET /api/auth/profile
 * @desc Get current user's profile
 * @access Private
 */
router.get('/profile', authenticate, getProfile);

export default router;