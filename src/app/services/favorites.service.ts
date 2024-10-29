import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favorite } from '../interfaces/favorite.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private http = inject(HttpClient);
  
  private JSON_SERVER_URL: String = "http://localhost:300";  

  constructor() { }

  // TODO: handle errors within each request
  
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
}
