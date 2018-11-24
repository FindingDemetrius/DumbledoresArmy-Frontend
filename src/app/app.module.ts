import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './home/map/map.component';
import { RegisterComponent } from './register/register.component';
import { CreateChallengeComponent } from './challenge/create/create-challenge.component';
import { ProfileComponent } from './profile/profile.component';
import { QuestionsChallengeComponent } from './challenge/create/questions/questions-challenge.component';

import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { InfoWindowComponent } from './home/map/info-window/info-window.component';
import { AnswerChallengeComponent } from './challenge/answer-challenge/answer-challenge.component';
import { ClarityModule } from '@clr/angular';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

// Code that pertains to the map API
import { AgmCoreModule } from '@agm/core';
import { ChallengeComponent } from './challenge/challenge.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    MapComponent,
    RegisterComponent,
    CreateChallengeComponent,
    ChallengeComponent,
    ProfileComponent,
    QuestionsChallengeComponent,
    ProfileComponent,
    InfoWindowComponent,
    AnswerChallengeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatAutocompleteModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAuWYQMjlgGD0hyuVTavbz5uXAENMWV6LA'
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCAywy9aaWOwm4NKexDKM02Vko-_I_GIH0'
    }),
    ClarityModule,
    AgmJsMarkerClustererModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
