import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any[]>(`${environment.apiUrl}/usuarios`);
  }

  getUser(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${id}`);
  }

  createUser(user: any){
    return this.http.post<any>(environment.apiUrl, user);
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/${id}`);
  }
}
