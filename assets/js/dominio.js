export let productos = [
  { id: 1, nombre: "Auriculares inalámbricos", precio: "$45.000", stock: "Disponible" },
  { id: 2, nombre: "Lámpara de escritorio LED", precio: "$12.500", stock: "Disponible" },
  { id: 3, nombre: "Zapatillas urbanas talle 42", precio: "$38.000", stock: "Agotado" },
  { id: 4, nombre: "Cafetera eléctrica", precio: "$27.000", stock: "Disponible" },
  { id: 5, nombre: "Mochila impermeable", precio: "$19.900", stock: "Agotado" },
];

export function agregarProducto(listaProductos, productoNuevo) {
  return [...listaProductos, productoNuevo];
}

export function eliminarProductoPorId(listaProductos, id) {
  return listaProductos.filter(producto => producto.id !== id);
}

export function generarIdProducto(listaProductos) {
  const maximoActual = listaProductos.reduce((max, producto) => Math.max(max, producto.id), 0);
  return maximoActual + 1;
}

export function calcularEstadoStock(cantidad) {
  return Number(cantidad) > 0 ? "Disponible" : "Agotado";
}

export function reemplazarProductos(nuevaLista) {
  productos = nuevaLista;
}