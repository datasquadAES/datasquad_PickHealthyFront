import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private BASE_URL = environment.apiUrl + '/menu';
  private BASE_DUMMY_URL =
    'http://127.0.0.1:5500/src/app/database/products.html';

  constructor(private http: HttpClient) {}

  getMenus(): Observable<any[]> {
    return this.http.get<any[]>(this.BASE_URL).pipe(
      map((menu) =>
        menu.map((product: any) => {
          return { ...product, units: 0 };
        })
      )
    );
  }

  getMenu(id: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/${id}`);
  }

  createMenu(menu: any): Observable<any> {
    return this.http.post<any>(this.BASE_URL, menu);
  }

  updateMenu(id: number, menu: any): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/${id}`, menu);
  }

  deleteMenu(id: number): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/${id}`);
  }

}
