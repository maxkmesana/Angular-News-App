import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
  styleUrl: './favorite-card.component.css',
})
export class FavoriteCardComponent implements OnInit {
  @Input() article!: Article;
  @Output() navigateEvent = new EventEmitter<string>();

  service: FavoriteService = inject(FavoriteService);
  userId: string = '';
  subscription: Subscription;

  constructor(private userService: UserService) {
    this.subscription = this.userService.loggedUserId$.subscribe((data) => {
      this.userId = data;
    });
  }

  ngOnInit(): void {
    this.article.isFavorite = false; // FIXME: esto no deberia siempre ser false. Deberia venir desde el articulo
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleFavClick(article: Article) {
    if (this.userId == null) {
      throw new Error('article-card.handleFavClick(): userId cannot be null.');
    }
    if (article?.isFavorite === true) {
      this.service.deleteFavorite(this.article.url).subscribe();
    }
    if (article?.isFavorite === false) {
      article.userId = this.userId;
      this.service.postFavorite(article).subscribe();
    }
    this.article.isFavorite = !this.article.isFavorite;
  }

  onNavigate() {
    this.navigateEvent.emit(this.article.title);
  }
}
