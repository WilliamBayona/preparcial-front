"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthorForm from "./AuthorForm";
import { createAuthorComplete } from "../services/authorService"; // Cambiar aquí
import { AuthorFormData } from "../validation/authorSchema";

export default function CreateAuthorForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: AuthorFormData) => {
    setIsSubmitting(true);
    try {
      // Usar createAuthorComplete en lugar de createAuthor
      await createAuthorComplete(data);
      router.push("/authors");
      router.refresh();
    } catch (error) {
      console.error("Error creating author:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Crear Nuevo Autor</h1>
      <AuthorForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}