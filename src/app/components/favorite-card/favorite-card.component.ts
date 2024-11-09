import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Article } from '../../interfaces/article.interface';
import { FavoriteService } from '../../services/favorites.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/users.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-favorite-card',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './favorite-card.component.html',
  styleUrl: './favorite-card.component.css'
})
export class FavoriteCardComponent{
  @Input() article!: Article;
  @Input() userId!: string;
  @Output() deleteEvent = new EventEmitter<string>();

  favoriteService: FavoriteService = inject(FavoriteService);
  
  constructor() {
  }

  handleFavClick() {
    if (this.article.isFavorite) {
      this.deleteEvent.emit(this.article.url);
    } else {
      this.favoriteService.addToFavorites(this.article, this.userId).subscribe({
        error: (error) => console.error('Error adding favorite:', error)
      });
      this.article.isFavorite = true;
    }
  }

}
