/**
 * Creates a standardized error response object
 * @param message Error message or messages
 * @param errorCode Optional error code for API consumers
 * @returns Standardized error response object
 */
export const createErrorResponse = (
  message: string | string[],
  errorCode?: string
) => {
  return {
    success: false,
    error: {
      message: Array.isArray(message) ? message : [message],
      code: errorCode || 'ERROR',
    },
  };
};

/**
 * Creates a standardized success response object
 * @param data Data to include in the response
 * @returns Standardized success response object
 */
export const createSuccessResponse = <T>(data: T) => {
  return {
    success: true,
    data,
  };
};

/**
 * Creates a standardized paginated response object
 * @param data Array of items
 * @param total Total number of items
 * @param page Current page number
 * @param limit Items per page
 * @returns Standardized paginated response object
 */
export const createPaginatedResponse = <T>(
  data: T[],
  total: number,
  page: number,
  limit: number
) => {
  return {
    success: true,
    data,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};