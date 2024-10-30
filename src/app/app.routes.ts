import { Routes } from '@angular/router';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { ArticleListPageComponent } from './pages/article-list-page/article-list-page.component';


export const routes: Routes = [
    {
        path:"dev-article-card", component: ArticleCardComponent
    },
    {
        path:"dev-article-list-page", component: ArticleListPageComponent,
    }
];
