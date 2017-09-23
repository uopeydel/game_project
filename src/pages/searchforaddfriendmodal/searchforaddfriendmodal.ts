import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-searchforaddfriendmodal',
  templateUrl: 'searchforaddfriendmodal.html'
})
export class SearchForAddFriendModal {

  constructor(params: NavParams, public viewCtrl: ViewController) {
    console.log('UserIda', params.get('userId'));
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

}
