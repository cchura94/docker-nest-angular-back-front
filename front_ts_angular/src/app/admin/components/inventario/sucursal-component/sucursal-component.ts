import { Component, inject, OnInit, signal } from '@angular/core';
import { SucursalService } from '../../../services/sucursal-service';

@Component({
  selector: 'app-sucursal-component',
  standalone: false,
  templateUrl: './sucursal-component.html',
  styleUrl: './sucursal-component.scss'
})
export class SucursalComponent implements OnInit{


  sucursales= signal([]);

  sucursalService = inject(SucursalService);
   
   ngOnInit(): void {
     this.getSucursales();
   }
  getSucursales(){
     this.sucursalService.funListar().subscribe(
       (res: any) => {
         this.sucursales.set(res);
       }
     )
   }

}
