import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard';
import { FeedbackForm } from './components/feedback-form/feedback-form';
//import { App } from './app';
import { Login } from './components/login/login';
import { AppRoutingModule } from './app-routing-module';
import { HttpClientModule } from '@angular/common/http';
import { App } from './app';
import { Signup } from './signup/signup';
import { Profile } from './profile/profile';

//import { AppComponent } from './app.component'; // ✅

// import { LoginComponent } from './auth/login/login.component'; // ✅
// import { FeedbackFormComponent } from './feedback/feedback-form/feedback-form.component'; // ✅
// import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'; // ✅

@NgModule({
  declarations: [
    App,
    Login,
    FeedbackForm,
    AdminDashboardComponent,
    Signup,
    Profile,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule  // <- make sure this is here
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
