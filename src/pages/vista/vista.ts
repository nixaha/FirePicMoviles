import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-vista',
  templateUrl: 'vista.html',
})
export class VistaPage {
  platillos:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams);
    this.platillos= this.navParams.get('id');
}
}
