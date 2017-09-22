import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as signalR from '@aspnet/signalr-client'; 
import { CameraPage } from '../camera/camera';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController  ) {

    }

    redirect(){

        this.navCtrl.push(CameraPage);
    }


    //cameraPage:any = CameraPage;
    OpenCamera(){
        //this.cameraPage.sert

    }
    public counter: number = 0;
    onTap() {
        this.counter++;
        alert("Tapped " + this.counter + " times!");
    }

    sendMessage(){
        this.connection.invoke("Send", "test" + this.counter);
    }

    StartSignalR() {
        console.log("start signalr");
        this.doSigNalR();
    }

    connection: signalR.HubConnection;
    transportType: signalR.TransportType;


    users: Array<any> = new Array<any>();
    messages: Array<any> = new Array<any>();

    doSigNalR() {
        this.transportType = signalR.TransportType.WebSockets;
        let logger = new signalR.ConsoleLogger(signalR.LogLevel.Information);

        let connectOption = new signalR.HttpClient();
        console.log(connectOption.options);
        var Domain = `http://${document.location.host}/chat`;
        Domain = 'http://localhost:63135/NotificationHub';
        let http = new signalR.HttpConnection(Domain, { transport: this.transportType, logging: logger });

        this.connection = new signalR.HubConnection(http);

        this.connection.onClosed = e => {
            if (e) {
                this.appendLine('Connection closed with error: ' + e, 'red');
            }
            else {
                this.appendLine('Disconnected', 'green');
            }
        };

        this.connection.on('Send', (userName, message) => {
            this.messages.push(userName + ':' + message);
        });

        this.connection.start()
            .then(data => {
                this.connection.invoke("RegisterUserMap", 1, 1);
            })
            .catch(err => {
                this.appendLine(err, 'red');
                this.connection.stop();
            });
    }
    appendLine(line: any, color?: any) {

        this.messages.push(line);
        console.log(this.messages);
    };

}
