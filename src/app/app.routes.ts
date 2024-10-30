import { Routes } from '@angular/router';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { ArticleListPageComponent } from './components/article-list-page/article-list-page.component';
import { ArticleListComponent } from './components/article-list/article-list.component';

export const routes: Routes = [
    {
        path:"dev-article-card", component: ArticleCardComponent
    },
    {
        path:"dev-article-list-page", component: ArticleListComponent,
    }
];
