import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { Database, ref, set, update, remove,query,orderByChild,equalTo} from '@angular/fire/database';
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { getDatabase, onValue} from "firebase/database";
import { Observable } from 'rxjs';

interface Item {
  password: string;
}

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent {
  users!: Observable<any[]>;
  constructor(public database: Database, private db: AngularFireDatabase) {
  this.users = db.list('/users').valueChanges();
   }
   
  ngOnInit(): void {


  }
  del(value: any){
    remove(ref(this.database, 'accounts/' + value));
    alert('Deleted Successfully')
  }
  email = "";
password = "";
     edit(z: any) {
       this.email = z.email;
      this.password = z.password;
     }
  
     update(value:any){

   if(value.password == ""){
    alert('put the new password!');
   }else{
    update(ref(this.database, 'users/' + value.email), {
      password: value.password
    }); 
    this.email = "";
    this.password = "";
   alert('User updated!');
     
   }
    }
 
 


}