import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../interfaces/article.interface';
import {Md5} from 'ts-md5';


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private http = inject(HttpClient);
  
private JSON_SERVER_URL: String = "http://localhost:3000";  

  constructor() { }

  // TODO: handle errors within each request
  
  getFavorites(): Observable<Article[]>{
    return this.http.get<Article[]>(`${this.JSON_SERVER_URL}/favorites`);
  }

  getFavoritesByUserId(userId: String): Observable<Article[]>{
    return this.http.get<Article[]>(`${this.JSON_SERVER_URL}/favorites?userId=${userId}`);
  }

  deleteFavorite(url: string): Observable<Article>{
    const id = Md5.hashStr(url);
    return this.http.delete<Article>(`${this.JSON_SERVER_URL}/favorites/${id}`);
  }

  postFavorite(article: Article): Observable<Article>{
    article.id = Md5.hashStr(article.url);
    return this.http.post<Article>(`${this.JSON_SERVER_URL}/favorites`, article);
  }

  putFavorite(id: String, article: Article): Observable<Article>{
    return this.http.put<Article>(`${this.JSON_SERVER_URL}/favorites/${id}`, article);
  }
}
