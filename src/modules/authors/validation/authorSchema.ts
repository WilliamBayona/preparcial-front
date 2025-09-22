import {z} from "zod";
export const authorSchema = z.object({
    name:z
    .string()
    .min(3, {message: "El nombre debe tener al menos 3 caracteres"})
    .max(100, {message: "El nombre debe tener como máximo 100 caracteres"}),

    description:z
    .string()
    .min(10, {message: "La descripción debe tener al menos 10 caracteres"})
    .max(500, {message: "La descripción debe tener como máximo 500 caracteres"}),

    birthDate:z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {message: "La fecha de nacimiento debe ser una fecha válida"}),

    image:z
    .url({message: "La imagen debe ser una URL válida"}),
});
export type AuthorFormData = z.infer<typeof authorSchema>;