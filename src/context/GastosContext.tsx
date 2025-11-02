import React, {
  useState,
  useContext,
  createContext,
  type ReactNode,
  useEffect,
} from "react";
import {type  Temporal, type EstadoGasto, type Gastos, type GastosAccions } from "../types/types";

const gastosContext = createContext<GastosAccions | undefined>(undefined);

export function GastosProvider({ children }: { children: ReactNode }) {
  const [temporal,setTemporal]= useState<Temporal>("categoria")
  const [nombreGastos, setNombreGastos] = useState<string>("");
  const [cantidadGastos, setCantidadGastos] = useState<string>("");
  const [categoriaGastos, setCategoriaGastos] = useState<string>("");
  const [estadoGastos, setEstadoGastos] = useState<EstadoGasto>("Pendiente");
  const [listaGastos, setListaGastos] = useState<Gastos[]>(() => {
    const datosGuardados = localStorage.getItem("listaGastos");
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });
  const handlerSeleccionarSegun = (e: React.ChangeEvent<HTMLSelectElement>) => setTemporal(e.target.value as Temporal)
  const handlerOnchangeNombre = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNombreGastos(e.target.value);
  const handlerOnchangeCantidad = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCantidadGastos(e.target.value);
  const handlerOnchangeCategoria = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setCategoriaGastos(e.target.value);
  const handlerOnchangeEstadoActualizado = (e: React.ChangeEvent<HTMLSelectElement>,id:number) =>{
    const nuevaLista = listaGastos.map((gasto)=>(
      gasto.id === id?{...gasto,estado:e.target.value as EstadoGasto}:gasto
    ))
    setListaGastos(nuevaLista)
  }
  const handlerEliminar = (id: number) => {
    setListaGastos((prev) => prev.filter((g) => g.id !== id));
  };
  const handlerToggleEstado =(id:number)=>{
    setListaGastos(prev=>prev.map((gasto)=>(
      gasto.id === id? {...gasto,estado:estadoGastos}:gasto
    )))
  }
  const handlerAgregar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nombreGastos || !cantidadGastos || !categoriaGastos || !estadoGastos) return;
    setNombreGastos("");
    setCantidadGastos("");
    setCategoriaGastos("");

    setListaGastos((prev) => [
      ...prev,
      {
        id: Date.now(),
        nombre: nombreGastos,
        cantidad: cantidadGastos,
        categoria: categoriaGastos,
        estado:estadoGastos
      },
    ]);
  };
  useEffect(() => {
    localStorage.setItem("listaGastos", JSON.stringify(listaGastos));
  }, [listaGastos]);

  return (
    <gastosContext.Provider
      value={{
        temporal,
        setTemporal,
        nombreGastos,
        setNombreGastos,
        cantidadGastos,
        setCantidadGastos,
        categoriaGastos,
        setCategoriaGastos,
        estadoGastos,
        setEstadoGastos,
        listaGastos,
        setListaGastos,
        handlerOnchangeNombre,
        handlerOnchangeCantidad,
        handlerOnchangeCategoria,
        handlerOnchangeEstadoActualizado,
        handlerToggleEstado,
        handlerAgregar,
        handlerEliminar,
        handlerSeleccionarSegun
      }}
    >
      {children}
    </gastosContext.Provider>
  );
}

export const useGastosContext = () => {
  const res = useContext(gastosContext);
  if (!res) {
    throw new Error("El componente tiene que estar dentro del provider");
  }
  return res;
};
