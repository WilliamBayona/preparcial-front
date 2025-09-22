"use client";

import { useState} from "react";
import { useRouter } from "next/navigation";
import AuthorForm  from "../ui/AuthorForm";
import { AuthorFormData } from "../validation/authorSchema";
import { createAuthor } from "../services/authorService";
import { useNotificationStore } from "@/shared/store/useNotificationStore";



export default function AuthorCreatePage() {

  const showNotification = useNotificationStore((state) => state.showNotification);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCreateAuthor = async (data: AuthorFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
        await createAuthor(data);
        showNotification("Author created successfully!", "success");
        router.push("/authors");
    } catch (err) {
        setError(err instanceof Error ? err.message : "Error creating author. Please try again.");
    } finally {
        setIsSubmitting(false);
    }

  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Crear Nuevo Autor</h1>
      <AuthorForm onSubmit={handleCreateAuthor} isSubmitting={isSubmitting} />
        {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
