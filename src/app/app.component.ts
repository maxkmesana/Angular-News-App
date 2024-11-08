import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArticleCardComponent } from './components/article-card/article-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ArticleCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'news-app';
}
