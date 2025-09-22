"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authorSchema, AuthorFormData } from "../validation/authorSchema";


interface AuthorFormProps {
  onSubmit: (data: AuthorFormData) => void;
  defaultValues?: AuthorFormData;
  isSubmitting?: boolean;
}

export default function AuthorForm({
  onSubmit,
  defaultValues,
  isSubmitting,
}: AuthorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorFormData>({
    resolver: zodResolver(authorSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
        <input id="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" {...register("name")} />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea id="description" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" {...register("description")} />
        {errors.description && <span className="text-red-500">{errors.description.message}</span>}
      </div>

      <div>
        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
        <input id="birthDate" type="date" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" {...register("birthDate")} />
        {errors.birthDate && <span className="text-red-500">{errors.birthDate.message}</span>}
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Imagen</label>
        <input id="image" type="url" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"  {...register("image")} />
        {errors.image && <span className="text-red-500">{errors.image.message}</span>}
      </div>

      <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
};
