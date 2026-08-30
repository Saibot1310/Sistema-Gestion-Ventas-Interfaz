import { Producto } from "./dominio";

const CLAVE_PRODUCTOS = "catalogo:productos";

export function guardarProductos(listaProductos: Producto[]): void {
  try {
    localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(listaProductos));
  } catch (error) {
    console.error("No se pudo guardar el catálogo en el localStorage", error);
  }
}

export function cargarProductos(): Producto[] | null {
  try {
    const crudo = localStorage.getItem(CLAVE_PRODUCTOS);
    return crudo ? (JSON.parse(crudo) as Producto[]) : null;
  } catch (error) {
    console.error("No se puedo leer el catalogo de localStorage:", error);
    return null;
  }
}