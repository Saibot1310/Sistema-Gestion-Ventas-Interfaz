export let productos = [
    { id: 1, nombre: "Auriculares inalámbricos", precio: 45000, stock: "Disponible" },
    { id: 2, nombre: "Lámpara de escritorio LED", precio: 12500, stock: "Disponible" },
    { id: 3, nombre: "Zapatillas urbanas talle 42", precio: 38000, stock: "Agotado" },
    { id: 4, nombre: "Cafetera eléctrica", precio: 27000, stock: "Disponible" },
    { id: 5, nombre: "Mochila impermeable", precio: 19900, stock: "Agotado" },
];
export function formatearPrecio(precio) {
    return `$${precio.toLocaleString("es-AR")}`;
}
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
export function crearProductoDesdeFormulario(datosFormulario, listaProductos) {
    return {
        id: generarIdProducto(listaProductos),
        nombre: datosFormulario.nombre,
        precio: Number(datosFormulario.precio),
        stock: calcularEstadoStock(datosFormulario.cantidad),
    };
}
export function descripcionEstado(estado) {
    switch (estado) {
        case "Disponible":
            return "Hay stock disponbile";
        case "Agotado":
            return "Sin stock";
        default:
            const _exhaustivo = estado;
            return _exhaustivo;
    }
}
//# sourceMappingURL=dominio.js.map