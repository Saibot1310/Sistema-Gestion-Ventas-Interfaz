console.log("app.js cargado - documento listo:", document.readyState);

const contenidoPrincipal = document.getElementById("contenido-principal");
const categorias = document.querySelectorAll("#categorias li");
const disponibles = document.getElementsByClassName("disponible");
const titulo = document.querySelector("h1");
const resumenStock = document.getElementById("resumen-stock");
const camposObligatorios = document.querySelectorAll("#agregar-producto input[required]");
const botonGuardar = document.querySelector("#agregar-producto button[type='submit']");

const filasProductos = document.querySelectorAll("#productos tbody tr");

if (categorias.length > 0) {
  categorias.forEach(li => {
    li.textContent = `📦 ${li.textContent}`;
  })
}

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

if (filasProductos.length > 0) {
  filasProductos.forEach(fila => {
    const celdaStock = fila.querySelector("td:last-child");
    if (!celdaStock) return;

    const estaAgotado = celdaStock.textContent.trim() === "Agotado";

    fila.classList.toggle("agotado", estaAgotado);
    fila.classList.toggle("disponible", !estaAgotado);

    console.log(`Producto #${fila.dataset.idProducto} -> esta sincronizado:`, [...fila.classList]);
  });
}