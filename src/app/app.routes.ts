import { Routes } from '@angular/router';
import { ArticleListPageComponent } from './pages/article-list-page/article-list-page.component';
import { authGuardFn } from './guard/auth.guard';


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
  }
];
