import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { CountriesData } from '../../providers/countries-data'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items = [];
  page: number = 1;
  count: number = 50;
  strtIndx: number = 0;
  endIndx: number = this.count - 1;
  constructor(public navCtrl: NavController, public contriesData: CountriesData, public toastCntrl: ToastController) {
    contriesData.getCountries(this.strtIndx, this.endIndx).subscribe((data: any) => {
      this.calculateIndexes();
      this.items = data;
    })
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.calculateIndexes();
    setTimeout(() => {
      this.contriesData.getCountries(this.strtIndx, this.endIndx).subscribe((data: any) => {
        debugger
        if (data.length > 0) {
          data.forEach(country => {
            this.items.push(country);
          });
        }
        else {
          let toast = this.toastCntrl.create({
                message: "No more data available to display.",
                duration: 3000,
                position: "Bottom"
            });

            toast.onDidDismiss(() => {
                console.log('Dismissed toast');
            });

            toast.present();
        }

        console.log('Async operation has ended');
        infiniteScroll.complete();
      })
    }, 3000); // The loading part happens very fast. We can see the loding symbol if we put the timeout.
  }

  calculateIndexes() {
    this.page++;
    this.endIndx = (this.page * this.count) - 1;
    this.strtIndx = this.endIndx - (this.count - 1);
  }

}
