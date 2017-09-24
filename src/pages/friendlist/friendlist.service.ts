import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Configuration } from "../../app/app.constants";
import { Observable } from "rxjs/Observable";
import { UserModel } from "../../app/user-model";


@Injectable()
export class FriendListService {
    constructor(
        private _config: Configuration,
        private http: Http,
        //private localStorageService: LocalStorageService
    ) { }

    getFriendList(_id: string): Observable<Array<UserModel>> {
        const url = this._config.apiREADMEURL + "api/V1/Friends/GetFriendList/" + _id;
        return this.http.get(url).map(result => result.json() as Array<UserModel>);
    }
    
}