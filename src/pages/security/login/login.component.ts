import { Component, OnInit, ViewChild } from '@angular/core';
//import { ActivatedRoute, Router } from '@angular/router';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Rx';
import { Subscription } from "rxjs/Subscription";
//import { Title } from '@angular/platform-browser';
import { LocalStorageService } from 'angular-2-local-storage';

import { Configuration, Constants } from '../../../app/app.constants';

/* Import service */
import { AuthenticationService } from '../authentication/service/auth.service';
/* Import model */
import { AuthData } from '../authentication/model/auth.data';
import { UserModel } from '../../../app/user-model';


@Component({
    selector: 'login',
    templateUrl: './login.html',

})

export class LoginComponent implements OnInit {
    constructor(
        private AuthService: AuthenticationService,
        private localStorageService: LocalStorageService,
        private Config: Configuration,
        private Cons: Constants,
        private http: Http,

    ) {
    }

    ngOnInit(): void {

        //Check token and redirect to Home
        if (this.localStorageService.get("accessToken")) {
            this.AuthService.checkRoleForRedirect();
        }

    }
    private username: string = 'peerapol@builk.com';
    private password: string = 'builk1123';
    //peerapol@builk.com builk1123

    auth_data: AuthData = new AuthData();

    onLogin(event) {
        this.Login(this.username, this.password);
    }

    onLogout(event) {
        var access = this.localStorageService.get<string>("accessToken");
        var refresh = this.localStorageService.get<string>("refreshToken");
        this.AuthService.logout(access, refresh);
    }

    Login(username: string, password: string) {

        this.AuthService.login(username, password)
            .subscribe((response: AuthData) => {
                this.auth_data = response;
                console.log(this.auth_data);
                //Storage Session
                this.localStorageService.set("userEmail", this.username);
                this.localStorageService.set("accessToken", this.auth_data.access_token);
                this.localStorageService.set("refreshToken", this.auth_data.refresh_token);
                this.localStorageService.set("expiresTime", (Date.now() / 1000) + this.auth_data.expires_in);

                this.getUserData();
            }, error => {
                console.log("login error", error);
            });
    }

    getUserData() {
        this.AuthService.getUserData(this.username)
            .subscribe((user: UserModel) => {
                console.log('check => localStorage Users', this.localStorageService.get<UserModel>("User"));
                this.localStorageService.set("User", user);
                let Userdata = this.localStorageService.get<UserModel>("User");
                console.log('set => localStorage Users', Userdata);
                this.AuthService.checkRoleForRedirect();
            }, error => {
                console.log("Get User Data error", error);
            })
    }


}