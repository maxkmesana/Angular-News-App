import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{

  ngOnInit(): void {
  }

  private http = inject(HttpClient);
  
  private JSON_SERVER_URL: String = "http://localhost:3000";  

  constructor() { }

  private loggedUserId = new BehaviorSubject<string>("3"); // FIXME: SACAR ESE TRES PORQUE ES DE TESTEOOOO
  loggedUserId$ = this.loggedUserId.asObservable();


  // should happen on successful login? maybe?
  setLoggedUserId(userId: string){
    this.loggedUserId.next(userId);
  }

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
