import { Component } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav.component';
import { MyNewsComponent } from '../../components/my-news/my-news.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-my-news-page',
  standalone: true,
  imports: [NavComponent, MyNewsComponent, FooterComponent],
  templateUrl: './my-news-page.component.html',
  styleUrl: './my-news-page.component.css',
})
export class MyNewsPageComponent {}
