import { Component, inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FavoriteService } from '../../services/favorites.service';
import { Subscription, switchMap } from 'rxjs';
import { UserService } from '../../services/users.service';
import { Article } from '../../interfaces/article.interface';
import { MatIcon } from '@angular/material/icon';
import { NewsApiService } from '../../services/news-api.service';
import { ActiveUser } from '../../interfaces/active-user';
import { CommonModule } from '@angular/common';
import { RemoveCharsPipe } from '../../custom-pipe/remove-chars.pipe';
import { ErrorModalComponent } from '../error-modal/error-modal.component';

@Component({
  selector: 'app-article-content',
  standalone: true,
  imports: [MatIcon, CommonModule, RemoveCharsPipe, ErrorModalComponent],
  templateUrl: './article-content.component.html',
  styleUrl: './article-content.component.css',
})
export class ArticleContentComponent implements OnInit, OnDestroy {
  @Input() article!: Article;

  favoriteService: FavoriteService = inject(FavoriteService);
  newsApiService: NewsApiService = inject(NewsApiService)
  userId: ActiveUser | null = null;
  subscription: Subscription;
  @ViewChild(ErrorModalComponent) errorModal!: ErrorModalComponent;

  constructor(private userService: UserService) {
    this.subscription = this.userService.loggedUserId$.subscribe((data) => {
      this.userId = data;
      // When we get the userId, check favorite status
      if (this.article && this.userId) {
        this.checkFavoriteStatus();
      }
    });
  }

  ngOnInit(): void {
    // If we already have both article and userId, check favorite status
    if (this.article && this.userId) {
      this.checkFavoriteStatus();
    }
  }

  private checkFavoriteStatus(): void {
    // We pass an array with just this single article
    this.favoriteService.markUserFavorites([this.article], this.userId?.id)
      .subscribe({
        next: (markedArticles) => {
          if (markedArticles.length > 0) {
            this.article.isFavorite = markedArticles[0].isFavorite;
          }
        },
        error: (error) => console.error('Error checking favorite status:', error)
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleFavClick() {
    if(this.userId === null){
      this.errorModal.openModal();
      return;
    }
    
    if (this.article.isFavorite) {
      this.favoriteService.removeFromFavorites(this.article.url, this.userId?.id).subscribe({
        error: (error) => console.error('Error removing favorite:', error)
      });
      this.article.isFavorite = false;
    } else {
      this.favoriteService.addToFavorites(this.article, this.userId?.id).subscribe({
        error: (error) => console.error('Error adding favorite:', error)
      });
      this.article.isFavorite = true;
    }
  }

  onModalClosed(){
    this.errorModal.closeModal();
  }
}
