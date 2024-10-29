import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  private http = inject(HttpClient);
  
  private JSON_SERVER_URL: String = "http://localhost:300";  

  constructor() { }

  // TODO: handle errors within each request
  
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.JSON_SERVER_URL}/users`);
  }

  getUserById(id: String): Observable<User>{
    return this.http.get<User>(`${this.JSON_SERVER_URL}/users/${id}`);
  }

  deleteUser(id: String): Observable<User>{
    return this.http.delete<User>(`${this.JSON_SERVER_URL}/users/${id}`);
  }

  postUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.JSON_SERVER_URL}/users`, user);
  }

  putUser(id: String, user: User): Observable<User>{
    return this.http.post<User>(`${this.JSON_SERVER_URL}/users/${id}`, user);
  }
}
