import { inject, Injectable } from '@angular/core';
import { Categoria } from '../interfaces/categoria';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = environment.url_production;
  http = inject(HttpClient);

  index():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${this.apiUrl}/categoria`);
  }

  store(datos: Categoria):Observable<Categoria>{
    return this.http.post<Categoria>(`${this.apiUrl}/categoria`, datos)
  }

  show(id: number):Observable<Categoria>{
    return this.http.get<Categoria>(`${this.apiUrl}/categoria/${id}`)
  }

  update(id: number, datos: Categoria):Observable<Categoria>{
    return this.http.put<Categoria>(`${this.apiUrl}/categoria/${id}`, datos);
  }

  destroy(id: number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/categoria/${id}`);
  }
  
}
