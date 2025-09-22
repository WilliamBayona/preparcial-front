"use client";
import { useAuthorServices } from "../hooks/useAuthorServices";
import AuthorCard from "../ui/AuthorCard";

export default function AuthorsPage() {
  const { authors, loading, error, setAuthors } = useAuthorServices();
  const handleDeleteAuthor = async (authorId: Number) => {
    try {
      setAuthors(prevAuthors => prevAuthors.filter(author => author.id !== authorId));
      console.log('Autor eliminado exitosamente');
      alert('Autor eliminado exitosamente');
    } catch (error) {
      console.error('Error eliminando autor :', error);
      alert(`Error al eliminar el autor: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-5xl font-bold mb-4 text-center">Authors Page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {authors.map((author) => (
          <AuthorCard
                key={author.id.toString()}
                name={author.name}
                description={author.description}
                image={author.image}
                birthDate={author.birthDate} 
                id={author.id}
                onDelete={handleDeleteAuthor} />
        ))}
      </div>
    </div>
  );
}