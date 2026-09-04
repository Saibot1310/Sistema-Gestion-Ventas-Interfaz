export function marcarPaginaActiva(): void {
  const paginaActual = location.pathname.split("/").pop() || "index.html";
  const enlaces = document.querySelectorAll<HTMLAnchorElement>("nav a");

  enlaces.forEach(enlace => {
    const esActual = enlace.getAttribute("href") === paginaActual;
    enlace.classList.toggle("activo", esActual);

    if (esActual) {
      enlace.setAttribute("aria-current", "page");
    } else {
      enlace.removeAttribute("aria-current");
    }
  });
}