import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../interfaces/article.interface';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private httpNews = inject(HttpClient);
  private NEWS_API_URL: String = "https://newsapi.org/v2/everything"

  constructor() { }

  getMainNewsPageable(page: number = 1, categoria:string = "tecnología", pageSize: number = 12): Observable<ApiResponse> {
    // CATEGORIAS VALIDAS: "tecnología" (default), "programación", 
    // "inteligencia artificial", "ciberseguridad", "hardware"
    return this.httpNews.get<ApiResponse>(`${this.NEWS_API_URL}?q=${categoria}&domains=xataca.com,hipertextual.com&apiKey=${environment.apiKey}&page=${page}&pageSize=${pageSize}`)
  }

  getMainNews(): Observable<ApiResponse> {
    return this.httpNews.get<ApiResponse>(`${this.NEWS_API_URL}?q=software&domains=xataca.com,hipertextual.com&apiKey=${environment.apiKey}`)
  }
}
