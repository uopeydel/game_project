import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SearchForAddFriendModal } from "../searchforaddfriendmodal/searchforaddfriendmodal";

@Component({
  selector: 'page-friendlist',
  templateUrl: 'friendlist.html'
})
export class FriendListPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }
  ngOnInit() {
    //console.log('x ngOnInit.');
  }

  ionViewDidLoad() {
    //console.log('x ionViewDidLoad.');
  }

  ionViewWillEnter() {
    console.log('x ionViewWillEnter.');
  }

  ionViewWillLeave() {
    console.log('x ionViewWillLeave.');
  }

  ionViewWillUnload() {
    //console.log('x ionViewWillUnload.');
  }

  openSearchForAddFriendModal() {
    let searchAddFriendModal = this.modalCtrl.create(
      SearchForAddFriendModal,
      { userId: 8675309 },
      { enableBackdropDismiss: true, showBackdrop: true }
    );

    searchAddFriendModal.onDidDismiss(data => {
      console.log(data);
    });

    searchAddFriendModal.present();

  }

}
