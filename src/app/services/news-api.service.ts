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
  private NEWS_API_KEY: String = "" // .env ONLY!!
  private NEWS_API_URL: String = "https://newsapi.org/v2/everything"

  constructor() { }

  // this request is made only for development.
  // TODO: Decide the specific parameters of the request and whether we should add other requests
  getMainNews(): Observable<ApiResponse> {
    return this.httpNews.get<ApiResponse>(`${this.NEWS_API_URL}?q=software&domains=xataca.com,hipertextual.com&apiKey=${environment.apiKey}`)
  }
}
