import { useGastosContext } from "../../context/GastosContext";

export function BtnEliminar({ id }: { id: number }) {
  const { handlerEliminar } = useGastosContext();
  return (
    <>
      <button onClick={() => handlerEliminar(id)}>Eliminar</button>
    </>
  );
}
