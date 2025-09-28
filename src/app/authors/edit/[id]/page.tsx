// src/authors/edit/[id]/page.tsx
import EditAuthorForm from "@/modules/authors/ui/EditAuthorForm";
import { fetchAuthorById } from "@/modules/authors/services/authorService";

interface EditPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Función para adaptar los datos del autor al formato esperado por el formulario
const adaptAuthorForForm = (author: any) => {
  return {
    name: author.name,
    birthDate: author.birthDate,
    description: author.description,
    image: author.image,
    // Tomar el primer libro si existe, o proporcionar valores por defecto
    book:
      author.books && author.books.length > 0
        ? {
            name: author.books[0].name,
            isbn: author.books[0].isbn,
            image: author.books[0].image,
            publishingDate: author.books[0].publishingDate,
            description: author.books[0].description,
            editorial: author.books[0].editorial,
          }
        : {
            name: "",
            isbn: "",
            image: "",
            publishingDate: "",
            description: "",
            editorial: { id: 0, name: "" },
          },
    // Tomar el primer premio si existe, o proporcionar valores por defecto
    prize:
      author.prizes && author.prizes.length > 0
        ? {
            premiationDate: author.prizes[0].premiationDate,
            name: author.prizes[0].name,
            description: author.prizes[0].description,
            organization: author.prizes[0].organization,
          }
        : {
            premiationDate: "",
            name: "",
            description: "",
            organization: { id: 0, name: "", tipo: "PUBLICA" as const },
          },
  };
};

// Ahora es un componente de servidor, por lo tanto puede ser 'async'
export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params;

  try {
    const fetchedAuthor = await fetchAuthorById(id);
    const adaptedAuthor = adaptAuthorForForm(fetchedAuthor);
    return <EditAuthorForm initialAuthor={adaptedAuthor} authorId={id} />;
  } catch (error) {
    console.error("Error al cargar el autor:", error);
    return <div>Error al cargar el autor.</div>;
  }
}