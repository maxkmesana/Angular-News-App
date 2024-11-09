import { Component, OnInit } from '@angular/core';
import { Article } from '../../interfaces/article.interface';
import { NewsApiService } from '../../services/news-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../interfaces/response.interface';
import { Subscription, switchMap } from 'rxjs';
import { UserService } from '../../services/users.service';
import { FavoriteService } from '../../services/favorites.service';
import { ArticleContentComponent } from '../article-content/article-content.component';

@Component({
  selector: 'app-article-view',
  standalone: true,
  imports: [ArticleContentComponent],
  templateUrl: './article-view.component.html',
  styleUrl: './article-view.component.css',
})
export class ArticleViewComponent implements OnInit {
  article?: Article;

  userId: string = '';
  subscription: Subscription;

  constructor(
    private userService: UserService,
    private newsApiService: NewsApiService,
    private route: ActivatedRoute,
    private service: FavoriteService
  ) {
    this.subscription = this.userService.loggedUserId$.subscribe((data) => {
      this.userId = data;
    });
  }

  ngOnInit(): void {
    this.newsApiService.getMainNews().subscribe({
      next: (response: ApiResponse) => {
        this.route.paramMap
          .pipe(
            switchMap((param) => {
              return param.get('title') ?? ' ';
            })
          )
          .subscribe({
            next: (title) => {
              response.articles.forEach((article) => {
                if (article.title.localeCompare(title)) {
                  this.article = article;
                }
              });
            },
            error: console.log,
          });
      },
    });
  }
}
