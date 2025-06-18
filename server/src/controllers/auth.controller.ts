import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserRole, IUser } from '../models/User';
import { createErrorResponse } from '../utils/response';

// JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

// Generate JWT token
const generateToken = (user: IUser): string => {
  return jwt.sign(
    { 
      id: user._id, 
      email: user.email,
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

// Register a new user
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json(createErrorResponse('User already exists'));
      return;
    }

    // Create new user with validated role (default to VIEWER if invalid)
    const userRole = Object.values(UserRole).includes(role) 
      ? role 
      : UserRole.VIEWER;

    const user = new User({
      email,
      password,
      firstName,
      lastName,
      role: userRole,
    });

    await user.save();

    // Generate JWT token
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        token,
      },
    });
  } catch (error: any) {
    res.status(500).json(createErrorResponse(error.message));
  }
};

// Login user
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(401).json(createErrorResponse('Invalid credentials'));
      return;
    }

    // Check if password is correct
    const isPasswordValid = await user.isPasswordValid(password);
    if (!isPasswordValid) {
      res.status(401).json(createErrorResponse('Invalid credentials'));
      return;
    }

    // Generate JWT token
    const token = generateToken(user);

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        token,
      },
    });
  } catch (error: any) {
    res.status(500).json(createErrorResponse(error.message));
  }
};

// Get current user profile
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // User is attached to request by auth middleware
    const user = req.user as IUser;
    
    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          avatar: user.avatar,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json(createErrorResponse(error.message));
  }
};