import { Component, OnInit } from '@angular/core';
import { Article } from '../../interfaces/article.interface';
import { NewsApiService } from '../../services/news-api.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {

  newsArray: Array<Article> = []

  constructor(private newService: NewsApiService) {}

  ngOnInit(): void {
    this.newsListing();
  }

  newsListing(){
    this.newService.getMainNews().subscribe({
      next: (response) => {
        this.newsArray = response;
      },
      error: (err) => {
        if(err.status === '404'){
          alert('News not found');
        }else if(err.status === '500'){
          alert('Server error');
        }
      }
    })
  }
}
