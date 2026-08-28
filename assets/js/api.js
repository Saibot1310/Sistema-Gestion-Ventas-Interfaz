export async function obtenerProductosExternos(url) {

  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error(`Error HTTP: ${respuesta.status}`);
  }

  const datosExternos = await respuesta.json();

  return datosExternos.map(item => ({
    id: item.id,
    nombre: item.title,
    precio: `$${item.price}`,
    stock: "Disponible",
  }));
}