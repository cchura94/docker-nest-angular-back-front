import { Component, inject, signal } from '@angular/core';
import { ProductoService } from '../../../services/producto-service';
import { Producto } from '../../../interfaces/producto';
import { DetalleProducto } from '../../../interfaces/detalle-producto';
import { EntidadcomercialService } from '../../../services/entidadcomercial-service';
import { NotaService } from '../../../services/nota-service';
import { AlmacenService } from '../../../services/almacen-service';
import Swal from 'sweetalert2';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

@Component({
  selector: 'app-nota-venta-component',
  standalone: false,
  templateUrl: './nota-venta-component.html',
  styleUrl: './nota-venta-component.scss'
})
export class NotaVentaComponent {

  selectedAlmacen = signal('');
selectedSucursal = signal(-1);
  sucursales = signal([]);
  almacenes = signal([])
  buscar = signal("")
  products = signal([]);
  totalRecords = signal(0);
  loading = signal(false);
  carrito = signal<DetalleProducto[]>([]);
  entidad_comercial = signal<any[]>([]);
  search_clie = signal("");
  cliente_seleccionado = signal<any>({});
  

    cols!: Column[];

  visible = signal(false)

  productoService = inject(ProductoService);
  entidadComercialService = inject(EntidadcomercialService);
  notaService = inject(NotaService);
  almacenService = inject(AlmacenService)

  constructor(){
    // this.funGetEntidadComercial();
    this.funGetAlmacenes();
  }



  showDialogCliente(){
    this.visible.set(true);
  }

  funGetAlmacenes(){
    this.almacenService.funListar(1).subscribe(
      (res: any) => {
        console.log(res.data)
        this.almacenes.set(res);
      }
    )
  }

  calcularStock(almacenes_prod: any){
    let total = 0;
    almacenes_prod.forEach((item: any) => {
      total += item.pivot.cantidad_actual
    });

    return total;
  }
  
  cargarDatos(event: any){
    let page = event.first / event.rows + 1;

    this.funGetProductos(page, event.rows);
  }

  addCarrito(prod: any){
    let nuevo_prod = {id: prod.id,nombre: prod.nombre, precio_venta_actual: prod.precio_venta_actual, cantidad: 1}
    let posicion = this.carrito().findIndex((item) => item.id=== prod.id);
    // alert(posicion);
    if(posicion>=0){
      if(this.calcularStock(prod.almacens) > this.carrito()[posicion].cantidad){
        this.carrito()[posicion].cantidad++;
      }
    }else{
      this.carrito().push(nuevo_prod);
    }
  }

  funGetProductos(page: number = 1, limit: number = 5){
    this.loading.set(true)
    this.productoService.funListar("1", page, limit, this.buscar()).subscribe(
      (res: any) => {
        this.products.set(res.data);
        this.totalRecords.set(res.total);

        this.loading.set(false);
      }
    )
  }

  funGetEntidadComercial(){
    this.entidadComercialService.funListar(this.search_clie()).subscribe(
      (res: any) => {
        this.entidad_comercial.set(res.data);
      }
    )
  }
  seleccionarCliente(clie: any){
    this.cliente_seleccionado.set(clie);
    this.entidad_comercial.set([]);
  }

  quitarCarrito(carr: DetalleProducto){

    let pos = this.carrito().indexOf(carr);
    this.carrito().splice(pos, 1);

  }

  funRegistrarVenta(){
    let movimientos: any[] = [];
    let subtotal = 0;
    this.carrito().forEach((item) => {
      subtotal += (item.precio_venta_actual * item.cantidad)
      movimientos.push({
        producto_id: item.id,
        almacen_id: 1,
        cantidad: item.cantidad,
        tipo_movimiento: 'salida',
        precio_unitario_compra: 0,
        precio_unitario_venta: item.precio_venta_actual,
        total_linea: item.precio_venta_actual * item.cantidad,
        observaciones: 'sin Observaciones',
      });

    });

    let datos = {
        codigo_nota: 'COD-'+Date.now(),
        tipo_nota: 'venta',
        entidad_comercial_id: this.cliente_seleccionado().id,
        subtotal: subtotal,
        impuestos: 0,
        descuento_total: 0,
        total_calculado: subtotal,
        estado_nota: 'entregado',
        observaciones: 'Sin Observaciones',
        movimientos: movimientos
    }

    this.notaService.funGuardar(datos).subscribe(
      (res: any) =>{
        console.log(res);
        Swal.fire({
          title: "Venta Registrada!",
          text: "Ok!",
          icon: "success"
        });
      }, 
      (error) => {
        console.log(error);
        alert("Error")
      }
    );


  }
}
