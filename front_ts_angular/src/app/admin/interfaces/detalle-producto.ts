import { Categoria } from "./categoria";

export interface DetalleProducto{
    id: number;
    nombre: string;
    precio_venta_actual: number;
    cantidad: number;
}