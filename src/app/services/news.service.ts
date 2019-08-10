import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TopHeadLines } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment.prod';

const apiKey = environment.newsApiKey;
const apiUrl = environment.newsApiUrl;
const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private headlinesPage = 0;
  private categoryPage = 0;
  private currentCategory = '';

  constructor(
    private http: HttpClient
  ) { }

  private makeRequest<T>(query: string) {
    query = apiUrl + query;

    return this.http.get<T>(query, {headers});
  }

  getTopHeadLines() {
    this.headlinesPage++;

    return this.makeRequest<TopHeadLines>(`/top-headlines?country=ar&page=${this.headlinesPage}`);
  }

  getTopHeadLinesCategorie(categorie: string) {
    if (this.currentCategory === categorie ) {
      this.categoryPage++;
    } else {
      this.categoryPage = 1;
      this.currentCategory = categorie;
    }

    return this.makeRequest<TopHeadLines>(`/top-headlines?country=ar&category=${categorie}&page=${this.categoryPage}`);
  }
}
