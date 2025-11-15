import { Component, inject, OnInit, signal } from '@angular/core';
import { AlmacenService } from '../../../services/almacen-service';
import { SucursalService } from '../../../services/sucursal-service';

@Component({
  selector: 'app-almacen-component',
  standalone: false,
  templateUrl: './almacen-component.html',
  styleUrl: './almacen-component.scss'
})
export class AlmacenComponent implements OnInit{
  
  almacenes = signal([]);

  sucursales= signal([]);
  selectedSucursal = signal(-1)
  
  almacenService = inject(AlmacenService);
  sucursalService = inject(SucursalService);
  
  ngOnInit(): void {
    this.getAlmacenes();
    this.getSucursales();
  }

  getAlmacenes(){
    this.almacenService.funListar(this.selectedSucursal()).subscribe(
      (res: any) => {
        this.almacenes.set(res);
      }
    )
  }

  getSucursales(){
    this.sucursalService.funListar().subscribe(
      (res: any) => {
        this.sucursales.set(res);
      }
    )
  }


}
