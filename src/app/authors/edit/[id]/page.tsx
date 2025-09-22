// src/authors/edit/[id]/page.tsx
import EditAuthorForm from "@/modules/authors/ui/EditAuthorForm";
import { fetchAuthorById } from "@/modules/authors/services/authorService";

interface EditPageProps {
  params: {
    id: string;
  };
}

// Ahora es un componente de servidor, por lo tanto puede ser 'async'
export default async function EditPage({ params }: EditPageProps) {
  const { id } = params;

  try {
    const fetchedAuthor = await fetchAuthorById(id);
    return <EditAuthorForm initialAuthor={fetchedAuthor} authorId={id} />;
  } catch (error) {
    console.error("Error al cargar el autor:", error);
    return <div>Error al cargar el autor.</div>;
  }
}