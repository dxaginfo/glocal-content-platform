import { Request, Response } from 'express';
import { Content, ContentStatus, IContent } from '../models/Content';
import { createErrorResponse } from '../utils/response';
import { IUser } from '../models/User';

// Get all content items with filtering and pagination
export const getAllContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      status, 
      type, 
      language, 
      locale, 
      tag, 
      page = 1, 
      limit = 10,
      sort = 'createdAt',
      order = 'desc'
    } = req.query;

    // Build query
    const query: any = {};
    
    if (status) query.status = status;
    if (type) query.type = type;
    if (language) query.language = language;
    if (locale) query.locale = locale;
    if (tag) query.tags = { $in: [tag] };

    // Calculate pagination
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    // Sort options
    const sortOptions: any = {};
    sortOptions[sort as string] = order === 'desc' ? -1 : 1;

    // Execute query with pagination
    const contentItems = await Content.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum)
      .populate('author', 'firstName lastName email')
      .populate('originalId', 'title language locale');

    // Get total count for pagination
    const totalItems = await Content.countDocuments(query);

    res.status(200).json({
      success: true,
      count: contentItems.length,
      pagination: {
        total: totalItems,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(totalItems / limitNum)
      },
      data: contentItems
    });
  } catch (error: any) {
    res.status(500).json(createErrorResponse(error.message));
  }
};

// Get single content item by ID
export const getContentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const contentId = req.params.id;
    
    const content = await Content.findById(contentId)
      .populate('author', 'firstName lastName email')
      .populate('originalId', 'title language locale');
    
    if (!content) {
      res.status(404).json(createErrorResponse('Content not found'));
      return;
    }
    
    res.status(200).json({
      success: true,
      data: content
    });
  } catch (error: any) {
    res.status(500).json(createErrorResponse(error.message));
  }
};

// Create new content item
export const createContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as IUser;
    
    const {
      title,
      description,
      body,
      type,
      language,
      locale,
      tags,
      originalId,
      metadata
    } = req.body;
    
    const content = new Content({
      title,
      description,
      body,
      type,
      language,
      locale,
      tags: tags || [],
      author: user._id,
      originalId,
      metadata: metadata || {},
      status: ContentStatus.DRAFT
    });
    
    await content.save();
    
    res.status(201).json({
      success: true,
      data: content
    });
  } catch (error: any) {
    res.status(500).json(createErrorResponse(error.message));
  }
};

// Update content item
export const updateContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const contentId = req.params.id;
    const updates = req.body;
    
    // Find content and check if it exists
    const content = await Content.findById(contentId);
    
    if (!content) {
      res.status(404).json(createErrorResponse('Content not found'));
      return;
    }
    
    // If status is being updated to PUBLISHED, set publishedAt date
    if (updates.status === ContentStatus.PUBLISHED && content.status !== ContentStatus.PUBLISHED) {
      updates.publishedAt = new Date();
    }
    
    // Update content with new values
    const updatedContent = await Content.findByIdAndUpdate(
      contentId,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate('author', 'firstName lastName email');
    
    res.status(200).json({
      success: true,
      data: updatedContent
    });
  } catch (error: any) {
    res.status(500).json(createErrorResponse(error.message));
  }
};

// Delete content item
export const deleteContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const contentId = req.params.id;
    
    const content = await Content.findById(contentId);
    
    if (!content) {
      res.status(404).json(createErrorResponse('Content not found'));
      return;
    }
    
    await Content.findByIdAndDelete(contentId);
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error: any) {
    res.status(500).json(createErrorResponse(error.message));
  }
};

// Get all translations of a content item
export const getContentTranslations = async (req: Request, res: Response): Promise<void> => {
  try {
    const contentId = req.params.id;
    
    // Find original content
    const originalContent = await Content.findById(contentId);
    
    if (!originalContent) {
      res.status(404).json(createErrorResponse('Original content not found'));
      return;
    }
    
    // Find all translations that reference this content as original
    const translations = await Content.find({ originalId: contentId })
      .populate('author', 'firstName lastName email');
    
    res.status(200).json({
      success: true,
      count: translations.length,
      data: translations
    });
  } catch (error: any) {
    res.status(500).json(createErrorResponse(error.message));
  }
};