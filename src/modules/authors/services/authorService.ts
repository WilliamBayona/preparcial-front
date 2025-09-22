import { fetcher } from "@/shared/services/http";
import { Author } from "../types/author";
import { AuthorFormData } from "../validation/authorSchema";


// Hacer fetch a /authors
export const fetchAuthors = (): Promise<Author[]> => {
  // We call the GET /authors endpoint.
  // The fetcher takes care of the base URL and error handling.
  return fetcher<Author[]>("/api/authors");
};


// Crear un nuevo autor
export const createAuthor = (data: AuthorFormData): Promise<Author> => {
  return fetcher<Author>("/api/authors", {
    method: "POST",
    body: JSON.stringify(data),
  });
};


// Hacer fetch a un autor por ID
export const fetchAuthorById = (id: string): Promise<Author> => {
  return fetcher<Author>(`/api/authors/${id}`);
};

// Actualizar un autor existente
export const updateAuthor = (id: string, data: AuthorFormData): Promise<Author> => {
  return fetcher<Author>(`/api/authors/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// Eliminar un autor por ID
export const deleteAuthor = (id: string): Promise<void> => {
  return fetcher<void>(`/api/authors/${id}`, {
    method: "DELETE",
  });
}