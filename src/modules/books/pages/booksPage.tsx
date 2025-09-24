"use client";
import { useBookServices } from "../hooks/useBookServices";
import BookCard from "../ui/BookCard"; // Importamos el componente de tarjeta

export default function BooksPage() {
  const { books, loading, error, setBooks } = useBookServices();
  
  const handleDeleteBook = async (bookId: number) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este libro?")) {
      return;
    }
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';
      const response = await fetch(`${API_BASE_URL}/books/${bookId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Error al eliminar el libro`);
      }
      
      setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
      alert('Libro eliminado exitosamente');
    } catch (err) {
      alert(`Error al eliminar el libro: ${err instanceof Error ? err.message : 'Error desconocido'}`);
    }
  };

  if (loading) {
    return <div className="p-8">Cargando libros...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error al cargar los libros: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Biblioteca de Libros</h1>
      </div>

      {books.length === 0 ? (
        <p>No hay libros disponibles en la biblioteca.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onDelete={handleDeleteBook}
            />
          ))}
        </div>
      )}
    </div>
  );
}