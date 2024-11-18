import { Routes } from '@angular/router';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { ArticleListPageComponent } from './pages/article-list-page/article-list-page.component';
import { MyNewsPageComponent } from './pages/my-news-page/my-news-page.component';
import { ArticlePageComponent } from './pages/article-page/article-page.component';
import { authGuardFn } from './guard/auth.guard';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';

export const routes: Routes = [
  {
      path:"", component: ArticleListPageComponent,
  },
  {
    path:"category/:category", 
    loadComponent: () => import('./pages/article-list-page/article-list-page.component')
    .then(m => m.ArticleListPageComponent)
  },
  {
      path:"my-news", 
      loadComponent: () => import('./pages/my-news-page/my-news-page.component')
      .then(m => m.MyNewsPageComponent),
      canActivate: [authGuardFn]
  },
  {
    path: 'article/:title',
    loadComponent: () => import('./pages/article-page/article-page.component')
      .then(m => m.ArticlePageComponent)
  },
  {
    path: 'test',
    component: ErrorModalComponent,
  }
];
