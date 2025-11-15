import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  urlBase = environment.url_production;

  http = inject(HttpClient);

  funListar(){
    return this.http.get(`${this.urlBase}/sucursales`);
  }

  funGuardar(datos: any){
    return this.http.post(`${this.urlBase}/sucursales`, datos);
  }

  funMostrar(id: number){
    return this.http.get(`${this.urlBase}/sucursales/${id}`);
  }

  funModificar(id: number, datos: any){
    return this.http.put(`${this.urlBase}/sucursales/${id}`, datos);
  }

  funEliminar(id: number){
    return this.http.delete(`${this.urlBase}/sucursales/${id}`);
  }
}
