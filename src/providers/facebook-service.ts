import { Injectable } from '@angular/core';
import { Facebook } from "@ionic-native/facebook";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FacebookService {

  session: any;

  constructor (public facebook: Facebook) {}

  login(){
    return Observable.create(observer => {
      this.facebook.login(['email']).then((response) => {
        if (response.status === "connected") {
          this.session = response;
          observer.next(true);
          observer.complete();
        } else {
          observer.next(false);
          observer.complete();
        }
      }, (error) => {
        console.log(error);
      });
    });
  }

  getProfile(){
    return Observable.create(observer => {
      if(this.session.status === "connected"){
        this.facebook.api("/me?fields=name,picture", ["public_profile"]).then((response)=>{
          console.log(response);
          observer.next(response);
          observer.complete();
        },(error) => {
          console.log(error) });
      } else {
        observer.next(undefined);
        observer.complete();
      }
    });
  }
}
