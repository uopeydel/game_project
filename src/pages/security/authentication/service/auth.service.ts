import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs';
import { Configuration } from '../../../../app/app.constants';

import { AuthData } from '../model/auth.data';
import { UserModel } from '../../../../app/user-model';

import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

    constructor(
        private _config: Configuration,
        private http: Http,
        private localStorageService: LocalStorageService
    ) { }

    public userEmail: string;
    sub: any;

    login(username: string, password: string): Observable<AuthData> {
        console.log(username, password);
        this.userEmail = username;

        let dataObj = {
            ClientId: this._config.READMEClientId,
            UserName: username,
            Password: password,
            GrantType: 'password'
        }

        const url = this._config.apiAuthURL + "api/v1/Auth";
        let headers = new Headers({ 'Content-Type': 'text/json' });
        let options = new RequestOptions({ headers: headers });

        this.sub = this.http.post(url, dataObj, options).map(this.extractDataOb).catch(this.handleError);

        return this.sub;
    }

    refreshToken(username: string, access_token: string, refresh_token: string): Observable<AuthData> {

        let dataObj = {
            ClientId: this._config.READMEClientId,
            Access: access_token,
            Refresh: refresh_token,
            UserName: username,
            GrantType: 'refresh'
        }

        const url = this._config.apiAuthURL + "api/v1/Auth";
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.sub = this.http.post(url, dataObj, options).map(this.extractDataOb).catch(this.handleError);

        return this.sub;
    }

    logout(access_token: string, refresh_token: string): Observable<any> {

        let dataObj = {
            Access: access_token,
            Refresh: refresh_token
        }

        const url = this._config.apiAuthURL + "api/v1/ManagementTokens/ClearTokens";
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.sub = this.http.post(url, dataObj, options).catch(this.handleError);

        // clear token remove user from local storage to log user out
        this.localStorageService.clearAll();

        return this.sub;
    }

    // forgetPassword(username: string): Observable<any> {
    //     this.userEmail = username;
    //     let dataObj = {
    //         UserName: username,
    //         FromUrl: 'README'
    //     }
    //     const url = this._config.apiAuthURL + "api/v1/Account/PreResetPassword";
    //     let headers = new Headers({
    //         'Content-Type': 'application/json',
    //         "Accept": 'application/json'
    //     });
    //     let options = new RequestOptions({ headers: headers });
    //     this.sub = this.http.post(url, dataObj, options).catch(this.handleError);
    //     return this.sub;
    // }

    checkValidateToken(access_token: string): boolean {

        //Check token (wait authv2 implement)
        return true;
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private extractDataOb(res: Response) {
        let body = res.json() as AuthData;
        return body || {};
    }

    // registerUser(user_data: RegisterData): Observable<any> {
    //     const url = this._config.apiREADMEURL + "api/V1/Authorization/Register";
    //     let headers = new Headers({
    //         'Content-Type': 'application/json'
    //     });
    //     let options = new RequestOptions({ headers: headers });
    //     this.sub = this.http.post(url, user_data, options).catch(this.handleError);
    //     return this.sub;
    // }

    private extractData(res: Response) {
        let body = res.json() as UserModel;
        return body || {};
    }

    getUserData(user_email: string): Observable<UserModel> {
        const url = this._config.apiREADMEURL + "api/V1/Users/GetUserByEmail/" + user_email;
        return this.http.get(url).map(this.extractDataOb).catch(this.handleError);
    }

    checkRoleForRedirect(/*tempRoute: string*/) {
        let Users = this.localStorageService.get<UserModel>("User");
        console.log('User =>> ', Users);
    }

}