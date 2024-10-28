import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Article} from "../../interfaces/article.interface"
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

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

  testArticle: Article = {
    "source": {
        "id": null,
        "name": "Hipertextual"
    },
    "author": "Gabriel Erard",
    "title": "Samsung lleva One UI a sus televisores con Tizen: estas son sus principales novedades",
    "description": "Los televisores de Samsung que usan Tizen como sistema operativo han comenzado a actualizarse a One UI. De esta manera, los coreanos pretenden unificar la experiencia de software entre estos dispositivos y otros productos —como sus móviles y tablets— que usan…",
    "url": "http://hipertextual.com/2024/10/samsung-one-ui-actualizacion-televisores-tizen",
    "urlToImage": "https://imgs.hipertextual.com/wp-content/uploads/2024/01/samsung-neo-qled-8k-001.jpg",
    "publishedAt": "2024-10-14T16:12:23Z",
    "content": "Los televisores de Samsung que usan Tizen como sistema operativo han comenzado a actualizarse a One UI. De esta manera, los coreanos pretenden unificar la experiencia de software entre estos disposit… [+2142 chars]"
  }

  ngOnInit(): void {
    this.article.isFavorite = false;
  }

  handleFavClick(article: Article){
    this.article.isFavorite = !this.article.isFavorite;
  }

}
