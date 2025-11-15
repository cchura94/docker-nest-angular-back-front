import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {
  urlBase = environment.url_production;

  http = inject(HttpClient);

  funListar(id_sucursal: number){
    return this.http.get(`${this.urlBase}/almacen?sucursal=${id_sucursal}`);
  }

  funGuardar(datos: any){
    return this.http.post(`${this.urlBase}/almacenes`, datos);
  }

  funMostrar(id: number){
    return this.http.get(`${this.urlBase}/almacenes/${id}`);
  }

  funModificar(id: number, datos: any){
    return this.http.put(`${this.urlBase}/almacenes/${id}`, datos);
  }

  funEliminar(id: number){
    return this.http.delete(`${this.urlBase}/almacenes/${id}`);
  }
}
