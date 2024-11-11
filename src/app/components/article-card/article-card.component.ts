import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Article } from '../../interfaces/article.interface';
import { MatIcon } from '@angular/material/icon';
import { FavoriteService } from '../../services/favorites.service';
import { ActiveUser } from '../../interfaces/active-user';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIcon],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCardComponent{
  @Input() article!: Article;
  @Input() userId!: ActiveUser | null;
  @Output() navigateEvent = new EventEmitter<Article>();
  // @Input() favSet!: Set<string | undefined>;

  favoriteService: FavoriteService = inject(FavoriteService);

  constructor() {}

  handleFavClick() {
    if (this.article.isFavorite) {
      this.favoriteService
        .removeFromFavorites(this.article.url, this.userId?.id)
        .subscribe({
          error: (error) => console.error('Error removing favorite:', error),
        });
      this.article.isFavorite = false;
    } else {
      this.favoriteService.addToFavorites(this.article, this.userId?.id).subscribe({
        error: (error) => console.error('Error adding favorite:', error),
      });
      this.article.isFavorite = true;
    }
  }
  onNavigate() {
    this.navigateEvent.emit(this.article);
  }
}
