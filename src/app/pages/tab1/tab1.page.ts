import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { TopHeadLines, Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  news: Article[] = [];

  constructor(
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.loadNews();
  }

  loadData(event) {
    this.loadNews(event);
  }

  loadNews(event?: any) {
    this.newsService.getTopHeadLines()
      .subscribe(res => {
        if (res.articles.length === 0) {
          event.target.complete();
          event.target.disabled = true;
        } else {
          this.news.push(...res.articles);

          if (event) {
            event.target.complete();
          }
        }
      });
  }
}
