"use client";

import { useState, useEffect } from "react";
import { Author } from "../types/author";
import { fetchAuthors } from "../services/authorService";

export function useAuthorServices() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const data = await fetchAuthors();
        setAuthors(data);
      } catch (error) {
        setError("Error en conexion con API, a llorar");
      } finally {
        setLoading(false);
      }
    };

    loadAuthors();
  }, []);

  return { authors, loading, error, setAuthors };
}