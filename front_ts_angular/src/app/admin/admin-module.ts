import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { Perfil } from './components/perfil/perfil';
import { User } from './components/user/user';
import { Role } from './components/role/role';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriaComponent } from './components/inventario/categoria-component/categoria-component';
import { ProductoComponent } from './components/inventario/producto-component/producto-component';
import { Inventario } from './components/inventario/inventario';
import { SucursalComponent } from './components/inventario/sucursal-component/sucursal-component';
import { AlmacenComponent } from './components/inventario/almacen-component/almacen-component';
import { NotaVentaComponent } from './components/movimientos/nota-venta-component/nota-venta-component';
import { PrimengModule } from "./../primeng/primeng-module"

@NgModule({
  declarations: [
    Perfil,
    User,
    Role,
    CategoriaComponent,
    ProductoComponent,
    Inventario,
    SucursalComponent,
    AlmacenComponent,
    NotaVentaComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule
  ]
})
export class AdminModule { }
