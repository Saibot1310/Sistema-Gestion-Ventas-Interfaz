import { EstadoStock, Producto } from "./dominio";

interface ProductoExternoCrudo {
  id: number;
  title: string;
  price: number;
}

function esProductoExternoCrudo(valor: unknown): valor is ProductoExternoCrudo {
  if (typeof valor !== 'object' || valor === null) return false;
  const candidato = valor as Record<string, unknown>;

  return (
    typeof candidato.id === "number" &&
    typeof candidato.title === "string" &&
    typeof candidato.price === "number"
  );
}

function transformarProductoExterno(crudo: ProductoExternoCrudo): Producto {
  const stockPorDefecto: EstadoStock = 'Disponible'; // fakestoreapi no informa stock: decisión de negocio explícita

  return {
    id: crudo.id,
    nombre: crudo.title,
    precio: crudo.price,
    stock: stockPorDefecto,
  };
}

export async function obtenerProductosExternos(url: string): Promise<Producto[]> {

  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error(`Error HTTP: ${respuesta.status}`);
  }

  const datosExternos: unknown = await respuesta.json();

  if (!Array.isArray(datosExternos)) {
    throw new Error("Respuesta externa con formato insesperado: se esperaba un array");
  }

  const productosValidos = datosExternos.filter(esProductoExternoCrudo);

  return productosValidos.map(transformarProductoExterno);
}