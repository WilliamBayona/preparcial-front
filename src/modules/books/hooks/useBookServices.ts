"use client";

import { useState, useEffect } from 'react';

interface Book {
  id: number;
  title: string;
  genre: string;
  publicationYear: number;
  isbn: string;
  description?: string;
  image?: string;
  author?: {
    id: number;
    name: string;
  };
}

export function useBookServices() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/books`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setBooks(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching books');
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { books, loading, error, setBooks };
}