import { Component, inject, OnInit } from '@angular/core';
import { Article } from '../../interfaces/article.interface';
import { NewsApiService } from '../../services/news-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../interfaces/response.interface';
import { Subscription, switchMap } from 'rxjs';
import { UserService } from '../../services/users.service';
import { FavoriteService } from '../../services/favorites.service';
import { ArticleContentComponent } from '../article-content/article-content.component';
import { ArticleCardComponent } from "../article-card/article-card.component";
import { ActiveUser } from '../../interfaces/active-user';

@Component({
  selector: 'app-article-view',
  standalone: true,
  imports: [ArticleContentComponent, ArticleCardComponent],
  templateUrl: './article-view.component.html',
  styleUrl: './article-view.component.css',
})
export class ArticleViewComponent implements OnInit {
  newsApiService = inject(NewsApiService);
  router = inject(Router);

  userId: ActiveUser | null = null
  subscription: Subscription;
  article$ = this.newsApiService.selectedArticle$;
  article: Article | null = null;
  recommendations: Article[] = []

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private favoriteService: FavoriteService

  ) {
    this.subscription = this.userService.loggedUserId$.subscribe((data) => {
      this.userId = data;
    });
  }

  ngOnInit(): void {
    this.newsApiService.selectedArticle$.subscribe(article => {
      this.article = article;
      if(this.article === null){
        this.router.navigate([""]);
      }
      this.loadList();
    });
  }

  loadList() {
    this.newsApiService
      .getMainNewsPageable(1, this.article?.category ?? 'technology', 12)
      .pipe(
        switchMap((response: ApiResponse) => {
          const filteredArticles = response.articles
            .filter((article: Article) =>
              !article.title.includes("[Removed]") &&
              article.urlToImage !== null &&
              article.url !== this.article?.url
            )
            .slice(0, 3)
            .map(article => ({
              ...article,
              category: this.article?.category ?? 'technology'
            }) as Article);

          return this.favoriteService.markUserFavorites(filteredArticles, this.userId?.id);
        })
      )
      .subscribe({
        next: (markedArticles) => {
          this.recommendations = markedArticles;
        },
        error: (error) => console.error("Error loading related articles:", error),
      });
  }
}
