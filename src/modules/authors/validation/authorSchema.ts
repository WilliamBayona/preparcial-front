import { z } from "zod";

// Esquema para el editorial del libro
const editorialSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Editorial name is required"),
});

// Esquema para la organización del premio
const organizationSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Organization name is required"),
  tipo: z.enum(["PUBLICA", "PRIVADA"]),
});

// Esquema para los datos del libro
const bookSchema = z.object({
  name: z.string().min(1, "Book name is required"),
  isbn: z.string().min(1, "ISBN is required"),
  image: z.string().url("Must be a valid URL"),
  publishingDate: z.string().min(1, "Publishing date is required"),
  description: z.string().min(1, "Book description is required"),
  editorial: editorialSchema,
});

// Esquema para los datos del premio
const prizeSchema = z.object({
  premiationDate: z.string().min(1, "Premiation date is required"),
  name: z.string().min(1, "Prize name is required"),
  description: z.string().min(1, "Prize description is required"),
  organization: organizationSchema,
});

// Esquema base del autor
export const authorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  birthDate: z.string().min(1, "Birth date is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Must be a valid URL"),
  // Agregar los campos obligatorios
  book: bookSchema,
  prize: prizeSchema,
});

export type AuthorFormData = z.infer<typeof authorSchema>;