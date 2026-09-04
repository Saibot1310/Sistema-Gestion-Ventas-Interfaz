import { cargarProductos, guardarProductos } from "./almacenamiento.js";
import { obtenerProductosExternos } from "./api.js";
import { agregarProducto, crearProductoDesdeFormulario, eliminarProductoPorId, productos, reemplazarProductos } from "./dominio.js";
import type { DatosFormularioProducto } from "./dominio";
import { actualizarEstadoBotonGuardar, mostrarErrorCampo } from "./formulario.js";
import { marcarPaginaActiva } from "./navegacion.js";
import { renderizarTabla } from "./render.js";


marcarPaginaActiva();

const productosGuardados = cargarProductos();
if (productosGuardados) {
  reemplazarProductos(productosGuardados);
}

const categorias = document.querySelectorAll<HTMLElement>("#categorias li");
const resumenStock = document.getElementById("resumen-stock");
const botonGuardar = document.querySelector<HTMLButtonElement>("#agregar-producto button[type='submit']");
const tbodyProductos = document.querySelector<HTMLTableSectionElement>("#productos tbody");
const formularioProducto = document.querySelector<HTMLFormElement>("#agregar-producto form");
const botonCargarExterno = document.getElementById("cargar-externo");
const estadoCarga = document.getElementById("estado-carga");

if (categorias.length > 0) {
  categorias.forEach(li => {
    li.textContent = `📦 ${li.textContent}`;
  });
}

if (tbodyProductos) {
  renderizarTabla(productos, tbodyProductos, resumenStock);

  tbodyProductos.addEventListener("click", (event: MouseEvent) => {
    const objetivo = event.target as HTMLElement;
    const botonEliminar = objetivo.closest("button.btn-eliminar");
    if (!botonEliminar) return;

    const fila = botonEliminar.closest<HTMLTableRowElement>("#productos tbody tr");

    if (!fila) return;

    const id = Number(fila.dataset.idProducto);

    reemplazarProductos(eliminarProductoPorId(productos, id));
    guardarProductos(productos);
    renderizarTabla(productos, tbodyProductos, resumenStock);
  });
}

if (botonCargarExterno && estadoCarga) {
  botonCargarExterno.addEventListener("click", async () => {
    estadoCarga.textContent = "Cargando productos...";

    try {
      const productosExternos = await obtenerProductosExternos("https://fakestoreapi.com/products");
      estadoCarga.textContent = "";
      renderizarTabla(productosExternos, tbodyProductos, resumenStock);
    } catch (error: unknown) {
      estadoCarga.textContent = "No se pudierno cargar los productos. Intenta nuevamente";
      if (error instanceof Error) {
        console.error(error);
      } else {
        console.error("Error desconocido al cargar el catálogo externo", error);
      }
    }
  });
}

if (formularioProducto && botonGuardar) {
  formularioProducto.addEventListener("focusout", (event: FocusEvent) => {
    const campo = event.target;
    if (!(campo instanceof HTMLInputElement)) return;
    mostrarErrorCampo(campo);
  });

  formularioProducto.addEventListener("input", (event: Event) => {
    const campo = event.target;
    if (!(campo instanceof HTMLInputElement)) return;   
    if (campo.validity.valid) mostrarErrorCampo(campo);
    actualizarEstadoBotonGuardar(formularioProducto, botonGuardar);
  });

  formularioProducto.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();

    const campos = [...formularioProducto.querySelectorAll<HTMLInputElement>("input")];
    const camposInvalidos = campos.filter(campo => !campo.validity.valid);

    camposInvalidos.forEach(mostrarErrorCampo);

    if (camposInvalidos.length > 0) {
      camposInvalidos[0]?.focus();
      return;
    }

    const datosFormulario = Object.fromEntries(new FormData(formularioProducto).entries()) as unknown as DatosFormularioProducto;

    const productoNuevo = crearProductoDesdeFormulario(datosFormulario, productos);

    reemplazarProductos(agregarProducto(productos, productoNuevo));
    guardarProductos(productos);
    renderizarTabla(productos, tbodyProductos, resumenStock);

    formularioProducto.reset();
    actualizarEstadoBotonGuardar(formularioProducto, botonGuardar);
  });

  actualizarEstadoBotonGuardar(formularioProducto, botonGuardar);
}