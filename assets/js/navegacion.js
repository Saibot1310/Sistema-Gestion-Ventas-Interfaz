export function marcarPaginaActiva() {
    const paginaActual = location.pathname.split("/").pop() || "index.html";
    const enlaces = document.querySelectorAll("nav a");
    enlaces.forEach(enlace => {
        const esActual = enlace.getAttribute("href") === paginaActual;
        enlace.classList.toggle("activo", esActual);
        if (esActual) {
            enlace.setAttribute("aria-current", "page");
        }
        else {
            enlace.removeAttribute("aria-current");
        }
    });
}
//# sourceMappingURL=navegacion.js.map