import { Component } from '@angular/core';
import { FavoriteService } from '../../services/favorites.service';

@Component({
  selector: 'app-my-news',
  standalone: true,
  imports: [],
  templateUrl: './my-news.component.html',
  styleUrl: './my-news.component.css'
})
export class MyNewsComponent {


  constructor(private favoriteService: FavoriteService){}
}
