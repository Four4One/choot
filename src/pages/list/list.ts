import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  items: FirebaseObjectObservable<any>;
  rooms: Array<{name:string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
  this.items = db.object('/rooms', { preserveSnapshot: true });
	  this.items.subscribe(snapshot => {
      if(snapshot.val() == null){
        console.log("No rooms here");
      }
      for(var i = 0; i < snapshot.val().length; i++){
	       this.rooms.push(snapshot.val()[i]);
      }
	  });
  }
  createRoom(name){
    this.items.subscribe(snapshot => {
      this.db.database.ref('rooms').child(name).set({id:snapshot.val()+1});
    });
  }
}
