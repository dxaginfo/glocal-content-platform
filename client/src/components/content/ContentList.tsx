import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ContentStatus, ContentType, IContent } from '../../types/content';
import { useAuth } from '../../contexts/AuthContext';
import { useContent } from '../../contexts/ContentContext';
import ContentStatusBadge from './ContentStatusBadge';
import ContentTypeIcon from './ContentTypeIcon';
import LocaleFlag from '../common/LocaleFlag';
import { formatDate } from '../../utils/formatters';
import { UserRole } from '../../types/user';

const ContentList: React.FC = () => {
  const { contentItems, loading, error, fetchContent, deleteContent } = useContent();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ContentStatus | ''>('');
  const [typeFilter, setTypeFilter] = useState<ContentType | ''>('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchContent({
      status: statusFilter || undefined,
      type: typeFilter || undefined,
      language: languageFilter || undefined,
      page: currentPage,
      limit: itemsPerPage,
    });
  }, [fetchContent, statusFilter, typeFilter, languageFilter, currentPage, itemsPerPage]);

  // Filter content based on search term
  const filteredContent = contentItems.filter((content) =>
    content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle content deletion with confirmation
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this content? This action cannot be undone.')) {
      deleteContent(id);
    }
  };

  // Check if user has edit/delete permissions
  const canEdit = user?.role === UserRole.ADMIN || user?.role === UserRole.EDITOR;
  const canDelete = user?.role === UserRole.ADMIN;

  if (loading) {
    return <div className="flex justify-center p-8">Loading content...</div>;
  }

  if (error) {
    return <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Filters and search */}
      <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ContentStatus | '')}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="">All Statuses</option>
            {Object.values(ContentStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as ContentType | '')}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="">All Types</option>
            {Object.values(ContentType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          
          <input
            type="text"
            placeholder="Filter by language code (en, fr, es...)"
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
        
        <div className="flex-1 md:max-w-xs">
          <input
            type="text"
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
        
        {canEdit && (
          <Link
            to="/content/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
          >
            Create New
          </Link>
        )}
      </div>

      {/* Content table */}
      {filteredContent.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No content items found. Try changing your filters or create new content.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Language
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContent.map((content: IContent) => (
                <tr key={content._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-start">
                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          <Link to={`/content/${content._id}`} className="hover:text-blue-600">
                            {content.title}
                          </Link>
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-2">{content.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ContentTypeIcon type={content.type} />
                    <span className="ml-2 text-sm text-gray-700">{content.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <LocaleFlag locale={content.locale || content.language} />
                      <span className="ml-2 text-sm text-gray-700">{content.language}</span>
                      {content.locale && (
                        <span className="ml-1 text-xs text-gray-500">({content.locale})</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ContentStatusBadge status={content.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(content.updatedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/content/${content._id}`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      View
                    </Link>
                    {canEdit && (
                      <Link
                        to={`/content/${content._id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </Link>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => handleDelete(content._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6 flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredContent.length > 0 ? 1 : 0}</span> to{' '}
              <span className="font-medium">{filteredContent.length}</span> of{' '}
              <span className="font-medium">{contentItems.length}</span> results
            </p>
          </div>
          <div>
            {/* More sophisticated pagination component could go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentList;