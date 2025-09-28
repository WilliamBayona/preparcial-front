"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authorSchema, AuthorFormData } from "../validation/authorSchema";
import { useState } from "react";

interface AuthorFormProps {
  onSubmit: (data: AuthorFormData) => void;
  defaultValues?: Partial<AuthorFormData>;
  isSubmitting?: boolean;
}

export default function AuthorForm({
  onSubmit,
  defaultValues,
  isSubmitting,
}: AuthorFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorFormData>({
    resolver: zodResolver(authorSchema),
    defaultValues,
    mode: "onChange", // Validar mientras el usuario escribe
  });

  const handleFormSubmit = async (data: AuthorFormData) => {
    try {
      setSubmitError(null);
      await onSubmit(data);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Error al guardar");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        
        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {submitError}
          </div>
        )}

        {/* Sección de Información del Autor */}
        <div className="border-b pb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Información del Autor</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input 
                id="name" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
                {...register("name")} 
                placeholder="Nombre del autor"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>

            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                Fecha de Nacimiento <span className="text-red-500">*</span>
              </label>
              <input 
                id="birthDate" 
                type="date" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
                {...register("birthDate")} 
              />
              {errors.birthDate && <span className="text-red-500 text-sm">{errors.birthDate.message}</span>}
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción <span className="text-red-500">*</span>
            </label>
            <textarea 
              id="description" 
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
              {...register("description")} 
              placeholder="Descripción del autor"
            />
            {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
          </div>

          <div className="mt-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Imagen URL <span className="text-red-500">*</span>
            </label>
            <input 
              id="image" 
              type="url" 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"  
              {...register("image")} 
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
          </div>
        </div>

        {/* Sección de Información del Libro */}
        <div className="border-b pb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Información del Libro</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="book.name" className="block text-sm font-medium text-gray-700">
                Nombre del Libro <span className="text-red-500">*</span>
              </label>
              <input 
                id="book.name" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
                {...register("book.name")} 
                placeholder="Título del libro"
              />
              {errors.book?.name && <span className="text-red-500 text-sm">{errors.book.name.message}</span>}
            </div>

            <div>
              <label htmlFor="book.isbn" className="block text-sm font-medium text-gray-700">
                ISBN <span className="text-red-500">*</span>
              </label>
              <input 
                id="book.isbn" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
                {...register("book.isbn")} 
                placeholder="9788491167686"
              />
              {errors.book?.isbn && <span className="text-red-500 text-sm">{errors.book.isbn.message}</span>}
            </div>

            <div>
              <label htmlFor="book.publishingDate" className="block text-sm font-medium text-gray-700">
                Fecha de Publicación <span className="text-red-500">*</span>
              </label>
              <input 
                id="book.publishingDate" 
                type="date" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
                {...register("book.publishingDate")} 
              />
              {errors.book?.publishingDate && <span className="text-red-500 text-sm">{errors.book.publishingDate.message}</span>}
            </div>

            <div>
              <label htmlFor="book.image" className="block text-sm font-medium text-gray-700">
                Imagen del Libro URL <span className="text-red-500">*</span>
              </label>
              <input 
                id="book.image" 
                type="url" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
                {...register("book.image")} 
                placeholder="https://ejemplo.com/libro.jpg"
              />
              {errors.book?.image && <span className="text-red-500 text-sm">{errors.book.image.message}</span>}
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="book.description" className="block text-sm font-medium text-gray-700">
              Descripción del Libro <span className="text-red-500">*</span>
            </label>
            <textarea 
              id="book.description" 
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
              {...register("book.description")} 
              placeholder="Descripción del libro"
            />
            {errors.book?.description && <span className="text-red-500 text-sm">{errors.book.description.message}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="book.editorial.id" className="block text-sm font-medium text-gray-700">
                ID Editorial <span className="text-red-500">*</span>
              </label>
              <input 
                id="book.editorial.id" 
                type="number" 
                min="1"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
                {...register("book.editorial.id", { valueAsNumber: true })} 
                placeholder="1000"
              />
              {errors.book?.editorial?.id && <span className="text-red-500 text-sm">{errors.book.editorial.id.message}</span>}
            </div>

            <div>
              <label htmlFor="book.editorial.name" className="block text-sm font-medium text-gray-700">
                Nombre Editorial <span className="text-red-500">*</span>
              </label>
              <input 
                id="book.editorial.name" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
                {...register("book.editorial.name")} 
                placeholder="Nombre de la editorial"
              />
              {errors.book?.editorial?.name && <span className="text-red-500 text-sm">{errors.book.editorial.name.message}</span>}
            </div>
          </div>
        </div>

        {/* Sección de Información del Premio */}
        <div className="pb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Información del Premio</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="prize.name" className="block text-sm font-medium text-gray-700">
                Nombre del Premio <span className="text-red-500">*</span>
              </label>
              <input 
                id="prize.name" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
                {...register("prize.name")} 
                placeholder="Nombre del premio"
              />
              {errors.prize?.name && <span className="text-red-500 text-sm">{errors.prize.name.message}</span>}
            </div>

            <div>
              <label htmlFor="prize.premiationDate" className="block text-sm font-medium text-gray-700">
                Fecha de Premiación <span className="text-red-500">*</span>
              </label>
              <input 
                id="prize.premiationDate" 
                type="date" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
                {...register("prize.premiationDate")} 
              />
              {errors.prize?.premiationDate && <span className="text-red-500 text-sm">{errors.prize.premiationDate.message}</span>}
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="prize.description" className="block text-sm font-medium text-gray-700">
              Descripción del Premio <span className="text-red-500">*</span>
            </label>
            <textarea 
              id="prize.description" 
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
              {...register("prize.description")} 
              placeholder="Descripción del premio"
            />
            {errors.prize?.description && <span className="text-red-500 text-sm">{errors.prize.description.message}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label htmlFor="prize.organization.id" className="block text-sm font-medium text-gray-700">
                ID Organización <span className="text-red-500">*</span>
              </label>
              <input 
                id="prize.organization.id" 
                type="number" 
                min="1"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
                {...register("prize.organization.id", { valueAsNumber: true })} 
                placeholder="1000"
              />
              {errors.prize?.organization?.id && <span className="text-red-500 text-sm">{errors.prize.organization.id.message}</span>}
            </div>

            <div>
              <label htmlFor="prize.organization.name" className="block text-sm font-medium text-gray-700">
                Nombre Organización <span className="text-red-500">*</span>
              </label>
              <input 
                id="prize.organization.name" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
                {...register("prize.organization.name")} 
                placeholder="Nombre de la organización"
              />
              {errors.prize?.organization?.name && <span className="text-red-500 text-sm">{errors.prize.organization.name.message}</span>}
            </div>

            <div>
              <label htmlFor="prize.organization.tipo" className="block text-sm font-medium text-gray-700">
                Tipo Organización <span className="text-red-500">*</span>
              </label>
              <select 
                id="prize.organization.tipo" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
                {...register("prize.organization.tipo")}
              >
                <option value="">Seleccione un tipo</option>
                <option value="PUBLICA">PUBLICA</option>
                <option value="PRIVADA">PRIVADA</option>
              </select>
              {errors.prize?.organization?.tipo && <span className="text-red-500 text-sm">{errors.prize.organization.tipo.message}</span>}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Guardando...
              </div>
            ) : (
              "Guardar Autor"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
