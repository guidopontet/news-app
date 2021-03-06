import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {

  @Input() new: Article;
  @Input() index: number;
  @Input() favoritePage = false;

  constructor(
    private inAppBrowser: InAppBrowser,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private localDataService: LocalDataService,
    private platform: Platform
  ) { }

  ngOnInit() {}

  openNew() {
    this.inAppBrowser.create(this.new.url, '_system');
  }

  async openMenu() {
    let favoritesBtn;

    if (this.favoritePage) {
      favoritesBtn = {
        text: 'Quitar de Favoritos',
        icon: 'trash',
        cssClass: 'new__action-sheet--dark',
        handler: () => {
          this.localDataService.deleteFromFavorites(this.new);
        }
      };
    } else {
      favoritesBtn = {
        text: 'Agregar a Favoritos',
        icon: 'star',
        cssClass: 'new__action-sheet--dark',
        handler: () => {
          this.localDataService.saveToFavorites(this.new);
        }
      };
    }

    const actionSheet = await this.actionSheetController.create({
      buttons: [favoritesBtn, {
        text: 'Compartir',
        icon: 'share',
        cssClass: 'new__action-sheet--dark',
        handler: () => {
          this.shareNews();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        cssClass: 'new__action-sheet--dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });

    await actionSheet.present();
  }

  shareNews() {
    if (this.platform.is('cordova')) {
      this.socialSharing.share(
        this.new.title,
        this.new.source.name,
        '',
        this.new.url
      );
    } else {
      if (navigator['share']) {
        navigator['share']({
            title: this.new.title,
            text: this.new.source.name,
            url: this.new.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        console.log('API Share no es soportado por el navegador actualmente');
      }
    }
  }
}
