import Image from 'next/image';
import Link from 'next/link';
import { getBookById } from '@/modules/books/services/bookService';

// Definimos la interfaz basada en la estructura JSON que proporcionaste
interface BookDetail {
  id: number;
  name: string;
  isbn: string;
  image: string;
  publishingDate: string;
  description: string;
  editorial: {
    id: number;
    name: string;
  };
  reviews: {
    id: number;
    description: string;
  }[];
  authors: {
    id: number;
    name: string;
    image: string;
    description: string;
  }[];
}

export default async function BookDetailPage({ params }: { params: { id: string } }) {
  const book: BookDetail | null = await getBookById(params.id);

  if (!book) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Libro no encontrado</h1>
        <p>No pudimos encontrar el libro que buscas.</p>
        <Link href="/books" className="text-blue-600 hover:underline mt-4 inline-block">
          &larr; Volver a la biblioteca
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      {/* Portada del Libro */}
      <Image
        src={book.image}
        alt={`Portada de ${book.name}`}
        width={200}
        height={300}
        priority
        className="object-cover mb-4"
      />

      {/* Información Principal */}
      <h1 className="text-3xl font-bold mb-2">{book.name}</h1>
      <p className="mb-4">
        por <strong>{book.authors.map(a => a.name).join(', ')}</strong>
      </p>
      
      <div className="mb-6">
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Publicado:</strong> {new Date(book.publishingDate).toLocaleDateString()}</p>
        <p><strong>Editorial:</strong> {book.editorial.name}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-2">Descripción</h2>
      <p className="mb-6">{book.description}</p>
      
      <div className="mt-8">
          <Link href="/books" className="text-blue-600 hover:underline">
              &larr; Volver a todos los libros
          </Link>
      </div>
    </div>
  );
}