import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './auth-guard.service';
import { RegisterComponent } from './register/register.component';
import {BulletinComponent} from './main/voter/bulletin/bulletin.component';
import {AddElectionComponent} from './main/admin/add-election/add-election.component';
import {EditElectionComponent} from './main/admin/edit-election/edit-election.component';
import {AddUserComponent} from './main/admin/add-user/add-user.component';

const appRoutes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "main", component: MainComponent, canActivate: [AuthGuard]},
  { path: "bulletin", component: BulletinComponent, canActivate: [AuthGuard]},
  { path: "add-election", component: AddElectionComponent, canActivate: [AuthGuard]},
  { path: "edit-election/:id", component: EditElectionComponent, canActivate: [AuthGuard]},
  { path: "add-user", component: AddUserComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
