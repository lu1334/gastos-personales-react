import React, {
  useState,
  useContext,
  createContext,
  type ReactNode,
  useEffect,
} from "react";
import {
  type Temporal,
  type EstadoGasto,
  type Gastos,
  type GastosAccions,
} from "../types/types";



const gastosContext = createContext<GastosAccions | undefined>(undefined);
export function GastosProvider({ children }: { children: ReactNode }) {

  const [temporal, setTemporal] = useState<Temporal>("");
  const [nombreGastos, setNombreGastos] = useState<string>("");
  const [cantidadGastos, setCantidadGastos] = useState<string>("");
  const [categoriaGastos, setCategoriaGastos] = useState<string>("");
  const [estadoGastos, setEstadoGastos] = useState<EstadoGasto>("Pendiente");
  const [listaGastos, setListaGastos] = useState<Gastos[]>(() => {
    const datosGuardados = localStorage.getItem("listaGastos");
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });
  const handlerSeleccionarSegun = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTemporal(e.target.value as Temporal);
  };
  const handlerOnchangeNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombreGastos(e.target.value);
  };
  const handlerOnchangeCantidad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cantidad = e.target.value
    setCantidadGastos(cantidad);
    if (Number(cantidad) < 0) {
    alert("La cantidad no puede ser negativa");
    return;
  }
    
  };
  const handlerOnchangeCategoria = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategoriaGastos(e.target.value);
  };
  const handlerOnchangeEstadoActualizado = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number
  ) => {
    const nuevaLista = listaGastos.map((gasto) => {
      if (gasto.id === id) {
        return { ...gasto, estado: e.target.value as EstadoGasto };
      }
      return gasto;
    });
    setListaGastos(nuevaLista);
  };
  const handlerEliminar = (id: number) => {
    setListaGastos((prev) => {
      return prev.filter((g) => {
        return g.id !== id;
      });
    });
  };
  const handlerToggleEstado = (id: number) => {
    setListaGastos((prev) => {
      return prev.map((gasto) => {
        if (gasto.id === id) {
          return { ...gasto, estado: estadoGastos };
        }
        return gasto;
      });
    });
  };
  const handlerAgregar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nombreEncontrado = listaGastos.some(
      (gasto) => gasto.nombre === nombreGastos
    );
    if (nombreEncontrado) {
      alert(
        "El nombre que intenta ingresar ya se encuentra en la base de datos"
      );
      return;
    }
    if (!nombreGastos || !cantidadGastos || !categoriaGastos || !estadoGastos)
      return; 
    setListaGastos((prev) => [
      ...prev,
      {
        id: Date.now(),
        nombre: nombreGastos,
        cantidad: cantidadGastos,
        categoria: categoriaGastos,
        estado: estadoGastos,
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
        handlerSeleccionarSegun,
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
