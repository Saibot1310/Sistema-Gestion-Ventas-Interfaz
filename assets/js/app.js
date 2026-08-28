const categorias = document.querySelectorAll("#categorias li");
const resumenStock = document.getElementById("resumen-stock");
const botonGuardar = document.querySelector("#agregar-producto button[type='submit']");
const tbodyProductos = document.querySelector("#productos tbody");
const formularioProducto = document.querySelector("#agregar-producto form");

let productos = [
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

  const celdaAcciones = document.createElement("td");
  const botonEliminar = document.createElement("button");
  botonEliminar.type = "button";
  botonEliminar.textContent = "Eliminar";
  botonEliminar.classList.add("btn-eliminar");
  celdaAcciones.append(botonEliminar);

  fila.append(celdaNombre, celdaPrecio, celdaStock, celdaAcciones);
  return fila;
}

if (tbodyProductos) {
  tbodyProductos.addEventListener("click", (event) => {
    const botonEliminar = event.target.closest("button.btn-eliminar");
    if (!botonEliminar) return;

    const fila = obtenerFilaProducto(botonEliminar);
    const id = Number(fila.dataset.idProducto);

    productos = eliminarProductoPorId(productos, id);
    renderizarTabla();
  });
}

function actualizarResumenStock() {
  if (!resumenStock) return;
  const totalProductos = document.querySelectorAll("#productos tbody tr").length;
  const totalDisponibles = document.getElementsByClassName("disponible").length;
  resumenStock.innerHTML = `<strong>${totalDisponibles}</strong> de <strong>${totalProductos}</strong>`; 
}

function renderizarProductos(listaProductos, tbody) {
  if (!tbody) return;

  const fragmento = document.createDocumentFragment();
  listaProductos.forEach(producto => {
    fragmento.append(crearFilaProducto(producto));
  });
  tbody.append(fragmento);
}

function obtenerFilaProducto(elementoOrigen) {
  return elementoOrigen.closest("#productos tbody tr");
}

function renderizarTabla() {
  if (!tbodyProductos) return;

  tbodyProductos.innerHTML = "";
  renderizarProductos(productos, tbodyProductos);
  actualizarResumenStock();
}

function agregarProducto(listaProductos, productoNuevo) {
  return [...listaProductos, productoNuevo];
}

function eliminarProductoPorId(listaProductos, id) {
  return listaProductos.filter(producto => producto.id !== id);
}

function generarIdProducto(listaProductos) {
  const maximoActual = listaProductos.reduce((max, producto) => Math.max(max, producto.id), 0);
  return maximoActual + 1;
}

renderizarProductos(productos, tbodyProductos);
actualizarResumenStock();

const mensajesError = {
  "nombre-producto": "Ingresa un nombre para el producto.",
  "precio-producto": "El precio debe ser un número mayor o igual a 0.",
  "cantidad-producto": "La cantidad en stock debe ser un número mayor o igual a 0."
};

function mostrarErrorCampo(campo) {
  const contenedorError = document.querySelector(`[data-error-para=${campo.id}]`);
  if (!contenedorError) return;

  contenedorError.textContent = campo.validity.valid
    ? ""
    : (mensajesError[campo.id] ?? "Este campo no es válido");
}

if (formularioProducto) {
  formularioProducto.addEventListener("focusout", (event) => {
    if (!event.target.matches("input")) return;
    mostrarErrorCampo(event.target);
  });

  formularioProducto.addEventListener("input", (event) => {
    if (!event.target.matches("input")) return;
    if (event.target.validity.valid) mostrarErrorCampo(event.target);
  });

  formularioProducto.addEventListener("submit", function(event) {
    event.preventDefault();

    const campos = [...formularioProducto.querySelectorAll("input")];
    const camposInvalidos = campos.filter(campo => !campo.validity.valid);

    camposInvalidos.forEach(mostrarErrorCampo);

    if (camposInvalidos.length > 0) {
      camposInvalidos[0].focus();
      return;
    }

    const datosFormulario = Object.fromEntries(new FormData(formularioProducto).entries());

    const productoNuevo = {
      id: generarIdProducto(productos),
      nombre: datosFormulario.nombre,
      precio: datosFormulario.precio,
      stock: Number(datosFormulario.cantidad) > 0 ? "Disponible" : "Agotado"
    };

    productos = agregarProducto(productos, productoNuevo);
    renderizarTabla();

    formularioProducto.reset();
    actualizarEstadoBotonGuardar();
  });

  function actualizarEstadoBotonGuardar() {
    const formularioValido = formularioProducto.checkValidity();
    botonGuardar.disabled = !formularioValido;
  }

  formularioProducto.addEventListener("input", actualizarEstadoBotonGuardar);
  actualizarEstadoBotonGuardar();
}