import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { NavComponent } from "./shared/nav/nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'news-app';
}
