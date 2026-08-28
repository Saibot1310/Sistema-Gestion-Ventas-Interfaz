console.log("app.js cargado - documento listo:", document.readyState);

const contenidoPrincipal = document.getElementById("contenido-principal");
const categorias = document.querySelectorAll("#categorias li");
const disponibles = document.getElementsByClassName("disponible");
const titulo = document.querySelector("h1");
const resumenStock = document.getElementById("resumen-stock");
const camposObligatorios = document.querySelectorAll("#agregar-producto input[required]");
const botonGuardar = document.querySelector("#agregar-producto button[type='submit']");

const filasProductos = document.querySelectorAll("#productos tbody tr");
const tbodyProductos = document.querySelector("#productos tbody");

const productos = [
  { id: 1, nombre: "Auriculares inalámbricos", precio: "$45.000", stock: "Disponible" },
  { id: 2, nombre: "Lámpara de escritorio LED", precio: "$12.500", stock: "Disponible" },
  { id: 3, nombre: "Zapatillas urbanas talle 42", precio: "$38.000", stock: "Agotado" },
  { id: 4, nombre: "Cafetera eléctrica", precio: "$27.000", stock: "Disponible" },
  { id: 5, nombre: "Mochila impermeable", precio: "$19.900", stock: "Agotado" },
]

if (categorias.length > 0) {
  categorias.forEach(li => {
    li.textContent = `📦 ${li.textContent}`;
  });
}

function crearFilaProducto({ id, nombre, precio, stock }) {
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

  fila.append(celdaNombre, celdaPrecio, celdaStock);
  return fila;
}

function renderizarProductos(listaProductos, tbody) {
  if (!tbody) return;

  const fragmento = document.createDocumentFragment();
  listaProductos.forEach(producto => {
    fragmento.append(crearFilaProducto(producto));
  });
  tbody.append(fragmento);
}

renderizarProductos(productos, tbodyProductos);

if (resumenStock) {
  const totalProductos = document.querySelectorAll("#productos tbody tr").length;
  const totalDisponibles = disponibles.length;
  resumenStock.innerHTML = `<strong>${totalDisponibles}</strong> de <strong>${totalProductos}</strong> productos disponibles`;
}

if (camposObligatorios.length > 0) {
  camposObligatorios.forEach(campo => {
    console.log(`${campo.id} es obligatorio:`, campo.hasAttribute("required"));
  })
}

if (botonGuardar) {
  console.log("Botón de guardar detectado, disabled actual:", botonGuardar.disabled);
}

const primeraCelda = document.querySelector("#productos td");

if (primeraCelda) {
  const filaContenedora = primeraCelda.parentElement;
  console.log("Fila encontrada, id de producto:", filaContenedora.dataset.idProducto);
}

if (tbodyProductos) {
  console.log("Filas en el DOM:", tbodyProductos.children.length, "| Productos en el arreglo:", productos.length);
  console.log("Primera fila", tbodyProductos.firstElementChild?.dataset.idProducto);
  console.log("Última fila", tbodyProductos.lastElementChild?.dataset.idProducto);
}

const filaAgotada = document.querySelector("#productos tr.agotado");

if (filaAgotada) {
  console.log("Fila agotada:", filaAgotada.dataset.idProducto);
  console.log("Fila siguiente:", filaAgotada.nextElementSibling?.dataset.idProducto ?? "no hay más fila");
  console.log("Fila anterior:", filaAgotada.previousElementSibling?.dataset.idProducto ?? "es la primera");
}

function obtenerFilaProducto(elementoOrigen) {
  return elementoOrigen.closest("#productos tbody tr");
}

const celdaDePrueba = document.querySelector("#productos td");
if (celdaDePrueba) {
  const filaObtenida = obtenerFilaProducto(celdaDePrueba);
  console.log("closest() encontró la fila con id:", filaObtenida?.dataset.idProducto);
}

if (tbodyProductos && celdaDePrueba) {
  console.log("¿La fila pertenece al tbody esperado?", tbodyProductos.contains(celdaDePrueba));
}