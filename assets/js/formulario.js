const mensajesError = {
    "nombre-producto": "Ingresa un nombre para el producto.",
    "precio-producto": "El precio debe ser un número mayor o igual a 0.",
    "cantidad-producto": "La cantidad en stock debe ser un número mayor o igual a 0.",
    "descuento-producto": "El descuento debe estar entre 0 y 100",
};
export function mostrarErrorCampo(campo) {
    const idCampo = campo.id;
    const contenedorError = document.querySelector(`[data-error-para=${campo.id}]`);
    if (!contenedorError)
        return;
    contenedorError.textContent = campo.validity.valid
        ? ""
        : (mensajesError[idCampo] ?? "Este campo no es válido");
}
export function actualizarEstadoBotonGuardar(formulario, boton) {
    boton.disabled = !formulario.checkValidity();
}
//# sourceMappingURL=formulario.js.map