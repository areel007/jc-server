// // types/newsapi.d.ts

declare module "newsapi" {
  interface Article {
    source: {
      id: string | null;
      name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
  }

  interface Response {
    status: string;
    totalResults: number;
    articles: Article[];
  }

  class NewsAPI {
    constructor(apiKey: string);
    v2: {
      topHeadlines(params: {
        sources?: string;
        q?: string;
        category?: string;
        language?: string;
        country?: string;
      }): Promise<Response>;
      everything(params: {
        q?: string;
        sources?: string;
        domains?: string;
        from?: string;
        to?: string;
        language?: string;
        sortBy?: string;
        pageSize?: number;
        page?: number;
      }): Promise<Response>;
      sources(params: {
        category?: string;
        language?: string;
        country?: string;
      }): Promise<Response>;
    };
  }

  export = NewsAPI;
}
