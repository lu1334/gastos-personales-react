import type React from "react";
import { useGastosContext } from "../context/GastosContext";
import { ListaGastos } from "./ListaGastos";
import { useResetFormulario } from "../hooks/useResetFormulario";
export function Formulario() {
  const {
    handlerSeleccionarSegun,
    temporal,
    nombreGastos,
    cantidadGastos,
    categoriaGastos,
    handlerOnchangeNombre,
    handlerOnchangeCantidad,
    handlerOnchangeCategoria,
    handlerAgregar,
  } = useGastosContext();
     const resetFormulario = useResetFormulario();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handlerAgregar(e);       // llama al context para agregar
    resetFormulario();       // limpia campos desde aquí
  };


  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-100 p-6 rounded-md shadow-sm max-w-md mx-auto"
      >
        <label htmlFor="nombre" className="font-semibold text-gray-700">Ingrese nombre:</label>
        <input
          id="nombre"
          type="text"
          value={nombreGastos}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handlerOnchangeNombre(e)
          }
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <label htmlFor="cantidad" className="font-semibold text-gray-700">Ingrese cantidad:</label>
        <input
          id="cantidad"
          type="number"
          min="0"
          max="10"
          value={cantidadGastos}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handlerOnchangeCantidad(e)
          }
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <label htmlFor="categoria" id="categoria" className="font-semibold text-gray-700">Categoria:</label>
        <select 
          name="" 
          id="categoria" 
          value={categoriaGastos} 
          onChange={(e)=>handlerOnchangeCategoria(e)}
          className="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">-</option>
          <option value="ropa">Ropa</option>
          <option value="alimentos">Alimentos</option>
          <option value="electrodomesticos">Electrodomestico</option>
        </select>
        <label htmlFor="mostrar" id="mostrar" className="font-semibold text-gray-700">Mostrar por:</label>
        <select 
          name="" 
          id="mostrar" 
          value={temporal} 
          onChange={(e)=>handlerSeleccionarSegun(e)}
          className="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">-</option>
          <option value="categoria">Categoria</option>
          <option value="estado">Estado</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Agregar
        </button>
      </form>
      <ListaGastos />
    </>
  );
}
