import { Component , OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import {  AngularFireDatabase } from '@angular/fire/compat/database';
import { Database,remove,ref,update, onValue, set} from '@angular/fire/database';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  username = sessionStorage.getItem('id');
  data = "";
  names = "";
  sent = true;
  role =true;
  post = "";
  name ="";
 currentpost="";
 currentcomment="";
 
 comid="";
  account!: Observable<any[]>;
  comments!: Observable<any[]>;
  constructor(public database: Database, private FireDb: AngularFireDatabase) {
 
  this.account = FireDb.list('/post').valueChanges();
 
  const starCountRef = ref(this.database, 'users/' + this.username);
    onValue(starCountRef, (snapshot) => {
     const db = snapshot.val();  
  this.name = db.email;
  this.role = db.admin;
  
     });
 
 console.log(this.name)
 console.log(this.role)
   if(this.names !=""){
     this.sent = true;
   }else if(this.names == ""){
     this.sent = false;
   }
   }
   
 
   del(value: any){
     remove(ref(this.database, 'post/' + value));
     alert('Deleted Successfully')
   }
   
   ngOnInit(): void {
   }
   uuid = "";
   upload(value:any){
     this.uuid = "post" +Math.floor(100000 + Math.random() * 900000);
     set(ref(this.database, 'post/' + this.uuid), {   
         name: value.name,
         post: value.post,
         id: this.uuid
  
        }); 
        alert('Posted!');
 
       this.post = "";
       }
 
       delete(value: any){
         remove(ref(this.database, 'post/' + value));
         alert('Deleted Succesfully')
       }
       //commenting
      commenter(value: any){
        this.comid = "comment" + Math.floor(100000 + Math.random() * 900000);
        set(ref(this.database, 'post/'+value.id+'/comment/ ' + this.comid),{
          name: value.name,
          comment: value.post,
          id: this.comid,
          postid: value.id,
        });
        alert('Successfully Commented!');
        this.post="";
      }

      //display comment
      getComment(post:any){
      this.comments = this.FireDb.list('/post/'+post+'/comment/').valueChanges();
      this.currentpost=post;
      }

      //logout
      logout(){
        sessionStorage.clear();
      }
 
 }


//   username = sessionStorage.getItem('id');
//   data = "";
//   names = "";
//   sent = true;
//   role =true;
//   post = "";
//   name ="";
//   uuid = "";
// /*
//   post = "";
//   name = ""; */


//   account!: Observable<any[]>;
//   constructor(public database: Database, private FireDb: AngularFireDatabase) {
//   this.account = FireDb.list('/post').valueChanges();}
  


//   const starCountRef = ref(this.database, 'users/' + this.username);
//   onValue(starCountRef, (snapshot) => {
//    const db = snapshot.val();  
//   this.name = db.email;
//   this.role = db.admin;

//    });




//   upload(value:any){
//     this.uuid = "post" +Math.floor(100000 + Math.random() * 900000);
//     set(ref(this.database, 'post/' + this.uuid), {   
//         name: value.name,
//         post: value.post,
//         id: this.uuid
 
//        }); 
//        alert('Posted!');

//       this.post = "";
//       }
// }



