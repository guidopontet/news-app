import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { TopHeadLines } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.newsService.getTopHeadLines()
      .subscribe(res => {
        console.log(res);
      });
  }

}
