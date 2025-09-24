const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

// ... (otras funciones del servicio)

export const getBookById = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      // Usamos 'no-store' para asegurar que los datos siempre estén actualizados.
      cache: 'no-store', 
    });

    if (!response.ok) {
      throw new Error(`Error fetching book: ${response.statusText}`);
    }
    
    // La estructura del libro debe coincidir con la que proveíste.
    return await response.json();
  } catch (error) {
    console.error('Failed to get book by ID:', error);
    return null;
  }
};