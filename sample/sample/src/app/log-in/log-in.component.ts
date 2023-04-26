import { Component } from '@angular/core';
import {Auth} from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {from} from 'rxjs';
import { Database, set, ref, update, onValue } from '@angular/fire/database';
import { Router } from '@angular/router';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
  
})
export class LogInComponent {
  data = "";
  email = "";
  constructor(public auth: Auth, public database: Database,private router: Router) { }
  registerUser(value: any) {

    signInWithEmailAndPassword(this.auth, value.email, value.password)
    const starCountRef = ref(this.database, 'users/' + value.email);
    onValue(starCountRef, (snapshot) => {
     const db = snapshot.val();  
    this.data = db.password;
  
     }); 
     if (this.data == value.password){
      const date = new Date();
  update(ref(this.database, 'users/' + value.email),{
  last_login:date
  } );
  sessionStorage.setItem('id',value.email);
  
  this.router.navigate(['/posts'])
  }else{
  alert('wrong credential!');
  }
    }
}

