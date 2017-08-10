import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class CountriesData {
  data: any;

  constructor(public http: Http) { }

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get('assets/data/data.json').map(res => res.json());
    }
  }

  getCountries(startIndex: number, endIndex: number): any {
    return this.load().map((data: any) => {    
      debugger  
      this.data = data;
      var resultCountries = [];
      var arrayLn = data.countries.length;

      if(startIndex > arrayLn-1)
        return resultCountries;

      if(endIndex > arrayLn - 1)
        endIndex = arrayLn;
      
      for (var i = startIndex; i <= endIndex; i++) {
        resultCountries.push(data.countries[i]);
      }

      return resultCountries;
    });
  }
}