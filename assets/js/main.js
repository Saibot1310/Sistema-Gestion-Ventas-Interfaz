import { agregarProducto, calcularEstadoStock, eliminarProductoPorId, generarIdProducto, productos, reemplazarProductos } from "./dominio.js";
import { actualizarEstadoBotonGuardar, mostrarErrorCampo } from "./formulario.js";
import { marcarPaginaActiva } from "./navegacion.js";
import { renderizarProductos, renderizarTabla } from "./render.js";

marcarPaginaActiva();

const categorias = document.querySelectorAll("#categorias li");
const resumenStock = document.getElementById("resumen-stock");
const botonGuardar = document.querySelector("#agregar-producto button[type='submit']");
const tbodyProductos = document.querySelector("#productos tbody");
const formularioProducto = document.querySelector("#agregar-producto form");

if (categorias.length > 0) {
  categorias.forEach(li => {
    li.textContent = `📦 ${li.textContent}`;
  });
}

if (tbodyProductos) {
  renderizarProductos(productos, tbodyProductos);

  tbodyProductos.addEventListener("click", (event) => {
    const botonEliminar = event.target.closest("button.btn-eliminar");
    if (!botonEliminar) return;

    const fila = botonEliminar.closest("#productos tbody tr");
    const id = Number(fila.dataset.idProducto);

    reemplazarProductos(eliminarProductoPorId(productos, id));
    renderizarTabla(productos, tbodyProductos, resumenStock);
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

    const productoNuevo = {
      id: generarIdProducto(productos),
      nombre: datosFormulario.nombre,
      precio: datosFormulario.precio,
      stock: calcularEstadoStock(datosFormulario.cantidad),
    };

    reemplazarProductos(agregarProducto(productos, productoNuevo));
    renderizarTabla(productos, tbodyProductos, resumenStock);

    formularioProducto.reset();
    actualizarEstadoBotonGuardar(formularioProducto, botonGuardar);
  });

  actualizarEstadoBotonGuardar(formularioProducto, botonGuardar);
}