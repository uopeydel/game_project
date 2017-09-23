import { Component } from '@angular/core';
 
import { FriendListPage } from "../friendlist/friendlist";
import { ChatListPage } from "../chatlist/chatlist";
import { SettingPage } from "../setting/setting";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  friendListRoot = FriendListPage;
  chatListRoot = ChatListPage;
  settngRoot = SettingPage; 
  constructor() {

  }


}
