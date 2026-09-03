function esProductoExternoCrudo(valor) {
    if (typeof valor !== 'object' || valor === null)
        return false;
    const candidato = valor;
    return (typeof candidato.id === "number" &&
        typeof candidato.title === "string" &&
        typeof candidato.price === "number");
}
function transformarProductoExterno(crudo) {
    const stockPorDefecto = 'Disponible'; // fakestoreapi no informa stock: decisión de negocio explícita
    return {
        id: crudo.id,
        nombre: crudo.title,
        precio: crudo.price,
        stock: stockPorDefecto,
    };
}
export async function obtenerProductosExternos(url) {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
    }
    const datosExternos = await respuesta.json();
    if (!Array.isArray(datosExternos)) {
        throw new Error("Respuesta externa con formato insesperado: se esperaba un array");
    }
    const productosValidos = datosExternos.filter(esProductoExternoCrudo);
    return productosValidos.map(transformarProductoExterno);
}
//# sourceMappingURL=api.js.map