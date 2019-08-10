import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Categorie, Article, TopHeadLines } from 'src/app/interfaces/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, null) segment: IonSegment;
  public categories: Categorie[] = [
    {name: 'Ciencia', key: 'science'},
    {name: 'Deportes', key: 'sports'},
    {name: 'Espectáculos', key: 'entertainment'},
    {name: 'General', key: 'general'},
    {name: 'Negocios', key: 'business'},
    {name: 'Salud', key: 'health'},
    {name: 'Tecnología', key: 'technology'}
  ];

  public news: Article[] = [];

  constructor(
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.segment.value = this.categories[0].key;
    this.loadCategorie(this.segment.value);
  }

  changeCategorie(event) {
    const categorie = event.detail.value.key;
    this.cleanNews();
    this.loadCategorie(categorie);
  }

  loadCategorie(categorie: string, event?) {
    this.newsService.getTopHeadLinesCategorie(categorie)
      .subscribe(res => {
        this.news.push(...res.articles);

        if (event) {
          event.target.complete();
        }
      });
  }

  cleanNews() {
    this.news = [];
  }

  loadData(event) {
    this.loadCategorie(this.segment.value, event);
  }
}
