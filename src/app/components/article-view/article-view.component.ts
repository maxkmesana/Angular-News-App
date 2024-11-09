import { Component, OnInit } from '@angular/core';
import { Article } from '../../interfaces/article.interface';
import { NewsApiService } from '../../services/news-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../interfaces/response.interface';
import { map, Subscription, switchMap } from 'rxjs';
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
    this.route.paramMap.pipe(
      map(param => param.get('title') ?? ' '),
      switchMap(title => 
        this.newsApiService.getMainNews().pipe(
          map(response => ({
            title,
            articles: response.articles
          }))
        )
      )
    ).subscribe({
      next: ({title, articles}) => {
        const foundArticle = articles.find(article => 
          article.title === title
        );
        if (foundArticle) {
          this.article = foundArticle;
        } else {
          console.log('Article not found');  // Handle this case
        }
      },
      error: (error) => console.error('Error:', error)
    });
}
}
