import { Component, inject, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorites.service';
import { Article } from '../../interfaces/article.interface';
import { Router } from '@angular/router';
import { UserService } from '../../services/users.service';
import { NewsApiService } from '../../services/news-api.service';
import { ApiResponse } from '../../interfaces/response.interface';
import { FavoriteCardComponent } from "../favorite-card/favorite-card.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-news',
  standalone: true,
  imports: [FavoriteCardComponent, FavoriteCardComponent],
  templateUrl: './my-news.component.html',
  styleUrl: './my-news.component.css'
})
export class MyNewsComponent /*implements OnInit*/ { 

 /* Falta: 
 1. Que reciba el id del usuario, 
 2. Manejo de error,
 3. Escribir la ruta al login en caso de que no este logeado el usuario*/

  favoriteService: FavoriteService = inject(FavoriteService);

  userFavorites: Article[] = [];
 
  userId: string  = '';
  subscription: Subscription

 constructor(private userService: UserService) {
   this.subscription = this.userService.loggedUserId$.subscribe(data => {
     this.userId = data;
   });
 }

  ngOnInit(): void {
    this.favoriteService.getFavoritesByUserId(this.userId).subscribe(
      {
        next: (data) => {this.userFavorites = data},
        error: (error) => {console.log(error)}
      }
    )
  }

  handleOnDelete(urlToDelete: string){
    this.favoriteService.removeFromFavorites(urlToDelete, this.userId).subscribe({
      next: () => {this.userFavorites = this.userFavorites.filter(e => e.url !== urlToDelete)},
      error: (error) => console.error('Error removing favorite:', error)
    });
  }
}
