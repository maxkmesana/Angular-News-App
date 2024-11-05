import { Component, inject, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorites.service';
import { Article } from '../../interfaces/article.interface';
import { Router } from '@angular/router';
import { UserService } from '../../services/users.service';
import { NewsApiService } from '../../services/news-api.service';
import { ApiResponse } from '../../interfaces/response.interface';
import { ArticleCardComponent } from '../article-card/article-card.component';

@Component({
  selector: 'app-my-news',
  standalone: true,
  imports: [ArticleCardComponent],
  templateUrl: './my-news.component.html',
  styleUrl: './my-news.component.css'
})
export class MyNewsComponent implements OnInit/*implements OnInit*/{ 
/*borrar, es para configurar el estilo */

newsApiService: NewsApiService = inject(NewsApiService);

articles: Article[] = [];

ngOnInit(): void {
  this.newsApiService.getMainNews().subscribe({
    next: (response:ApiResponse) => {this.articles = response.articles}
  })
}


 /* Falta: 
 1. Que reciba el id del usuario, 
 2. Manejo de error,
 3. Escribir la ruta al login en caso de que no este logeado el usuario*/

 /*
  userFavorites: Array<Article> = [];

  constructor(private favoriteService: FavoriteService, private userService: UserService, private route: Router){}
  ngOnInit(): void {
    this.userService.getUserById(id).subscribe({
      next: ()=>{
        if(id){
          this.favoriteService.getFavoritesByUserId(id).subscribe(
            {
              next: (favorites)=>{this.userFavorites = favorites}
              ,
              error: console.log
            }
          )
        }else{
          this.route.navigate = (['login']); //NOMBRE DE LA RUTA AL LOGIN
        }
      },
      error: console.log
    })
    
  }
    */
}
