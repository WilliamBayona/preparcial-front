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

// Hacer fetch a un libro por ID de autor y de libro
export const fetchBookById = (authorId: string, bookId: string): Promise<any> => {
  return fetcher<any>(`/api/authors/${authorId}/books/${bookId}/`);
}

// Hacer fetch a todos los libros
export const fetchAllBooks = (): Promise<any[]> => {
  return fetcher<any[]>(`/api/books`);
}

// Hacer fetch a todos los premios
export const fetchAllPrize = (): Promise<any[]> => {
  return fetcher<any[]>(`/api/prizes`);
}

//Hacer fetch a un libro por ID  de autor y de libro
export const fetchPrizeById = (authorId: string, prizeId: string): Promise<any> => {
  return fetcher<any>(`/api/prizes/${prizeId}/author/${authorId}/`);
}

// Crear un nuevo libro
export const createBook = (authorId: string, data: any): Promise<any> => {
  return fetcher<any>(`/api/authors/${authorId}/books`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Crear un nuevo premio
export const createPrize = (authorId: string, data: any): Promise<any> => {
  return fetcher<any>(`/api/authors/${authorId}/prizes`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
