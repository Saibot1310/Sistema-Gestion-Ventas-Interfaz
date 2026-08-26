console.log("app.js cargado - documento listo:", document.readyState);

const contenidoPrincipal = document.getElementById("contenido-principal");
const categorias = document.querySelectorAll("#categorias li");
const disponibles = document.getElementsByClassName("disponible");
const titulo = document.querySelector("h1");

if (categorias.length > 0) {
  categorias.forEach(li => {
    li.textContent = `📦 ${li.textContent}`;
  })
}

const resumenStock = document.getElementById("resumen-stock");

if (resumenStock) {
  const totalProductos = document.querySelectorAll("#productos tbody tr").length;
  const totalDisponibles = disponibles.length;
  resumenStock.innerHTML = `<strong>${totalDisponibles}</strong> de <strong>${totalProductos}</strong> productos disponibles`;
}