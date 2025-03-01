import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

   private BASE_URL = environment.apiUrl + '/pagos';

  constructor(private http: HttpClient) { }

  getPagos(): Observable<any[]> {
    return this.http.get<any[]>(this.BASE_URL);
  }

  getPago(id: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/${id}`);
  }

  createPago(pago: any) {
    return this.http.post<any>(`${this.BASE_URL}`, pago);
  }

  updatePago(id: number, pago: any): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/${id}`, pago);
  }

  deletePago(id: number): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/${id}`);
  }
}
