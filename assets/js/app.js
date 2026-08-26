console.log("app.js cargado - documento listo:", document.readyState);

const contenidoPrincipal = document.getElementById("contenido-principal");
console.log("Contenido principal:", contenidoPrincipal);

const primerEnlaceNav = document.querySelector("nav a");
console.log("Primer enlace de navegación:", primerEnlaceNav);

const categorias = document.querySelectorAll("#categorias li");
console.log("Cantidad de categorias encontradas:", categorias.length);

const disponibles = document.getElementsByClassName("disponible");
console.log("Cantidad de productos disponibles:", disponibles.length);