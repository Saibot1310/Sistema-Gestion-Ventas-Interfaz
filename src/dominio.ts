export type EstadoStock = "Disponible" | "Agotado";

export interface Producto {
  readonly id: number;
  nombre: string;
  precio: number;
  stock: EstadoStock;
}

export interface DatosFormularioProducto {
  nombre: string;
  precio: string;
  cantidad: string;
  descuento: string;
}

export let productos: Producto[] = [
  { id: 1, nombre: "Auriculares inalámbricos", precio: 45000, stock: "Disponible" },
  { id: 2, nombre: "Lámpara de escritorio LED", precio: 12500, stock: "Disponible" },
  { id: 3, nombre: "Zapatillas urbanas talle 42", precio: 38000, stock: "Agotado" },
  { id: 4, nombre: "Cafetera eléctrica", precio: 27000, stock: "Disponible" },
  { id: 5, nombre: "Mochila impermeable", precio: 19900, stock: "Agotado" },
];

export function formatearPrecio(precio: number): string {
  return `$${precio.toLocaleString("es-AR")}`;
}

export function agregarProducto(listaProductos: Producto[], productoNuevo: Producto): Producto[] {
  return [...listaProductos, productoNuevo];
}

export function eliminarProductoPorId(listaProductos: Producto[], id: number): Producto[] {
  return listaProductos.filter(producto => producto.id !== id);
}

export function generarIdProducto(listaProductos: Producto[]): number {
  const maximoActual = listaProductos.reduce((max, producto) => Math.max(max, producto.id), 0);
  return maximoActual + 1;
}

export function calcularEstadoStock(cantidad: string): EstadoStock {
  return Number(cantidad) > 0 ? "Disponible" : "Agotado";
}

export function reemplazarProductos(nuevaLista: Producto[]): void {
  productos = nuevaLista;
}

export function crearProductoDesdeFormulario(
  datosFormulario: DatosFormularioProducto,
  listaProductos: Producto[]
): Producto {
  return {
    id: generarIdProducto(listaProductos),
    nombre: datosFormulario.nombre,
    precio: Number(datosFormulario.precio),
    stock: calcularEstadoStock(datosFormulario.cantidad),
  };
}

export function descripcionEstado(estado: EstadoStock): string {
  switch (estado) {
    case "Disponible":
      return "Hay stock disponbile";
    case "Agotado":
      return "Sin stock";
    default:
      const _exhaustivo: never = estado;
      return _exhaustivo;
  }
}