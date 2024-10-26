import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCardComponent {
}
