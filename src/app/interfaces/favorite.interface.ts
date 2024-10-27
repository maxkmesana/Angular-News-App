import { Article } from "./article.interface";

export interface Favorite{
    id?: String,
    userId: String,
    article: Article
}