import { Component, inject, OnInit } from '@angular/core';
import { Article } from '../../interfaces/article.interface';
import { NewsApiService } from '../../services/news-api.service';
import { ArticleCardComponent } from '../article-card/article-card.component';
import { ApiResponse } from '../../interfaces/response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [ArticleCardComponent],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css',
})
export class ArticleListComponent implements OnInit {
  newsApiService: NewsApiService = inject(NewsApiService);

  articles: Article[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.newsApiService.getMainNews().subscribe({
      next: (response: ApiResponse) => {
        this.articles = response.articles;
      },
    });
  }

  onNavigate(title: string) {
    this.router.navigate([`article/${title}`]);
  }
}
