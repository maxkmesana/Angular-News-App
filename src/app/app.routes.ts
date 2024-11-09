import { Routes } from '@angular/router';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { ArticleListPageComponent } from './pages/article-list-page/article-list-page.component';
import { MyNewsComponent } from './components/my-news/my-news.component';
import { SingInComponent } from './components/sing-in/sing-in.component';


export const routes: Routes = [
    {
        path: '',
        component: SingInComponent
    },
    {
        path:"dev-article-card", component: ArticleCardComponent
    },
    {
        path:"dev-article-list-page", component: ArticleListPageComponent,
    },
    {
        path:"my-news", component: MyNewsComponent,
    }
];
