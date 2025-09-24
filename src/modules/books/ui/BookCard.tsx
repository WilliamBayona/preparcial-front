"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Book {
  id: number;
  title: string;
  publicationYear: number;
  description?: string;
  isbn: string;
  image?: string;
  author?: {
    name: string;
  };
}

interface BookCardProps {
  book: Book;
  onDelete?: (id: number) => void;
}

const BookCard = ({ book, onDelete }: BookCardProps) => {

  const handleDelete = () => {
    if (onDelete && window.confirm(`¿Estás seguro de que quieres eliminar "${book.title}"?`)) {
      onDelete(book.id);
    }
  };

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden max-w-sm">
      <div className="relative h-64 w-full">
        <Image
          src={book.image || '/placeholder.png'} 
          alt={`Portada de ${book.title}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{book.title}</h3>
        {book.description && (
          <p className="text-gray-700 mb-2 line-clamp-2">{book.description}</p>
        )}
        <p className="text-gray-500 font-semibold">
          {book.author?.name || 'Autor desconocido'} - {book.publicationYear}
        </p>
        
        <div className="flex justify-between items-center mt-auto pt-2 border-t">
          <Link href={`/books/${book.id}`} className="text-blue-600 hover:underline text-sm font-semibold">
            Ver Detalles
          </Link>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:underline text-sm font-semibold"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;