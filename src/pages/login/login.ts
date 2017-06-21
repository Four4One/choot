import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavController, NavParams } from 'ionic-angular';
import { ListPage } from '../list/list';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {

  user: Observable<firebase.User>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.user = afAuth.authState;
    if (this.user != null) {
      this.navCtrl.setRoot(ListPage);
    }
  }

  login() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((result) => {
        this.navCtrl.setRoot(ListPage);
        console.log("test");

      });

  }


  logout() {
    this.afAuth.auth.signOut();
  }

}
