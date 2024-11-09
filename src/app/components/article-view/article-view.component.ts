import { Component } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav.component';

@Component({
  selector: 'app-article-view',
  standalone: true,
  imports: [NavComponent, ArticleViewComponent],
  templateUrl: './article-view.component.html',
  styleUrl: './article-view.component.css',
})
export class ArticleViewComponent {}
