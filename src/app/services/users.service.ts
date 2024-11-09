import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, map, Observable, Subject, switchMap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { ActiveUser } from '../interfaces/active-user';
import { FormControl } from '@angular/forms';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{

  ngOnInit(): void {
  }

  private http = inject(HttpClient);
  
  private JSON_SERVER_URL: String = "http://localhost:3000";  

  constructor() { }

  private authSignSubject = new BehaviorSubject<ActiveUser | undefined>(undefined);  // FIXME: SACAR ESE TRES PORQUE ES DE TESTEOOOO/solved
  loggedUserId$ = this.authSignSubject.asObservable();


  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.JSON_SERVER_URL}/users`);
  }

  getUserById(id: String): Observable<User>{
    return this.http.get<User>(`${this.JSON_SERVER_URL}/users/${id}`);
  }

  deleteUser(id: String): Observable<User>{
    return this.http.delete<User>(`${this.JSON_SERVER_URL}/users/${id}`);
  }

  putUser(id: String, user: User): Observable<User>{
    return this.http.post<User>(`${this.JSON_SERVER_URL}/users/${id}`, user);
  }

  checkDuplicated(emailControl: FormControl<string | null>): Observable<boolean> {
    return emailControl.valueChanges.pipe(
      debounceTime(300),
      filter(email => !!email),
      switchMap(email => this.getUsers().pipe(
        map(users => users.some(user => user.email === email))
      )),
      distinctUntilChanged()    
    )
  }

  hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);  
    return bcrypt.hashSync(password, salt); 
  }

  singup(user: User): Observable<boolean> {
    const hashedPass = this.hashPassword(user.password);
    user.password = hashedPass; // Client side password hashing is never used, the client sent plane text password and it's hashed in server, anyways dont have one
    return this.http.post<User>(`${this.JSON_SERVER_URL}/users` ,user).pipe(
      map(({ id, username }) => {
        if(id){
          this.authSignSubject.next({ id, username });
          return true;
        }
        return false;
      })
    )
  }

  login(username: string, password: string){
    return this.http.get<User[]>(`${this.JSON_SERVER_URL}?username=${username}`).pipe(
      map((users) => {
        const check = users.at(0);
        const verifyPass = bcrypt.compareSync(password, check!.password);
        if(verifyPass && check && check.username === username){
          this.authSignSubject.next({id: check.id!, username: check.username})
          return true
        }else{
          return false;
        }
      })
    )
  }
}
