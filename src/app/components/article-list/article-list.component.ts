import { Component, inject, OnInit } from '@angular/core';
import { Article } from '../../interfaces/article.interface';
import { NewsApiService } from '../../services/news-api.service';
import { ArticleCardComponent } from '../article-card/article-card.component';
import { ApiResponse } from '../../interfaces/response.interface';
import { FavoriteService } from '../../services/favorites.service';
import { UserService } from '../../services/users.service';
import { Subscription, switchMap } from 'rxjs';
import { E } from '@angular/cdk/keycodes';
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
  favoriteService: FavoriteService = inject(FavoriteService);
  router: Router = inject(Router)

  articles: Article[] = [];

  userId: string = '';
  subscription: Subscription;

  constructor(private userService: UserService) {
    this.subscription = this.userService.loggedUserId$.subscribe((data) => {
      this.userId = data;
    });
  }

  ngOnInit(): void {
    this.newsApiService
      .getMainNews()
      .pipe(
        switchMap((response: ApiResponse) =>
          this.favoriteService.markUserFavorites(response.articles, this.userId)
        )
      )
      .subscribe({
        next: (markedArticles) => {
          this.articles = markedArticles;
        },
        error: (error) => console.error('Error loading articles:', error),
      });
  }

  onNavigate(title: string) {
    this.router.navigate([`article/${title}`]);
  }
}
