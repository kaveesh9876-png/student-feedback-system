import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './components/login/login';
// import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
// import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { authGuard } from './guards/auth-guard'; // Optional if you're securing routes
import { Login } from './components/login/login';
import { FeedbackForm } from './components/feedback-form/feedback-form';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard'
import { Signup } from './signup/signup';
import { Profile } from './profile/profile';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'feedback', component: FeedbackForm },
  { path: 'sign-up', component: Signup },
  { path: 'profile', component: Profile },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard] }, // secured route
  { path: '**', redirectTo: 'login' }, // wildcard route
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
