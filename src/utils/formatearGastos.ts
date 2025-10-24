import type { Gastos ,RetornoMostrarDatos, Temporal} from "../types/types";

export function formatearGastos(arr:Gastos[],temporal:Temporal):RetornoMostrarDatos{
    if(temporal === "categoria"){
        return arr.reduce((acc,gasto)=>{
            const catg = gasto.categoria
            if(!acc[catg])acc[catg]=[] //lo pongo todo en una sola linea y evito el uso de llaves {}
            acc[catg].push(gasto)
            return acc
        },{} as RetornoMostrarDatos)
    }
    else{
        return arr.reduce((acc,gasto)=>{
            const estado = gasto.estado
            if(!acc[estado])acc[estado]=[] //lo pongo todo en una sola linea y evito el uso de llaves {}
            acc[estado].push(gasto)
            return acc
        },{} as RetornoMostrarDatos)
    }

}