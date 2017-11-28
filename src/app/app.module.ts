import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MultiSelectModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RadioButtonModule} from 'primeng/primeng';

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
import {ElgamalService} from './services/elgamal.service';
import {CandidateService} from './services/candidate.service';
import { AddElectionComponent } from './main/admin/add-election/add-election.component';
import { EditElectionComponent } from './main/admin/edit-election/edit-election.component';
import { AddUserComponent } from './main/admin/add-user/add-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    VoterComponent,
    AdminComponent,
    ElectionComponent,
    BulletinComponent,
    AddElectionComponent,
    EditElectionComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MultiSelectModule,
    InputTextModule,
    DialogModule,
    BrowserAnimationsModule,
    RadioButtonModule,
    HttpModule
  ],
  providers: [AuthService, AuthGuard, UserService, ElectionService, BulletinService, ElgamalService, CandidateService, UserService, ElectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
