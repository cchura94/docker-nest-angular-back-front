import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ProductoService } from '../../../services/producto-service';
import { SucursalService } from '../../../services/sucursal-service';
import { AlmacenService } from '../../../services/almacen-service';
import { CategoriaService } from '../../../services/categoria-service';
import { Categoria } from '../../../interfaces/categoria';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

@Component({
  selector: 'app-producto-component',
  standalone: false,
  templateUrl: './producto-component.html',
  styleUrl: './producto-component.scss'
})
export class ProductoComponent implements OnInit{
  
  productoService = inject(ProductoService)
  sucursalService = inject(SucursalService)
  almacenService = inject(AlmacenService)
  categoriaService = inject(CategoriaService)


    products = signal<any[]>([]);

    product!: any;

    selectedProducts!: any[] | null;

    submitted: boolean = false;

    cols!: Column[];

  @ViewChild('dt') dt!: Table;

  almacenes = signal([])
  selectedAlmacen = signal('');
  totalRecords = signal(0)
  sucursales = signal([])
selectedSucursal = signal(-1);
  loading = signal(false);

  buscar = signal("");
  productDialog = signal<boolean>(false);
  categorias = signal<Categoria[]>([]);

  productDialogImagen = signal<boolean>(false);
  producto_seleccionado = signal({});



  ngOnInit(): void {
    this.funGetProductos();
    this.funGetSucursales();
    this.funGetCategorias();

  }

  cargarDatos(event: any){
    let page = event.first / event.rows + 1;

    this.funGetProductos(page, event.rows);
  }

  funGetProductos(page: number = 1, limit: number = 5){
    this.loading.set(true)
    this.productoService.funListar(this.selectedAlmacen(), page, limit, this.buscar()).subscribe(
      (res: any) => {
        this.products.set(res.data);
        this.totalRecords.set(res.total);

        this.loading.set(false);
      }
    )
  }

  funGetCategorias(){
    this.categoriaService.index().subscribe(
      (res: any) => {
        console.log(res.data)
        this.categorias.set(res);
      }
    )
  }


  funGetSucursales(){
    this.sucursalService.funListar().subscribe(
      (res: any) => {
        this.sucursales.set(res);
      }
    )
  }

  funGetAlmacenes(){
    this.almacenService.funListar(this.selectedSucursal()).subscribe(
      (res: any) => {
        console.log(res.data)
        this.almacenes.set(res);
      }
    )
  }


  exportCSV() {
      this.dt.exportCSV();
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog.set(true);
}

hideDialog() {
  this.productDialog.set(false);
  this.submitted = false;
}

hideDialogImagen(){
  this.productDialogImagen.set(false);

}

editProduct(product: any) {
  this.product = { ...product };
  this.productDialog.set(true);
}

deleteProduct(prod: any) {
  
}


  saveProduct() {
      this.submitted = true;

      if (this.product.nombre?.trim()) {
          if (this.product.id) {
            
          } else {
            this.productoService.funGuardar(this.product).subscribe(
              (res: any) => {
                
                alert("Producto Registrado")
                this.productDialog.set(false);
              }
            )
          }

          this.product = {};
      }
    }

    editImagenProduct(prod: any){
      this.productDialogImagen.set(true);
      this.producto_seleccionado.set(prod);
    }
    

    funSubirImagen(event: any){
      console.log(event.files[0]);
      const imagen = event.files[0];

      let formData = new FormData();
      formData.append("imagen", imagen);
console.log(this.producto_seleccionado());
      this.productoService.actualizarImagen(this.producto_seleccionado(), formData).subscribe(
        (res) => {
          this.hideDialogImagen();
          this.funGetProductos();
        }
      )

    }
}
