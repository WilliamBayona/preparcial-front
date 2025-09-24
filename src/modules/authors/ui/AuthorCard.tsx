// src/components/Card.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


// 1. We define the contract. Our Card component MUST have these three properties.
interface CardProps {
    id: Number;
    birthDate: String;
    description: string;
    image: string;
    name: string;
    onDelete?: (id: Number) => void;
}



// 2. Our component now accepts a ‘props' object that conforms to the CardProps shape.
const AuthorCard = ({ id, birthDate, description, image, name, onDelete }: CardProps) => {

    const handleDelete = () => {
    if (onDelete && window.confirm(`¿Estás seguro de que quieres eliminar a ${name}?`)) {
      onDelete(id);
    }
  };

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden max-w-sm">
      {/* 3. We use props to render dynamic content. */}
      <Image
        src={image}
        alt={`Imagen para ${name}`}
        width={500} 
        height={500}
        className="w-full h-80 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-700">{description}</p>
        <p className="text-gray-400 font-bold">{String(birthDate)}</p>
        <Link href={`/authors/edit/${id.toString()}`}>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Editar</button>
        </Link>

        <button 
          onClick={handleDelete}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded ml-2 hover:bg-red-600 transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
export default AuthorCard;