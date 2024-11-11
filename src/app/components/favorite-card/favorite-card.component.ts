import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Article } from '../../interfaces/article.interface';
import { FavoriteService } from '../../services/favorites.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/users.service';
import { MatIcon } from '@angular/material/icon';
import { ActiveUser } from '../../interfaces/active-user';

@Component({
  selector: 'app-favorite-card',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './favorite-card.component.html',
  styleUrl: './favorite-card.component.css',
})
export class FavoriteCardComponent{
  @Input() article!: Article;
  @Output() navigateEvent = new EventEmitter<Article>();
  @Input() userId: ActiveUser | null = null
  @Output() deleteEvent = new EventEmitter<string>();

  favoriteService: FavoriteService = inject(FavoriteService);
  
  constructor() {
  }

  handleFavClick() {
    if (this.article.isFavorite) {
      this.deleteEvent.emit(this.article.url);
    } else {
      this.favoriteService.addToFavorites(this.article, this.userId?.id).subscribe({
        error: (error) => console.error('Error adding favorite:', error)
      });
      this.article.isFavorite = true;
    }
  }

  onNavigate() {
    this.navigateEvent.emit(this.article);
  }
}
