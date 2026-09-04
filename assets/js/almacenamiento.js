const CLAVE_PRODUCTOS = "catalogo:productos";
function esEstadoStockValido(valor) {
    return valor === 'Disponible' || valor === 'Agotado';
}
function esProductoValido(valor) {
    if (typeof valor !== 'object' || valor === null)
        return false;
    const candidato = valor;
    return (typeof candidato.id === 'number' &&
        typeof candidato.nombre === 'string' &&
        typeof candidato.precio === 'number' &&
        esEstadoStockValido(candidato.stock));
}
export function guardarProductos(listaProductos) {
    try {
        localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(listaProductos));
    }
    catch (error) {
        console.error("No se pudo guardar el catálogo en el localStorage", error);
    }
}
export function cargarProductos() {
    try {
        const crudo = localStorage.getItem(CLAVE_PRODUCTOS);
        if (!crudo)
            return null;
        const parseado = JSON.parse(crudo);
        if (!Array.isArray(parseado) || !parseado.every(esProductoValido)) {
            console.error('El catálogo guardado en localStorage tiene un formato inválido');
            return null;
        }
        return parseado;
    }
    catch (error) {
        console.error("No se puedo leer el catalogo de localStorage:", error);
        return null;
    }
}
//# sourceMappingURL=almacenamiento.js.map