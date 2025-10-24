import type React from "react";

export type EstadoGasto = "Pendiente" | "Pagado";

export interface Gastos {
  id: number;
  nombre: string;
  cantidad: string;
  categoria: string;
  estado: EstadoGasto;
}

export type Temporal = "estado" | "categoria"| "";

export type RetornoMostrarDatos = Record<string, Gastos[]>;

export interface GastosAccions {
  temporal: Temporal;
  setTemporal: React.Dispatch<React.SetStateAction<Temporal>>;
  nombreGastos: string;
  cantidadGastos: string;
  categoriaGastos: string;
  estadoGastos: EstadoGasto;
  setEstadoGastos: React.Dispatch<React.SetStateAction<EstadoGasto>>;
  setNombreGastos: React.Dispatch<React.SetStateAction<string>>;
  setCantidadGastos: React.Dispatch<React.SetStateAction<string>>;
  setCategoriaGastos: React.Dispatch<React.SetStateAction<string>>;
  listaGastos: Gastos[];
  setListaGastos: React.Dispatch<React.SetStateAction<Gastos[]>>;
  handlerOnchangeNombre: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlerOnchangeCantidad: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlerOnchangeCategoria: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handlerOnchangeEstadoActualizado: (e: React.ChangeEvent<HTMLSelectElement>,id:number) => void;
  handlerEliminar: (id: number) => void;
  handlerAgregar: (e: React.FormEvent<HTMLFormElement>) => void;
  handlerSeleccionarSegun: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handlerToggleEstado: (id: number) => void;
}
