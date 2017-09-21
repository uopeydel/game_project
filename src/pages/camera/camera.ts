import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
    selector: 'page-camera',
    templateUrl: 'camera.html'
})
export class CameraPage {

    constructor(
        public navCtrl: NavController,
        private camera: Camera
    ) {
         
    }

    image : any;

    options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    }
    OpenCamera() {
        console.log('camera page');
        this.camera.getPicture(this.options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.image = base64Image;
        }, (err) => {
        // Handle error
        });
    }

}
