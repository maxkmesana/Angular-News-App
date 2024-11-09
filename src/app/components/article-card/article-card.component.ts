import {ChangeDetectionStrategy, Component, inject, Input, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Article} from "../../interfaces/article.interface"
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { FavoriteService } from '../../services/favorites.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/users.service';
import { ActiveUser } from '../../interfaces/active-user';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIcon],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCardComponent implements OnInit{
  
  @Input() article!: Article;

  service: FavoriteService = inject(FavoriteService);
  userId: ActiveUser | undefined  = undefined;
  subscription: Subscription

  constructor(private userService: UserService) {
    this.subscription = this.userService.loggedUserId$.subscribe(data => {
      this.userId = data;
    });
  }

  ngOnInit(): void {
    this.article.isFavorite = false; // FIXME: esto no deberia siempre ser false. Deberia venir desde el articulo
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleFavClick(article: Article){
    if(this.userId == null){
      throw new Error("article-card.handleFavClick(): userId cannot be null.")
    }
    if(article?.isFavorite === true){
      this.service.deleteFavorite(this.article.url).subscribe();
    }
    if(article?.isFavorite === false){
      article.userId = this.userId.id;
      this.service.postFavorite(article).subscribe();
    }
    this.article.isFavorite = !this.article.isFavorite
  }

}
