import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../interfaces/article.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private httpNews = inject(HttpClient);
  private NEWS_API_KEY: String = "" // .env ONLY!!
  private NEWS_API_URL: String = "https://newsapi.org/v2/everything"

  constructor() { }

  getMainNews(): Observable<Article[]> {
    return this.httpNews.get<Article[]>(`${this.NEWS_API_URL}/domains=xataca.com,hipertextual.com${this.NEWS_API_KEY}`)
  }
}
