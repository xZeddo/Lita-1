import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Database, set, ref, update, onValue } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  constructor(public auth: Auth, public database: Database, private router: Router) {

  }
  uid = "";
  ab = "";
  role = true;
  user = "";
  registerUser(value: any) {
    const starCountRef = ref(this.database, 'users/' + value.email);
    onValue(starCountRef, (snapshot) => {
     const db = snapshot.val();  
     this.ab = db.email
 
     }); 
  
      
     if (  value.username == null || value.username == "" || value.email == null || value.email == "" || value.password == null || value.password == "" 
      ){
      alert('Fill the form ');
     }else{
      if(this.ab == value.email){
       alert('user email already exist!'); 
      }
  
        
      else {
        if(value.roles == "admin"){
          this.role = true;
        } 
        else if(value.roles == "user"){
          this.role = false;
        }
        this.uid = "user" + Math.floor(100000 + Math.random() * 900000);
      set(ref(this.database, 'users/' + value.email), {
        email: value.email,
        password: value.password,
        admin: this.role
  
  
       }); 
       alert('account created!');
       this.router.navigate(['/login'])
      }
     }
  }

}


