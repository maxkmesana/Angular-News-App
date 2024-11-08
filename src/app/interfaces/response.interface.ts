import { Article } from "./article.interface";

export interface ApiResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}