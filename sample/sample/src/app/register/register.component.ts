import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Database, set, ref, update } from '@angular/fire/database';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(public auth: Auth, public database: Database) {

  }

  registerUser(value: any) {
    createUserWithEmailAndPassword(this.auth, value.email, value.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        set(ref(this.database, 'users/' + user.uid), {
          
          email: value.email,
          password:value.password
        });

        alert('user created! ');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
        // ..
      });
  }

  
        


}


