import { fetcher } from "@/shared/services/http";
import { Author } from "../types/author";
import { AuthorFormData } from "../validation/authorSchema";

// Las interfaces ya no son necesarias porque están definidas en el esquema
// pero las mantengo por compatibilidad
interface BookData {
  name: string;
  isbn: string;
  image: string;
  publishingDate: string;
  description: string;
  editorial: {
    id: number;
    name: string;
  };
}

interface PrizeData {
  premiationDate: string;
  name: string;
  description: string;
  organization: {
    id: number;
    name: string;
    tipo: string;
  };
}

// Hacer fetch a /authors
export const fetchAuthors = (): Promise<Author[]> => {
  return fetcher<Author[]>("/api/authors");
};

// Crear un nuevo autor con libro y premio obligatorios
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

// Hacer fetch a un libro por ID de autor y de libro
export const fetchPrizeById = (authorId: string, prizeId: string): Promise<any> => {
  return fetcher<any>(`/api/prizes/${prizeId}/author/${authorId}/`);
}

// Crear un nuevo libro usando el endpoint /books
export const createBook = (data: BookData): Promise<any> => {
  console.log("📚 Creando libro en /books con datos:", data);
  return fetcher<any>("/api/books", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Asociar libro a autor usando el endpoint /authors/{authorId}/books/{bookId}
export const associateBookToAuthor = (authorId: string, bookId: string): Promise<any> => {
  console.log(`🔗 Asociando libro ${bookId} al autor ${authorId}`);
  return fetcher<any>(`/api/authors/${authorId}/books/${bookId}`, {
    method: "POST",
  });
}

// Crear un nuevo premio usando el endpoint /prizes
export const createPrize = (data: PrizeData): Promise<any> => {
  console.log("🏆 Creando premio en /prizes con datos:", data);
  return fetcher<any>("/api/prizes", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Asociar premio a autor usando el endpoint /prizes/{prizeId}/author/{authorId}
export const associatePrizeToAuthor = (prizeId: string, authorId: string): Promise<any> => {
  console.log(`🔗 Asociando premio ${prizeId} al autor ${authorId}`);
  return fetcher<any>(`/api/prizes/${prizeId}/author/${authorId}`, {
    method: "POST",
  });
}

// Crear un nuevo autor completo con libro y premio
export const createAuthorComplete = async (data: AuthorFormData): Promise<Author> => {
  try {
    console.log("📝 Datos recibidos en createAuthorComplete:", data);
    
    // Paso 1: Crear el autor primero (solo con los datos básicos del autor)
    const authorData = {
      name: data.name,
      birthDate: data.birthDate,
      description: data.description,
      image: data.image
    };
    
    console.log("👤 Creando autor con datos:", authorData);
    const author = await fetcher<Author>("/api/authors", {
      method: "POST",
      body: JSON.stringify(authorData),
    });
    console.log("✅ Autor creado:", author);
    
    // Paso 2: Crear el libro y asociarlo al autor
    if (data.book) {
      console.log("📚 Creando libro...");
      const book = await createBook(data.book);
      console.log("✅ Libro creado:", book);
      
      console.log("🔗 Asociando libro al autor...");
      await associateBookToAuthor(author.id.toString(), book.id.toString());
      console.log("✅ Libro asociado al autor");
    }
    
    // Paso 3: Crear el premio y asociarlo al autor
    if (data.prize) {
      console.log("🏆 Creando premio...");
      const prize = await createPrize(data.prize);
      console.log("✅ Premio creado:", prize);
      
      console.log("🔗 Asociando premio al autor...");
      await associatePrizeToAuthor(prize.id.toString(), author.id.toString());
      console.log("✅ Premio asociado al autor");
    }
    
    // Paso 4: Retornar el autor completo con los datos actualizados
    console.log("🔄 Obteniendo autor actualizado...");
    const updatedAuthor = await fetchAuthorById(author.id.toString());
    console.log("✅ Proceso completo finalizado:", updatedAuthor);
    
    return updatedAuthor;
  } catch (error) {
    console.error("❌ Error in createAuthorComplete:", error);
    throw error;
  }
};
