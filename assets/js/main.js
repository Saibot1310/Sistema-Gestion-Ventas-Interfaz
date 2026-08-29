import { cargarProductos, guardarProductos } from "./almacenamiento.js";
import { obtenerProductosExternos } from "./api.js";
import { agregarProducto, crearProductoDesdeFormulario, eliminarProductoPorId, productos, reemplazarProductos } from "./dominio.js";
import { actualizarEstadoBotonGuardar, mostrarErrorCampo } from "./formulario.js";
import { marcarPaginaActiva } from "./navegacion.js";
import { renderizarTabla } from "./render.js";

marcarPaginaActiva();

const productosGuardados = cargarProductos();
if (productosGuardados) {
  reemplazarProductos(productosGuardados);
}

const categorias = document.querySelectorAll("#categorias li");
const resumenStock = document.getElementById("resumen-stock");
const botonGuardar = document.querySelector("#agregar-producto button[type='submit']");
const tbodyProductos = document.querySelector("#productos tbody");
const formularioProducto = document.querySelector("#agregar-producto form");
const botonCargarExterno = document.getElementById("cargar-externo");
const estadoCarga = document.getElementById("estado-carga");

if (categorias.length > 0) {
  categorias.forEach(li => {
    li.textContent = `📦 ${li.textContent}`;
  });
}

if (tbodyProductos) {
  renderizarTabla(productos, tbodyProductos, resumenStock);

  tbodyProductos.addEventListener("click", (event) => {
    const botonEliminar = event.target.closest("button.btn-eliminar");
    if (!botonEliminar) return;

    const fila = botonEliminar.closest("#productos tbody tr");
    const id = Number(fila.dataset.idProducto);

    reemplazarProductos(eliminarProductoPorId(productos, id));
    guardarProductos(productos);
    renderizarTabla(productos, tbodyProductos, resumenStock);
  });
}

if (botonCargarExterno) {
  botonCargarExterno.addEventListener("click", async () => {
    estadoCarga.textContent = "Cargando productos...";

    try {
      const productosExternos = await obtenerProductosExternos("https://fakestoreapi.com/products");
      estadoCarga.textContent = "";
      renderizarTabla(productosExternos, tbodyProductos, resumenStock);
    } catch (error) {
      estadoCarga.textContent = "No se pudierno cargar los productos. Intenta nuevamente";
      console.error(error);
    }
  });
}

if (formularioProducto) {
  formularioProducto.addEventListener("focusout", (event) => {
    if (!event.target.matches("input")) return;
    mostrarErrorCampo(event.target);
  });

  formularioProducto.addEventListener("input", (event) => {
    if (!event.target.matches("input")) return;
    if (event.target.validity.valid) mostrarErrorCampo(event.target);
    actualizarEstadoBotonGuardar(formularioProducto, botonGuardar);
  });

  formularioProducto.addEventListener("submit", (event) => {
    event.preventDefault();

    const campos = [...formularioProducto.querySelectorAll("input")];
    const camposInvalidos = campos.filter(campo => !campo.validity.valid);

    camposInvalidos.forEach(mostrarErrorCampo);

    if (camposInvalidos.length > 0) {
      camposInvalidos[0].focus();
      return;
    }

    const datosFormulario = Object.fromEntries(new FormData(formularioProducto).entries());

    const productoNuevo = crearProductoDesdeFormulario(datosFormulario, productos);

    reemplazarProductos(agregarProducto(productos, productoNuevo));
    guardarProductos(productos);
    renderizarTabla(productos, tbodyProductos, resumenStock);

    formularioProducto.reset();
    actualizarEstadoBotonGuardar(formularioProducto, botonGuardar);
  });

  actualizarEstadoBotonGuardar(formularioProducto, botonGuardar);
}