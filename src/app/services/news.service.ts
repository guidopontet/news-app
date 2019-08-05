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

  constructor(
    private http: HttpClient
  ) { }

  private makeRequest<T>(query: string) {
    query = apiUrl + query;

    return this.http.get<T>(query, {headers});
  }

  getTopHeadLines() {
    return this.makeRequest<TopHeadLines>('/top-headlines?country=ar');
  }

  getTopHeadLinesCategorie(categorie: string) {
    return this.makeRequest<TopHeadLines>(`/top-headlines?country=ar&category=${categorie}`);
  }
}
