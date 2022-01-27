import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { ResetComponent } from "./components/reset/reset.component";
import { VerifyEmailComponent } from "./components/verify-email/verify-email.component";
import { VerifyAccountComponent } from "./components/verify-account/verify-account.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginGoogleComponent } from './components/login-google/login-google.component';
import { PendingInvitesComponent } from './components/pending-invites/pending-invites.component';
import { InvitesLoaderComponent } from './components/invites-loader/invites-loader.component';
import { NgbButtonsModule } from "@ng-bootstrap/ng-bootstrap";
// import { LoginWithGoogleComponent } from './components/login-google/login-google.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ResetComponent,
    VerifyEmailComponent,
    VerifyAccountComponent,
    ForgotPasswordComponent,
    LoginGoogleComponent,
    PendingInvitesComponent,
    InvitesLoaderComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbButtonsModule
  ],
})
export class AuthenticationModule {}
