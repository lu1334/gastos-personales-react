import { useGastosContext } from "../context/GastosContext";

export const useResetFormulario = ()=>{
    const {setNombreGastos,setCantidadGastos,setCategoriaGastos} = useGastosContext()

    return ()=>{
        setNombreGastos("")
        setCantidadGastos("")
        setCategoriaGastos("")
    }
}