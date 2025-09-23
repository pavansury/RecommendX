import axios from 'axios';
import { Book } from '../types/book';

// Google Books API Configuration (prefer env; fallback to existing key)
const GOOGLE_BOOKS_API_KEY = (import.meta as any)?.env?.VITE_GOOGLE_BOOKS_API_KEY || 'AIzaSyCQ5VA7wo15aWurVWn-6C_MRs1zQvkUUU8';
const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

// Normalize language inputs from UI names or codes for Google Books API
const mapToGoogleBooksLanguage = (language: string): string => {
  const normalized = language.toLowerCase();
  const languageMap: Record<string, string> = {
    // Names -> codes
    'hindi': 'hi',
    'tamil': 'ta',
    'telugu': 'te',
    'kannada': 'kn',
    'malayalam': 'ml',
    'bengali': 'bn',
    'marathi': 'mr',
    'gujarati': 'gu',
    'punjabi': 'pa',
    'odia': 'or',
    'assamese': 'as',
    'english': 'en',
    // Codes pass-through
    'hi': 'hi',
    'ta': 'ta',
    'te': 'te',
    'kn': 'kn',
    'ml': 'ml',
    'bn': 'bn',
    'mr': 'mr',
    'gu': 'gu',
    'pa': 'pa',
    'or': 'or',
    'as': 'as',
    'en': 'en',
  };
  return languageMap[normalized] || 'en';
};

// Get popular books with optional language filter
export const getPopularBooks = async (language?: string): Promise<Book[]> => {
  try {
    // Search for popular books in the specified language
    const paramsBase: any = {
      q: 'subject:fiction',
      orderBy: 'relevance',
      maxResults: 20,
      key: GOOGLE_BOOKS_API_KEY,
      printType: 'books',
    };
    const params: any = {
      ...paramsBase,
      langRestrict: language ? mapToGoogleBooksLanguage(language) : undefined,
    };
    
    console.log('Fetching books with params:', params);
    
    let response = await axios.get(GOOGLE_BOOKS_API_URL, { 
      params,
      paramsSerializer: (params) => {
        return Object.entries(params)
          .filter(([_, value]) => value !== undefined)
          .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
          .join('&');
      }
    });

    // Fallbacks if no items returned
    if (!response.data?.items || response.data.items.length === 0) {
      console.warn('No books found for given language. Retrying without language restriction...');
      // Try without language restriction
      response = await axios.get(GOOGLE_BOOKS_API_URL, {
        params: paramsBase,
      });
    }

    if (!response.data?.items || response.data.items.length === 0) {
      console.warn('Still no books. Retrying with alternate subject query...');
      // Try broader query
      response = await axios.get(GOOGLE_BOOKS_API_URL, {
        params: {
          ...paramsBase,
          q: 'subject:literature OR subject:novel OR subject:india',
        },
      });
    }

    const items = response.data?.items || [];
    console.log(`Fetched ${items.length} books`);
    return items;
  } catch (error: any) {
    // Handle specific axios errors
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          console.error('API key is invalid or expired');
          throw new Error('API key is invalid or expired');
        } else {
          console.error(`Google Books API error: ${error.response.status} - ${error.response.data?.error?.message || 'Unknown error'}`);
          throw new Error(`Google Books API error: ${error.response.status}`);
        }
      } else if (error.request) {
        console.error('No response received from Google Books API:', error.request);
        throw new Error('No response received from Google Books API. Please check your internet connection.');
      } else {
        console.error('Error setting up the request:', error.message);
        throw new Error(`Error setting up the request: ${error.message}`);
      }
    } else {
      console.error('Error fetching popular books:', error);
      throw new Error('Failed to fetch popular books');
    }
  }
};

// Search for books with optional language filter
export const searchBooks = async (query: string, language?: string): Promise<Book[]> => {
  if (!query.trim()) return [];
  
  try {
    const params: any = {
      q: query,
      maxResults: 20,
      key: GOOGLE_BOOKS_API_KEY,
      printType: 'books',
    };
    
    // Add language filter if provided
    if (language) {
      params.langRestrict = language;
    }
    
    const response = await axios.get(GOOGLE_BOOKS_API_URL, { params });
    
    // Google Books API returns an empty array if no items found, which is valid
    return response.data.items || [];
  } catch (error: any) {
    // Handle specific axios errors
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          console.error('API key is invalid or expired');
          throw new Error('API key is invalid or expired');
        } else {
          console.error(`Google Books API error: ${error.response.status} - ${error.response.data?.error?.message || 'Unknown error'}`);
          throw new Error(`Google Books API error: ${error.response.status}`);
        }
      } else if (error.request) {
        console.error('No response received from Google Books API:', error.request);
        throw new Error('No response received from Google Books API. Please check your internet connection.');
      } else {
        console.error('Error setting up the request:', error.message);
        throw new Error(`Error setting up the request: ${error.message}`);
      }
    } else {
      console.error('Error searching books:', error);
      throw new Error('Failed to search books');
    }
  }
};

// Get book details
export const getBookDetails = async (id: string): Promise<Book> => {
  try {
    // Validate the book ID
    if (!id) {
      throw new Error('Book ID is required');
    }

    const response = await axios.get(`${GOOGLE_BOOKS_API_URL}/${id}`, {
      params: {
        key: GOOGLE_BOOKS_API_KEY
      }
    });
    
    // Check if we got a valid response
    if (!response.data) {
      throw new Error('No data received from Google Books API');
    }
    
    return response.data;
  } catch (error: any) {
    // Handle specific axios errors
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 404) {
          console.error(`Book with ID ${id} not found`);
          throw new Error(`Book with ID ${id} not found`);
        } else if (error.response.status === 401 || error.response.status === 403) {
          console.error('API key is invalid or expired');
          throw new Error('API key is invalid or expired');
        } else {
          console.error(`Google Books API error: ${error.response.status} - ${error.response.data?.error?.message || 'Unknown error'}`);
          throw new Error(`Google Books API error: ${error.response.status}`);
        }
      } else if (error.request) {
        console.error('No response received from Google Books API:', error.request);
        throw new Error('No response received from Google Books API. Please check your internet connection.');
      } else {
        console.error('Error setting up the request:', error.message);
        throw new Error(`Error setting up the request: ${error.message}`);
      }
    } else {
      console.error('Error fetching book details:', error);
      throw new Error('Failed to fetch book details');
    }
  }
};

// Get book recommendations (by category and author)
export const getBookRecommendations = async (category: string, author: string): Promise<Book[]> => {
  // Number of retry attempts
  const maxRetries = 3;
  let retryCount = 0;
  let lastError: any = null;

  // Retry logic with exponential backoff
  while (retryCount <= maxRetries) {
    try {
      // If we have a category, prioritize that. Otherwise, use the author.
      let query = category ? `subject:${category}` : '';
      
      if (author && !query) {
        query = `inauthor:${author}`;
      } else if (author) {
        // Add author as a secondary filter if we already have a category
        query += ` inauthor:${author}`;
      }
      
      // Fallback if we don't have either
      if (!query) {
        query = 'subject:fiction';
      }

      // Set a timeout for the request to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      try {
        const response = await axios.get(GOOGLE_BOOKS_API_URL, {
          params: {
            q: query,
            maxResults: 6, // Reduced from 10 to help with rate limiting
            key: GOOGLE_BOOKS_API_KEY
          },
          signal: controller.signal
        });
        
        // Clear the timeout since the request completed
        clearTimeout(timeoutId);
        
        // Google Books API returns an empty array if no items found, which is valid
        return response.data.items || [];
      } catch (err) {
        // Make sure to clear the timeout if there's an error
        clearTimeout(timeoutId);
        throw err; // Re-throw to be caught by the outer try-catch
      }
    } catch (error: any) {
      lastError = error;
      
      // Handle specific axios errors
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 403) {
            console.error('API key is invalid or expired');
            throw new Error('API key is invalid or expired');
          } else if (error.response.status === 429) {
            // Rate limiting - wait and retry with exponential backoff
            const waitTime = 1000 * Math.pow(2, retryCount); // Exponential backoff: 1s, 2s, 4s, etc.
            console.warn(`Rate limited by Google Books API. Retrying in ${waitTime/1000}s... (${retryCount + 1}/${maxRetries + 1})`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
            retryCount++;
            continue; // Try again
          } else {
            console.error(`Google Books API error: ${error.response.status} - ${error.response.data?.error?.message || 'Unknown error'}`);
            throw new Error(`Google Books API error: ${error.response.status}`);
          }
        } else if (error.code === 'ECONNABORTED' || error.name === 'AbortError') {
          // Timeout or abort - retry
          if (retryCount < maxRetries) {
            console.warn(`Request timeout. Retrying... (${retryCount + 1}/${maxRetries + 1})`);
            retryCount++;
            continue; // Try again
          } else {
            console.error('Request timed out after multiple attempts');
            throw new Error('Request timed out. Please try again later.');
          }
        } else if (error.request) {
          // The request was made but no response was received
          if (retryCount < maxRetries) {
            console.warn(`No response received. Retrying... (${retryCount + 1}/${maxRetries + 1})`);
            retryCount++;
            continue; // Try again
          } else {
            console.error('No response received from Google Books API after multiple attempts');
            throw new Error('No response received from Google Books API. Please check your internet connection.');
          }
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up the request:', error.message);
          throw new Error(`Error setting up the request: ${error.message}`);
        }
      } else {
        console.error('Error fetching book recommendations:', error);
        throw new Error('Failed to fetch book recommendations');
      }
    }
  }
  
  // If we've exhausted all retries
  throw lastError || new Error('Failed to fetch book recommendations after multiple attempts');
};

// Get books by category with optional language filter
export const getBooksByCategory = async (category: string, language?: string): Promise<Book[]> => {
  // Number of retry attempts
  const maxRetries = 3;
  let retryCount = 0;
  let lastError: any = null;

  // Retry logic with exponential backoff
  while (retryCount <= maxRetries) {
    try {
      // Validate the category
      if (!category) {
        throw new Error('Category is required');
      }
      
      // Set a timeout for the request to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      try {
        const paramsBase: any = {
          q: `subject:${encodeURIComponent(category)}`,
          orderBy: 'relevance',
          maxResults: 20,
          key: GOOGLE_BOOKS_API_KEY,
          printType: 'books'
        };
        const params: any = {
          ...paramsBase,
          ...(language ? { langRestrict: language } : {}),
        };
        
        // Add language filter if provided
        if (language) {
          params.langRestrict = language;
        }
        
  let response = await axios.get(GOOGLE_BOOKS_API_URL, { params });
        
        // Clear the timeout since the request completed
        clearTimeout(timeoutId);
        
        let items: Book[] = response.data.items || [];

        if (items.length === 0 && language) {
          console.warn('No category books found with language. Retrying without language...');
          response = await axios.get(GOOGLE_BOOKS_API_URL, { params: paramsBase });
          items = response.data.items || [];
        }

        if (items.length === 0) {
          console.warn('Still no category books. Retrying with broader query...');
          response = await axios.get(GOOGLE_BOOKS_API_URL, { params: { ...paramsBase, q: 'subject:literature OR subject:novel' } });
          items = response.data.items || [];
        }

        // Google Books API returns an empty array if no items found, which is valid
        return items;
      } catch (err) {
        // Make sure to clear the timeout if there's an error
        clearTimeout(timeoutId);
        throw err; // Re-throw to be caught by the outer try-catch
      }
    } catch (error: any) {
      lastError = error;
      
      // Handle specific axios errors
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 403) {
            console.error('API key is invalid or expired');
            throw new Error('API key is invalid or expired');
          } else if (error.response.status === 429) {
            // Rate limiting - wait and retry with exponential backoff
            const waitTime = 1000 * Math.pow(2, retryCount); // Exponential backoff: 1s, 2s, 4s, etc.
            console.warn(`Rate limited by Google Books API. Retrying in ${waitTime/1000}s... (${retryCount + 1}/${maxRetries + 1})`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
            retryCount++;
            continue; // Try again
          } else {
            console.error(`Google Books API error: ${error.response.status} - ${error.response.data?.error?.message || 'Unknown error'}`);
            throw new Error(`Google Books API error: ${error.response.status}`);
          }
        } else if (error.code === 'ECONNABORTED' || error.name === 'AbortError') {
          // Timeout or abort - retry
          if (retryCount < maxRetries) {
            console.warn(`Request timeout. Retrying... (${retryCount + 1}/${maxRetries + 1})`);
            retryCount++;
            continue; // Try again
          } else {
            console.error('Request timed out after multiple attempts');
            throw new Error('Request timed out. Please try again later.');
          }
        } else if (error.request) {
          // The request was made but no response was received
          if (retryCount < maxRetries) {
            console.warn(`No response received. Retrying... (${retryCount + 1}/${maxRetries + 1})`);
            retryCount++;
            continue; // Try again
          } else {
            console.error('No response received from Google Books API after multiple attempts');
            throw new Error('No response received from Google Books API. Please check your internet connection.');
          }
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up the request:', error.message);
          throw new Error(`Error setting up the request: ${error.message}`);
        }
      } else {
        console.error('Error fetching books by category:', error);
        throw new Error('Failed to fetch books by category');
      }
    }
  }
  
  // If we've exhausted all retries
  throw lastError || new Error('Failed to fetch books by category after multiple attempts');
};