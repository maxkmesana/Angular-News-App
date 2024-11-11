import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Article } from '../interfaces/article.interface';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private httpNews = inject(HttpClient);
  private NEWS_API_URL: String = "https://newsapi.org/v2/everything"
  private selectedArticle = new BehaviorSubject<Article | null>(null);
  selectedArticle$ = this.selectedArticle.asObservable();

  constructor() { }
  
  setSelectedArticle(article: Article): void {
      this.selectedArticle.next(article);
  }

  getSelectedArticle(): Observable<Article | null> {
      return this.selectedArticle$;
  }

  getMainNewsPageable(page: number = 1, categoria:string = "technology", pageSize: number = 12): Observable<ApiResponse> {
    return this.httpNews.get<ApiResponse>(`${this.NEWS_API_URL}?q=${categoria}&apiKey=${environment.apiKey}&page=${page}&pageSize=${pageSize}`)
  }

  getMainNews(): Observable<ApiResponse> {
    return this.httpNews.get<ApiResponse>(`${this.NEWS_API_URL}?q=software&domains=xataca.com,hipertextual.com&apiKey=${environment.apiKey}`)
  }
}
