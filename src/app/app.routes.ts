import { Routes } from '@angular/router';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { ArticleListPageComponent } from './pages/article-list-page/article-list-page.component';
import { MyNewsComponent } from './components/my-news/my-news.component';
import { MyNewsPageComponent } from './pages/my-news-page/my-news-page.component';
import { ArticlePageComponent } from './pages/article-page/article-page.component';

export const routes: Routes = [
  {
    path: 'dev-article-card',
    component: ArticleCardComponent,
  },
  {
    path: 'dev-article-list-page',
    component: ArticleListPageComponent,
  },
  {
    path: 'my-news',
    component: MyNewsPageComponent,
  },
  {
    path: 'articles/:id',
    component: ArticlePageComponent,
  },
];
