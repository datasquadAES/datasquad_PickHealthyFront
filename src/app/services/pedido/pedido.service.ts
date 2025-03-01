import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

   private BASE_URL = environment.apiUrl + '/pedidos';

  constructor(private http: HttpClient) { }

  getPedidos(): Observable<any[]> {
    return this.http.get<any[]>(this.BASE_URL);
  }

  getPedido(id: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/${id}`);
  }

  createPedido(pedido: any): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}`, pedido);
  }

  updatePedido(id: number, pedido: any): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/${id}`, pedido);
  }

  deletePedido(id: number): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/${id}`);
  }
}
