// src/modules/authors/ui/EditAuthorForm.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthorForm from "@/modules/authors/ui/AuthorForm";
import { AuthorFormData } from "@/modules/authors/validation/authorSchema";
import { useNotificationStore } from "@/shared/store/useNotificationStore";
import { updateAuthor } from "@/modules/authors/services/authorService";

interface EditAuthorFormProps {
  initialAuthor: AuthorFormData | null;
  authorId: string;
}

export default function EditAuthorForm({ initialAuthor, authorId }: EditAuthorFormProps) {
  const router = useRouter();
  const showNotification = useNotificationStore((state) => state.showNotification);
  const [author, setAuthor] = useState<AuthorFormData | null>(initialAuthor);

  useEffect(() => {
    setAuthor(initialAuthor);
  }, [initialAuthor]);

  const handleUpdateAuthor = async (data: AuthorFormData) => {
    try {
      await updateAuthor(authorId, data);
      showNotification("Autor actualizado con éxito", "success");
      router.push("/authors");
    } catch (error) {
      console.error("Error al actualizar el autor:", error);
      showNotification("Error al actualizar el autor", "error");
    }
  };

  if (!author) {
    return <div>Autor no encontrado.</div>;
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Editar Autor</h1>
      <AuthorForm
        onSubmit={handleUpdateAuthor}
        defaultValues={author}
      />
    </div>
  );
}