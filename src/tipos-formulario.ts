import type { DatosFormularioProducto } from "./dominio";

export type ClaveCampoFormulario = keyof DatosFormularioProducto;
export type IdCampoFormulario = `${ClaveCampoFormulario}-producto`;