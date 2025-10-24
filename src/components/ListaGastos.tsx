import { useGastosContext } from "../context/GastosContext";
import { formatearGastos } from "../utils/formatearGastos";
import type { RetornoMostrarDatos } from "../types/types";
import { BtnEliminar } from "./botones/btnEliminar";
import { BtnToggle } from "./botones/btnToggle";
export function ListaGastos() {
  const { listaGastos,temporal } = useGastosContext();
  const agrupados: RetornoMostrarDatos = formatearGastos(listaGastos,temporal);

  if (listaGastos.length === 0) {
    return <p className="text-center text-gray-500 mt-6">No hay gastos aún. Agrega uno para comenzar</p>;
  }

  return (
    <>
      {Object.entries(agrupados).map(([catgEstado, gastos], i) => {
        const total = gastos.reduce((acc, gasto) => acc + Number(gasto.cantidad), 0);
        return (
          <div
            key={catgEstado + i}
            className="bg-white border border-gray-200 shadow-sm rounded-lg p-5 mb-6 transition-transform hover:scale-[1.01]"
          >
            <h2 className="text-2xl font-bold text-blue-500 mb-4">{catgEstado}</h2>
            <ul>
              {gastos.map((gasto) => (
                <li
                  key={gasto.id}
                  className="flex justify-between items-center py-2 border-b last:border-b-0"
                >
                  <span className="text-gray-800 font-medium">{gasto.nombre}</span>
                  <div className="flex gap-2">
                    <BtnEliminar id={gasto.id} />
                    <BtnToggle id={gasto.id} />
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-right font-semibold text-gray-700 mt-2">Total: {total}</p>
          </div>
        );
      })}
    </>
  );
}
