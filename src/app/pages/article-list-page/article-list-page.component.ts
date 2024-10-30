import { Component, inject, OnInit } from '@angular/core';
import { NavComponent } from "../../shared/nav/nav.component";
import { ArticleListComponent } from "../../components/article-list/article-list.component";
import { FavoriteService } from '../../services/favorites.service';
import { UserService } from '../../services/users.service';


@Component({
  selector: 'app-article-list-page',
  standalone: true,
  imports: [NavComponent, ArticleListComponent],
  templateUrl: './article-list-page.component.html',
  styleUrl: './article-list-page.component.css'
})
export class ArticleListPageComponent{
  


}
