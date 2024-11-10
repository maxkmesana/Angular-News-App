import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Article } from '../../interfaces/article.interface';
import { NewsApiService } from '../../services/news-api.service';
import { ArticleCardComponent } from '../article-card/article-card.component';
import { ApiResponse } from '../../interfaces/response.interface';
import { FavoriteService } from '../../services/favorites.service';
import { UserService } from '../../services/users.service';
import { Subscription, switchMap } from 'rxjs';
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
  router: Router = inject(Router);

  articles: Article[] = [];
  currentPage = 1;
  loading = false;
  totalArticles = 0;
  userId: string = '';
  subscription: Subscription;


  constructor(private userService: UserService) {
    this.subscription = this.userService.loggedUserId$.subscribe((data) => {
      this.userId = data;
    });
  }

  ngOnInit(): void {
    this.newsApiService
      .getMainNewsPageable()
      .pipe(
        switchMap((response: ApiResponse) =>
          this.favoriteService.markUserFavorites(response.articles, this.userId)
        )
      )
      .subscribe({
        next: (markedArticles) => {
          this.articles = markedArticles;
          this.currentPage++;
        },
        error: (error) => console.error('Error loading articles:', error),
      });
  }

  
  onNavigate(title: string) {
    this.router.navigate([`article/${title}`]);
  }


  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    // Check if we're near bottom of page
    if ((window.innerHeight + window.scrollY) >= 
        (document.documentElement.scrollHeight - 200)) {
      this.loadMoreArticles();
    }
    
  }
  
  loadMoreArticles() {
    if (this.loading || (this.totalArticles > 0 && this.articles.length >= this.totalArticles)) return;
    
    this.loading = true;
    this.newsApiService
      .getMainNewsPageable(this.currentPage)
      .pipe(
        switchMap((response: ApiResponse) => {
          this.totalArticles = response.totalResults;
          // Pass only the new articles to be marked
          return this.favoriteService.markUserFavorites(response.articles, this.userId)
        })
      )
      .subscribe({
        next: (markedArticles) => {
          // Append the new marked articles to the existing array
          this.articles = [...this.articles, ...markedArticles];
          this.currentPage++;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading articles:', error);
          this.loading = false;
        }
      });
  }
}
