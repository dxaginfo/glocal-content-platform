import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ContentItem, ContentType, ContentStatus, Translation, PaginatedResponse, ContentQueryParams } from '../types';
import axios from 'axios';
import { API_URL, CONTENT_PER_PAGE } from '../config';
import { useAuth } from './AuthContext';

interface ContentContextProps {
  contents: ContentItem[];
  totalContents: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  filters: ContentQueryParams;
  selectedContent: ContentItem | null;
  getContents: (params?: ContentQueryParams) => Promise<void>;
  getContentById: (id: string) => Promise<ContentItem>;
  createContent: (content: Partial<ContentItem>) => Promise<ContentItem>;
  updateContent: (id: string, content: Partial<ContentItem>) => Promise<ContentItem>;
  deleteContent: (id: string) => Promise<void>;
  createTranslation: (contentId: string, language: string, locale: string) => Promise<Translation>;
  updateTranslation: (translationId: string, data: Partial<Translation>) => Promise<Translation>;
  setFilters: (filters: ContentQueryParams) => void;
  setSelectedContent: (content: ContentItem | null) => void;
}

const ContentContext = createContext<ContentContextProps | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [totalContents, setTotalContents] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ContentQueryParams>({
    page: 1,
    limit: CONTENT_PER_PAGE,
    sortBy: 'updatedAt',
    sortOrder: 'desc',
  });
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);

  // Load contents when authenticated or filters change
  useEffect(() => {
    if (isAuthenticated) {
      getContents(filters);
    }
  }, [isAuthenticated, filters]);

  // Mock data for development
  const mockContents: ContentItem[] = [
    {
      id: '1',
      title: 'Home Page',
      description: 'Main landing page for the website',
      body: '<h1>Welcome to our Website</h1><p>This is the home page content.</p>',
      status: ContentStatus.PUBLISHED,
      type: ContentType.PAGE,
      language: 'en',
      locale: 'en-US',
      tags: ['homepage', 'main'],
      author: {
        id: '1',
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN' as any,
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-15T00:00:00Z',
      publishedAt: '2025-01-15T00:00:00Z',
      translations: [
        {
          id: '101',
          contentId: '1',
          language: 'es',
          locale: 'es-ES',
          status: 'COMPLETED' as any,
          translatedFields: {
            title: 'Página de Inicio',
            description: 'Página principal del sitio web',
            body: '<h1>Bienvenido a nuestro sitio web</h1><p>Este es el contenido de la página de inicio.</p>',
          },
          createdAt: '2025-01-02T00:00:00Z',
          updatedAt: '2025-01-16T00:00:00Z',
        },
        {
          id: '102',
          contentId: '1',
          language: 'fr',
          locale: 'fr-FR',
          status: 'IN_PROGRESS' as any,
          translatedFields: {
            title: 'Page d\'Accueil',
            description: 'Page principale du site web',
          },
          createdAt: '2025-01-03T00:00:00Z',
          updatedAt: '2025-01-10T00:00:00Z',
        }
      ]
    },
    {
      id: '2',
      title: 'About Us',
      description: 'Information about our company',
      body: '<h1>About Our Company</h1><p>We are a global organization with a mission to provide great products.</p>',
      status: ContentStatus.PUBLISHED,
      type: ContentType.PAGE,
      language: 'en',
      locale: 'en-US',
      tags: ['about', 'company'],
      author: {
        id: '1',
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN' as any,
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
      createdAt: '2025-01-05T00:00:00Z',
      updatedAt: '2025-01-20T00:00:00Z',
      publishedAt: '2025-01-20T00:00:00Z',
      translations: []
    },
    {
      id: '3',
      title: 'New Product Launch',
      description: 'Announcing our latest product',
      body: '<h1>Introducing Our New Product</h1><p>We\'re excited to announce our latest innovation.</p>',
      status: ContentStatus.DRAFT,
      type: ContentType.BLOG_POST,
      language: 'en',
      locale: 'en-US',
      tags: ['product', 'launch', 'announcement'],
      author: {
        id: '2',
        email: 'editor@example.com',
        firstName: 'Editor',
        lastName: 'User',
        role: 'EDITOR' as any,
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
      createdAt: '2025-02-01T00:00:00Z',
      updatedAt: '2025-02-05T00:00:00Z',
      translations: []
    }
  ];

  // Get contents with filters
  const getContents = async (params: ContentQueryParams = filters) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real app, this would be an API call
      // const response = await axios.get(`${API_URL}/contents`, { params });
      // const { items, total, page } = response.data;
      
      // Mock response for demo purposes
      const filteredContents = mockContents.filter(content => {
        if (params.search && !content.title.toLowerCase().includes(params.search.toLowerCase())) {
          return false;
        }
        if (params.type && content.type !== params.type) {
          return false;
        }
        if (params.status && content.status !== params.status) {
          return false;
        }
        if (params.language && content.language !== params.language) {
          return false;
        }
        if (params.locale && content.locale !== params.locale) {
          return false;
        }
        if (params.tags && params.tags.length > 0) {
          const hasAllTags = params.tags.every(tag => content.tags.includes(tag));
          if (!hasAllTags) return false;
        }
        return true;
      });
      
      const page = params.page || 1;
      const limit = params.limit || CONTENT_PER_PAGE;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedContents = filteredContents.slice(startIndex, endIndex);
      
      // Simulate a delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setContents(paginatedContents);
      setTotalContents(filteredContents.length);
      setCurrentPage(page);
      setIsLoading(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load contents. Please try again.';
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  // Get content by ID
  const getContentById = async (id: string): Promise<ContentItem> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real app, this would be an API call
      // const response = await axios.get(`${API_URL}/contents/${id}`);
      // return response.data;
      
      // Mock response for demo purposes
      const content = mockContents.find(content => content.id === id);
      
      if (!content) {
        throw new Error('Content not found');
      }
      
      // Simulate a delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setIsLoading(false);
      return content;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load content. Please try again.';
      setError(errorMessage);
      setIsLoading(false);
      throw error;
    }
  };

  // Create new content
  const createContent = async (content: Partial<ContentItem>): Promise<ContentItem> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real app, this would be an API call
      // const response = await axios.post(`${API_URL}/contents`, content);
      // return response.data;
      
      // Mock response for demo purposes
      const newContent: ContentItem = {
        id: Math.random().toString(36).substring(2, 11),
        title: content.title || 'Untitled',
        description: content.description || '',
        body: content.body || '',
        status: content.status || ContentStatus.DRAFT,
        type: content.type || ContentType.PAGE,
        language: content.language || 'en',
        locale: content.locale || 'en-US',
        tags: content.tags || [],
        author: {
          id: '1',
          email: 'admin@example.com',
          firstName: 'Admin',
          lastName: 'User',
          role: 'ADMIN' as any,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        translations: []
      };
      
      // Simulate a delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIsLoading(false);
      
      // Refresh the content list
      getContents();
      
      return newContent;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create content. Please try again.';
      setError(errorMessage);
      setIsLoading(false);
      throw error;
    }
  };

  // Update content
  const updateContent = async (id: string, content: Partial<ContentItem>): Promise<ContentItem> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real app, this would be an API call
      // const response = await axios.put(`${API_URL}/contents/${id}`, content);
      // return response.data;
      
      // Mock response for demo purposes
      const existingContent = mockContents.find(c => c.id === id);
      
      if (!existingContent) {
        throw new Error('Content not found');
      }
      
      const updatedContent: ContentItem = {
        ...existingContent,
        ...content,
        updatedAt: new Date().toISOString()
      };
      
      // Simulate a delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIsLoading(false);
      
      // Refresh the content list
      getContents();
      
      return updatedContent;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update content. Please try again.';
      setError(errorMessage);
      setIsLoading(false);
      throw error;
    }
  };

  // Delete content
  const deleteContent = async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real app, this would be an API call
      // await axios.delete(`${API_URL}/contents/${id}`);
      
      // Mock deletion
      const contentExists = mockContents.some(content => content.id === id);
      
      if (!contentExists) {
        throw new Error('Content not found');
      }
      
      // Simulate a delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIsLoading(false);
      
      // Refresh the content list
      getContents();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete content. Please try again.';
      setError(errorMessage);
      setIsLoading(false);
      throw error;
    }
  };

  // Create translation
  const createTranslation = async (contentId: string, language: string, locale: string): Promise<Translation> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real app, this would be an API call
      // const response = await axios.post(`${API_URL}/contents/${contentId}/translations`, { language, locale });
      // return response.data;
      
      // Mock response for demo purposes
      const content = mockContents.find(c => c.id === contentId);
      
      if (!content) {
        throw new Error('Content not found');
      }
      
      const newTranslation: Translation = {
        id: Math.random().toString(36).substring(2, 11),
        contentId,
        language,
        locale,
        status: 'NOT_STARTED' as any,
        translatedFields: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Simulate a delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIsLoading(false);
      
      return newTranslation;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create translation. Please try again.';
      setError(errorMessage);
      setIsLoading(false);
      throw error;
    }
  };

  // Update translation
  const updateTranslation = async (translationId: string, data: Partial<Translation>): Promise<Translation> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real app, this would be an API call
      // const response = await axios.put(`${API_URL}/translations/${translationId}`, data);
      // return response.data;
      
      // Mock response for demo purposes
      let foundTranslation: Translation | undefined;
      
      for (const content of mockContents) {
        if (content.translations) {
          foundTranslation = content.translations.find(t => t.id === translationId);
          if (foundTranslation) break;
        }
      }
      
      if (!foundTranslation) {
        throw new Error('Translation not found');
      }
      
      const updatedTranslation: Translation = {
        ...foundTranslation,
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      // Simulate a delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIsLoading(false);
      
      return updatedTranslation;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update translation. Please try again.';
      setError(errorMessage);
      setIsLoading(false);
      throw error;
    }
  };

  const value = {
    contents,
    totalContents,
    currentPage,
    isLoading,
    error,
    filters,
    selectedContent,
    getContents,
    getContentById,
    createContent,
    updateContent,
    deleteContent,
    createTranslation,
    updateTranslation,
    setFilters,
    setSelectedContent,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export const useContent = (): ContentContextProps => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};