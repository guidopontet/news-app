import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TopHeadLines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient
  ) { }

  getTopHeadLines() {
    // tslint:disable-next-line:max-line-length
    return this.http.get<TopHeadLines>(`https://newsapi.org/v2/top-headlines?country=ar&category=business&apiKey=6a14ac20450240af910cf15219b28241`);
  }
}
