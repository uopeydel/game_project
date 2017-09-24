import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SearchForAddFriendModal } from "../searchforaddfriendmodal/searchforaddfriendmodal";
import { FriendListService } from "./friendlist.service";
import { Constants, Configuration } from "../../app/app.constants";
import { UserModel } from "../../app/user-model";
import { ChatPage } from "../chat/chat";

@Component({
  selector: 'page-friendlist',
  templateUrl: 'friendlist.html'
})
export class FriendListPage {

  constructor(
    private _cons: Constants,
    private _config: Configuration,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private friendListServ: FriendListService
  ) {

  }

  friendList: Array<UserModel> = new Array<UserModel>();
  ngOnInit() {
    //console.log('x ngOnInit.');
  }

  ionViewDidLoad() {
    //console.log('x ionViewDidLoad.');

    this.friendListServ.getFriendList(this._cons.userData._id)
      .subscribe((dataFriendList: Array<UserModel>) => {
        this.friendList = dataFriendList
        console.log('dataFriendList ', dataFriendList);
      }, err => {
        alert("error => get Friend List error");
      });
  }

  ionViewWillEnter() {
    this._cons.getLocalStorage();
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

  openChatPage() {
    this.navCtrl.push(ChatPage);

  }

}
