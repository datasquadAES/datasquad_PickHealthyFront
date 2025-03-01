import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private BASE_URL = environment.apiUrl + '/menu';

  constructor(private http: HttpClient) { }

  getMenus(): Observable<any[]> {
    return this.http.get<any[]>(this.BASE_URL);
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
