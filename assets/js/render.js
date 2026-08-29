export function crearFilaProducto({ id, nombre, precio, stock }) {
  const fila = document.createElement("tr");

  fila.dataset.idProducto = id;
  fila.classList.toggle("disponible", stock === "Disponible");
  fila.classList.toggle("agotado", stock === "Agotado");

  const celdaNombre = document.createElement("th");
  celdaNombre.scope = "row";
  celdaNombre.textContent = nombre;

  const celdaPrecio = document.createElement("td");
  celdaPrecio.textContent = precio;

  const celdaStock = document.createElement("td");
  celdaStock.textContent = stock;

  const celdaAcciones = document.createElement("td");
  const botonEliminar = document.createElement("button");
  botonEliminar.type = "button";
  botonEliminar.textContent = "Eliminar";
  botonEliminar.classList.add("btn-eliminar");
  celdaAcciones.append(botonEliminar);

  fila.append(celdaNombre, celdaPrecio, celdaStock, celdaAcciones);
  return fila;
}

export function renderizarProductos(listaProductos, tbody) {
  if (!tbody) return;

  const fragmento = document.createDocumentFragment();
  listaProductos.forEach(producto => {
    fragmento.append(crearFilaProducto(producto));
  });
  tbody.append(fragmento);
}

export function actualizarResumenStock(listaProductos, resumenStock) {
  if (!resumenStock) return;
  const totalProductos = listaProductos.length
  const totalDisponibles = listaProductos.filter(producto => producto.stock === "Disponible").length;
  resumenStock.innerHTML = `<strong>${totalDisponibles}</strong> de <strong>${totalProductos}</strong>`; 
}

export function renderizarTabla(listaProductos, tbody, resumenStock) {
  if (!tbody) return;

  tbody.innerHTML = "";
  renderizarProductos(listaProductos, tbody);
  actualizarResumenStock(listaProductos, resumenStock);
}