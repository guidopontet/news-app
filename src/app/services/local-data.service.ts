import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  public favorites: Article[] = [];

  constructor(
    private storage: Storage
  ) {
    this.loadFavorites();
  }

  saveToFavorites(article: Article) {
    const exist = this.favorites.find(art => art.title === article.title);

    if (!exist) {
      this.favorites.unshift(article);
      this.storage.set('favorites', this.favorites);
    }
  }

  deleteFromFavorites(article: Article) {
    this.favorites = this.favorites.filter(art => art !== article);
    this.storage.set('favorites', this.favorites);
  }

  async loadFavorites() {
    const favorites = await this.storage.get('favorites');

    if (favorites) {
      this.favorites = favorites;
    }
  }
}
