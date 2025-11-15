import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-inventario',
  standalone: false,
  templateUrl: './inventario.html',
  styleUrl: './inventario.scss'
})
export class Inventario {

  items: MenuItem[] = [
    { label: 'Categoria', routerLink: '/admin/inventario/categoria' },
    { label: 'Producto', routerLink: '/admin/inventario/producto' },
    { label: 'Almacen', routerLink: '/admin/inventario/almacenes', },
    { label: 'Sucursales', routerLink: '/admin/inventario/sucursales', }
  ];

  inv: MenuItem = { icon: 'pi pi-home', routerLink: '/admin/inventario' };

}
