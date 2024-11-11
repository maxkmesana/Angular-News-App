import { Component, inject, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorites.service';
import { Article } from '../../interfaces/article.interface';
import { Router } from '@angular/router';
import { UserService } from '../../services/users.service';
import { NewsApiService } from '../../services/news-api.service';
import { ApiResponse } from '../../interfaces/response.interface';
import { FavoriteCardComponent } from "../favorite-card/favorite-card.component";
import { Subscription } from 'rxjs';
import { ActiveUser } from '../../interfaces/active-user';

@Component({
  selector: 'app-my-news',
  standalone: true,
  imports: [FavoriteCardComponent, FavoriteCardComponent],
  templateUrl: './my-news.component.html',
  styleUrl: './my-news.component.css',
})
export class MyNewsComponent /*implements OnInit*/ { 

  favoriteService: FavoriteService = inject(FavoriteService);
  newsApiService: NewsApiService = inject(NewsApiService);
  router: Router = inject(Router);

  userFavorites: Article[] = [];
 
  userId: ActiveUser | null = null
  subscription: Subscription

 constructor(private userService: UserService) {
   this.subscription = this.userService.loggedUserId$.subscribe(data => {
     this.userId = data;
   });
 }

 onNavigate(article: Article) {
    this.newsApiService.setSelectedArticle(article);
    this.router.navigate([`article/${article.title}`]);
}

  ngOnInit(): void {
    if(this.userId === null){
      alert("To view your bookmarked news you must be logged in.");
      this.router.navigate([""]);
      return;
     }
    this.favoriteService.getFavoritesByUserId(this.userId?.id).subscribe(
      {
        next: (data) => {this.userFavorites = data},
        error: (error) => {console.log(error)}
      }
    )
  }

  handleOnDelete(urlToDelete: string){
    this.favoriteService.removeFromFavorites(urlToDelete, this.userId?.id).subscribe({
      next: () => {this.userFavorites = this.userFavorites.filter(e => e.url !== urlToDelete)},
      error: (error) => console.error('Error removing favorite:', error)
    });
  }
}
