import { useGastosContext } from "../../context/GastosContext";

export function BtnToggle({ id }: { id: number }) {
  const { listaGastos, handlerOnchangeEstadoActualizado } = useGastosContext();

  const gastoActual = listaGastos.find((gasto) => gasto.id === id);
  if (!gastoActual) return null;

  return (
    <>
      <label htmlFor={`estado-${id}`}>Estado</label>
      <select
        id={`estado-${id}`}
        value={gastoActual.estado}
        onChange={(e) => handlerOnchangeEstadoActualizado(e, id)}
      >
        <option value="Pendiente">Pendiente</option>
        <option value="Pagado">Pagado</option>
      </select>
    </>
  );
}
