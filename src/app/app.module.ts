import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';



import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './auth-guard.service';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import {UserService} from './services/user.service';
import { VoterComponent } from './main/voter/voter.component';
import { AdminComponent } from './main/admin/admin.component';
import { ElectionService } from './services/election.service';
import { ElectionComponent } from './main/voter/election/election.component';
import { BulletinComponent } from './main/voter/bulletin/bulletin.component';
import { BulletinService } from './services/bulletin.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    VoterComponent,
    AdminComponent,
    ElectionComponent,
    BulletinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [AuthService, AuthGuard, UserService, ElectionService, BulletinService],
  bootstrap: [AppComponent]
})
export class AppModule { }
