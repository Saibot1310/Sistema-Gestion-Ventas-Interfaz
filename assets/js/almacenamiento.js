const CLAVE_PRODUCTOS = "catalogo:productos";
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
        return parseado;
    }
    catch (error) {
        console.error("No se puedo leer el catalogo de localStorage:", error);
        return null;
    }
}
//# sourceMappingURL=almacenamiento.js.map