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


  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      function() {

        this.navCtrl.push(ListPage);
      }
    );
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
