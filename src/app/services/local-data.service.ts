import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  public favorites: Article[] = [];

  constructor(
    private storage: Storage,
    private toastController: ToastController
  ) {
    this.loadFavorites();
  }

  async presentToast(message: string, duration = 2000) {
    const toast = await this.toastController.create({
      message,
      duration
    });
    toast.present();
  }

  saveToFavorites(article: Article) {
    const exist = this.favorites.find(art => art.title === article.title);

    if (!exist) {
      this.favorites.unshift(article);
      this.storage.set('favorites', this.favorites);
    }

    this.presentToast('Agregado a favoritos');
  }

  deleteFromFavorites(article: Article) {
    this.favorites = this.favorites.filter(art => art !== article);
    this.storage.set('favorites', this.favorites);
    this.presentToast('Eliminado de favoritos');
  }

  async loadFavorites() {
    const favorites = await this.storage.get('favorites');

    if (favorites) {
      this.favorites = favorites;
    }
  }
}
