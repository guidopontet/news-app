import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {

  @Input() new: Article;
  @Input() index: number;

  constructor(
    private inAppBrowser: InAppBrowser,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing
  ) { }

  ngOnInit() {}

  openNew() {
    this.inAppBrowser.create(this.new.url, '_system');
  }

  async openMenu() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Favoritos',
        icon: 'star',
        cssClass: 'new__action-sheet--dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }, {
        text: 'Compartir',
        icon: 'share',
        cssClass: 'new__action-sheet--dark',
        handler: () => {
          this.socialSharing.share(
            this.new.title,
            this.new.source.name,
            '',
            this.new.url
          );
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

}
