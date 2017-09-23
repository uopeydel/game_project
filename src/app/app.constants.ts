import { Injectable } from '@angular/core';

import { UserModel } from './user-model';
import { LocalStorageService } from "angular-2-local-storage/dist";

@Injectable()
export class Configuration {

    public READMEClientId: string = '7d21b637c25e49908b7f1b2a96d6363d';
    public apiAuthURL: string = 'https://auth.builk.com/';
    public apiREADMEURL: string = 'http://localhost:63136/';
    
}

@Injectable()
export class Constants {
    public today = new Date().toJSON().split('T')[0];
    
    public userData: UserModel = <UserModel>{};

    constructor(private localStorageService : LocalStorageService) {
        this.getLocalStorage();
    }

    public getLocalStorage() {
        //this.localStorageService.set("User", mockUserData);
        this.userData = this.localStorageService.get<UserModel>("User");
        // this.companyData = this.localStorageService.get<CompanyModel>("Company");
        // this.projectData = this.localStorageService.get<ProjectModel>("Project");

    }
}