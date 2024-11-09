import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EMPTY, map, Observable, switchMap } from 'rxjs';
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
  
  markUserFavorites(articles: Article[], userId: string): Observable<Article[]> {
    return this.getFavoritesByUserId(userId).pipe(
      map(userFavorites => {
        return articles.map(article => ({
          ...article,
          isFavorite: userFavorites.some(fav => fav.url === article.url)
        }));
      })
    );
  }

  getFavorites(): Observable<Article[]>{
    return this.http.get<Article[]>(`${this.JSON_SERVER_URL}/favorites`);
  }

  getFavoritesByUserId(userId: string): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.JSON_SERVER_URL}/favorites?userId=${userId}`);
  }

  removeFromFavorites(articleUrl: string, userId: string): Observable<void> {
    // First get the specific favorite entry for this user and article
    return this.http.get<Article[]>(`${this.JSON_SERVER_URL}/favorites?userId=${userId}&url=${articleUrl}`)
      .pipe(
        switchMap(matches => {
          if (matches && matches[0]?.id) {
            return this.http.delete<void>(`${this.JSON_SERVER_URL}/favorites/${matches[0].id}`);
          }
          return EMPTY;
        })
      );
  }

  addToFavorites(article: Article, userId: string): Observable<Article> {
    return this.http.post<Article>(`${this.JSON_SERVER_URL}/favorites`, {
      ...article,
      userId,
      isFavorite: true
    });
  }

  putFavorite(id: String, article: Article): Observable<Article>{
    return this.http.put<Article>(`${this.JSON_SERVER_URL}/favorites/${id}`, article);
  }
}
