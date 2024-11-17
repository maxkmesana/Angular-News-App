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
export class UserService{

  private http = inject(HttpClient);
  private JSON_SERVER_URL: String = "http://localhost:3000";  

  private localStorageKey = 'token';
  authSignSubject = new BehaviorSubject<ActiveUser | null>(this.loadUserFromLocalStorage()); 
  loggedUserId$ = this.authSignSubject.asObservable();


  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.JSON_SERVER_URL}/users`);
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

  loadUserFromLocalStorage(): ActiveUser | null {
    const user = localStorage.getItem(this.localStorageKey);
    return user ? JSON.parse(user) : null;
  }

  saveUserToLocalStorage(user: { id?: string, username?: string } | undefined): void {
    if (user) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.localStorageKey);
    }
  }

  singup(user: User): Observable<boolean> {
    const hashedPass = this.hashPassword(user.password);
    user.password = hashedPass; // Client side password hashing it's never used, client sent plane text password and it's hashed in server, anyways dont have one
    return this.http.post<User>(`${this.JSON_SERVER_URL}/users` ,user).pipe(
      map(({ id, username }) => {
        if(id){
          const loggedInUser = { id, username };
          this.saveUserToLocalStorage(loggedInUser);
          this.authSignSubject.next({ id, username });
          return true;
        }
        return false;
      })
    )
  }

  login(username: string, password: string):  Observable<boolean>{
    return this.http.get<User[]>(`${this.JSON_SERVER_URL}/users?username=${username}`).pipe(
      map((users) => {
        const check = users.at(0);
        const verifyPass = bcrypt.compareSync(password, check!.password);
        if(verifyPass && check && check.username === username){
          const checked: ActiveUser = ({id: check.id!, username: check.username})
          this.saveUserToLocalStorage(checked);
          this.authSignSubject.next({id: check.id!, username: check.username})
          return true
        }else{
          return false;
        }
      })
    )
  }

  logout(): void {
    this.authSignSubject.next(null); 
    this.saveUserToLocalStorage(undefined); 
  }
}
