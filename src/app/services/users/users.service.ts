import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  BASE_URL = environment.apiUrl + '/usuarios';

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  //TODO validar funcionamiento
  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  public set setCurrentUser(currentUser : any) {
    this.currentUserSubject.next(currentUser)
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.BASE_URL}/login`, { username: username, password: password })
      .pipe(
        (user: any) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getUsers() {
    return this.http.get<any[]>(this.BASE_URL);
  }

  getUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/${id}`);
  }

  getUserByCredentials(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/login`, { username: username, password: password });
  }

  createUser(user: any){
    return this.http.post<any>(this.BASE_URL, user);
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/${id}`);
  }
}
