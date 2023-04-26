import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { PostComponent } from './post/post.component';
import { RegisterComponent } from './register/register.component';
import { SampleComponent } from './sample/sample.component';

const routes: Routes = [
  {path: 'login',component:LogInComponent},
  {path: 'reg',component:RegisterComponent},
  {path: '',redirectTo:'reg',pathMatch:'full'},
  {path: 'posts',component:PostComponent},
  {path: 'samp',component:SampleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
