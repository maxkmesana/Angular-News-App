import { Component } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav.component';
import { ArticleViewComponent } from '../../components/article-view/article-view.component';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [NavComponent, ArticleViewComponent],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.css',
})
export class ArticlePageComponent {}
