import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Article } from '../../interfaces/article.interface';
import { NewsApiService } from '../../services/news-api.service';
import { ArticleCardComponent } from '../article-card/article-card.component';
import { ApiResponse } from '../../interfaces/response.interface';
import { FavoriteService } from '../../services/favorites.service';
import { UserService } from '../../services/users.service';
import { Subscription, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveUser } from '../../interfaces/active-user';

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
  activatedRoute = inject(ActivatedRoute);

  articles: Article[] = [];
  currentPage = 1;
  currentRoute: string | null = "";
  loading = false;
  totalArticles = 0;
  userId: ActiveUser | null = null;
  subscription: Subscription;


  constructor(private userService: UserService) {
    this.subscription = this.userService.loggedUserId$.subscribe((data) => {
      this.userId = data;
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.currentRoute = params.get("category")
        this.loadList();
      }
    })
  }

  loadList() {
    window.scrollTo(0, 0);
    const category = this.currentRoute ?? "technology"; 
  
    this.newsApiService
      .getMainNewsPageable(this.currentPage, category)
      .pipe(
        switchMap((response: ApiResponse) => {
          const filteredArticles = response.articles
            .filter(
              (article: Article) =>
                !article.title.includes("[Removed]") && article.urlToImage !== null
            )
            .map((article: Article) => ({
              ...article,
              category: category
            }));
  
          return this.favoriteService.markUserFavorites(filteredArticles, this.userId?.id);
        })
      )
      .subscribe({
        next: (markedArticles) => {
          this.articles = markedArticles;
          this.currentPage++;
        },
        error: (error) => console.error("Error loading articles:", error),
      });
  }
  
  onNavigate(article: Article) {
    this.newsApiService.setSelectedArticle(article);
    this.router.navigate([`article/${article.title}`]);
  }


  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= 
        (document.documentElement.scrollHeight - 200)) {
      this.loadMoreArticles();
    }
  }
  
  loadMoreArticles() {
    if (this.loading || (this.totalArticles > 0 && this.articles.length >= this.totalArticles)) return;
    this.loading = true;
    const category = this.currentRoute ?? "technology"; 
  
    this.newsApiService
      .getMainNewsPageable(this.currentPage, category)
      .pipe(
        switchMap((response: ApiResponse) => {
          this.totalArticles = response.totalResults;
  
          const filteredArticles = response.articles
            .filter(
              (article: Article) =>
                !article.title.includes("[Removed]") && article.urlToImage !== null
            )
            .map((article: Article) => ({
              ...article,
              category: category 
            }));
  
          return this.favoriteService.markUserFavorites(filteredArticles, this.userId?.id);
        })
      )
      .subscribe({
        next: (markedArticles) => {
          this.articles = [...this.articles, ...markedArticles];
          this.currentPage++;
          this.loading = false;
        },
        error: (error) => {
          console.error("Error loading articles:", error);
          this.loading = false;
        }
      });
  }
    
}
