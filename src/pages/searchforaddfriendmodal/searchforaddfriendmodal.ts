import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Badge } from '@ionic-native/badge';

@Component({
  selector: 'page-searchforaddfriendmodal',
  templateUrl: 'searchforaddfriendmodal.html'
})
export class SearchForAddFriendModal {

  constructor(params: NavParams, public viewCtrl: ViewController ,private badge: Badge) {
    console.log('UserIda', params.get('userId'));
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  tryAddBadge(){
    this.badge.set(10);

  }

  setBadge(){
    this.badge.set(10);

  }

  increaseBadge(){
    this.badge.increase(1);

  }

  clearBadge(){
    this.badge.clear();

  }
}
