import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  itemsList: FirebaseListObservable<any>;
  itemsObj: FirebaseObjectObservable<any>;
  rooms: Array<{name:string}>;
  numOfRooms: any = 0;
  createGroup: any = false;
  roomLength: any = 0;
  firstCall: any = true;
  menuShown: any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.itemsList = db.list('/rooms', { preserveSnapshot: true });
    this.itemsObj = db.object('/rooms', { preserveSnapshot: true });
    this.rooms = [];
	  this.checkRooms();
  }

  createRoom(){
    if(this.createGroup == true){
    var x = (<HTMLInputElement>document.getElementById('groupname')).value;
      if(x == ""){
        console.log("Group name cannot be empty.");
      } else{
        this.db.database.ref('rooms').child(x).set({id:this.numOfRooms+1});
        this.rooms.push({name:x});
      }
      this.checkRooms();
    }
  }

  toggleInput(){
    if(this.createGroup == false){ this.createGroup = true; }
    else { this.createGroup = false; }
  }

  toggleGroupMenu(){
   switch(this.menuShown){
     case(true): this.menuShown = false;
      break;
     case(false): this.menuShown = true;
      break;
   }
  }

  checkRooms(){
    this.itemsList.subscribe(snapshot => {
      if(snapshot.length == 0){
        console.log("No rooms here");
        console.log("Try add one");
      }
      snapshot.forEach(pos =>{
        console.log(pos.key, pos.val());
        if(this.firstCall == true){
          this.rooms.push({name: pos.key});
        }
      });
      this.numOfRooms = snapshot.length;
      if(this.firstCall == true){
        this.firstCall = false;
      }
	  });
  }
}
