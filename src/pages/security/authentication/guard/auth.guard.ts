import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
//import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../service/auth.service';
import { LoginComponent } from "../../login/login.component";

@Injectable()
export class AuthGuard {

    constructor(
        public navCtrl: NavController,
        private localStorageService: LocalStorageService,
        private AuthService: AuthenticationService
    ) { }

    canActivate(): Observable<boolean> | boolean {
        //var tempRoute = state.url;

        if (this.localStorageService.get("accessToken")) {

            var user_name = this.localStorageService.get<string>("userEmail");
            var access_token = this.localStorageService.get<string>("accessToken");
            var refresh_token = this.localStorageService.get<string>("refreshToken");
            //Check Validate Token 
            if (this.AuthService.checkValidateToken(access_token)) {
                //Exist Token
                //Check Time Token
                var datetime = (Date.now() / 1000);
                var expires_time = this.localStorageService.get<number>("expiresTime");
                var remain_time = expires_time - datetime;

                if (remain_time > -1) {
                    //Refresh Token
                    if (remain_time < 600) {

                        //api to refresh Token
                        return this.AuthService.refreshToken(user_name, access_token, refresh_token).map(response => {
                            if (response) {
                                this.localStorageService.set("accessToken", response.access_token);
                                this.localStorageService.set("refreshToken", response.refresh_token);
                                this.localStorageService.set("expiresTime", (Date.now() / 1000) + response.expires_in);
                                console.log("refresh token");
                                this.AuthService.checkRoleForRedirect(/*tempRoute*/);
                                return true;
                            } else {
                                response => {
                                    console.log("Try to Login again");
                                }
                            }
                        })

                    } else {
                        //console.log("exist token");
                        //check user data
                        this.AuthService.checkRoleForRedirect(/*tempRoute*/);
                        return true;
                    }
                } else {
                    console.log("expire token");
                    this.navCtrl.push(LoginComponent);
                }

            } else {
                //Wrong Token
                console.log("wrong token");
                this.navCtrl.push(LoginComponent);

            }
        } else {
            console.log("not have token");
            this.navCtrl.push(LoginComponent);
        }

    }


}