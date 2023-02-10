import { Component } from '@angular/core';
import {Auth} from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {from} from 'rxjs';
import { Database, set, ref, update } from '@angular/fire/database';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
  
})
export class LogInComponent {
  constructor(public auth: Auth, public database: Database) { }
  registerUser(value: any) {

    signInWithEmailAndPassword(this.auth, value.email, value.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        const date = new Date();
        update(ref(this.database, 'users/' + user.uid), {

          last_login: date
        });

        alert('user loged in!');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage)
      });
  }

}

