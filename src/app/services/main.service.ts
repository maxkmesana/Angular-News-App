import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Favorite } from '../interfaces/favorite.interface';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  private http = inject(HttpClient);
  
  private JSON_SERVER_URL: String = "http://localhost:300";
  private NEWS_API_KEY: String = "" // FROM .env ONLY
  private NEWS_API_URL: String = "https://newsapi.org/v2/everything"
  

  constructor() { }

  // TODO: handle errors within each request
  
  // Users requests
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

  // Favorites requests
  getFavorites(): Observable<Favorite[]>{
    return this.http.get<Favorite[]>(`${this.JSON_SERVER_URL}/favorites`);
  }

  getFavoritesByUserId(userId: String): Observable<Favorite[]>{
    return this.http.get<Favorite[]>(`${this.JSON_SERVER_URL}/favorites?userId=${userId}`);
  }

  deleteFavorite(id: String): Observable<Favorite>{
    return this.http.delete<Favorite>(`${this.JSON_SERVER_URL}/favorites/${id}`);
  }

  postFavorite(favorite: Favorite): Observable<Favorite>{
    return this.http.post<Favorite>(`${this.JSON_SERVER_URL}/favorites`, favorite);
  }

  putFavorite(id: String, favorite: Favorite): Observable<Favorite>{
    return this.http.put<Favorite>(`${this.JSON_SERVER_URL}/favorites/${id}`, favorite);
  }
  
  // News API (might be part of a different service)
}
