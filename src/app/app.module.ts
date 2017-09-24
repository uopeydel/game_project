import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { CameraPage } from '../pages/camera/camera';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { Badge } from '@ionic-native/badge';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Configuration, Constants } from './app.constants';
import { LoginComponent } from "../pages/security/login/login.component";

//import { LocalStorageModule } from "angular-2-local-storage";
import { HttpService } from "../pages/security/loader/http.service";
import { LoaderService } from "../pages/security/loader/loader.service";
import { AuthGuard } from "../pages/security/authentication/guard/auth.guard";
import { AuthenticationService } from '../pages/security/authentication/service/auth.service';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { LocalStorageModule } from "angular-2-local-storage/dist";

import { FriendListPage } from "../pages/friendlist/friendlist";
import { ChatListPage } from "../pages/chatlist/chatlist";
import { ChatPage } from "../pages/chat/chat";
import { SettingPage } from "../pages/setting/setting";
import { SearchForAddFriendModal } from "../pages/searchforaddfriendmodal/searchforaddfriendmodal";
import { FriendListService } from "../pages/friendlist/friendlist.service";
//


const APP_PROVIDERS = [
  Configuration,
  Constants,
];
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CameraPage,

    LoginComponent,
    FriendListPage,
    ChatListPage,
    ChatPage,
    SettingPage,

    SearchForAddFriendModal

  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp , {tabsPlacement:'top',tabsHideOnSubPages: true}),

    LocalStorageModule.withConfig({
      prefix: 'README',
      storageType: 'localStorage'
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CameraPage,

    LoginComponent,
    FriendListPage,
    ChatListPage,
    ChatPage,
    SettingPage,

    SearchForAddFriendModal
  ],
  providers: [
    Camera,
    Badge,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },

    HttpService,
    LoaderService,
    {
      provide: Http,
      useFactory: (backend: XHRBackend, options: RequestOptions, loadservice: LoaderService) => {
        return new HttpService(backend, options, loadservice);
      },
      deps: [XHRBackend, RequestOptions, LoaderService]
    },
    AuthGuard,
    APP_PROVIDERS,
    AuthenticationService,
    FriendListService

  ]
})
export class AppModule { }
