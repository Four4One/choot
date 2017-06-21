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
<<<<<<< HEAD
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  createinput: boolean;
  showcount: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.createinput = false
    this.showcount = false

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
=======
  items: FirebaseObjectObservable<any>;
  rooms: Array<{name:string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
  this.items = db.object('/rooms', { preserveSnapshot: true });
	  this.items.subscribe(snapshot => {
      if(snapshot.val() == null){
        console.log("No rooms here");
      }
      for(var i = 0; i < snapshot.val().length; i++){
	       this.rooms.push(snapshot.val()[i])
      }
	  });
>>>>>>> da1ae56e3af1d1cd0b26163f19e7e009636483aa
  }
  createRoom(name){
    this.items.subscribe(snapshot => {
      this.db.database.ref('rooms').child(name).set({id:snapshot.val()+1});
    });
  }
<<<<<<< HEAD

  togglecreateinput() {
    this.createinput = true  
  }

  untogglecreateinput() {
    this.createinput = false
  }

  addgroup(groupname) {
      console.log(groupname.value)
  }

  hidesidetext(){
    if(this.showcount){
      this.showcount = false
    }else{
      this.showcount = true
    }  
    
  }
=======
>>>>>>> da1ae56e3af1d1cd0b26163f19e7e009636483aa
}
