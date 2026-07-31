export const ROL_ADMIN = 'SUPER-ADMIN-ROLE';

export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string | null;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
  cantidadEnStock: number;
  categoria: Categoria;
}

export interface Usuario {
  id: number;
  email: string;
  rol: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  rol: string;
}

export interface CategoriaRequest {
  nombre: string;
  descripcion: string | null;
}

export interface ProductoRequest {
  nombre: string;
  descripcion: string | null;
  precio: number;
  cantidadEnStock: number;
  categoriaId: number;
}
