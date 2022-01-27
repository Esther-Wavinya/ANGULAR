import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ResetComponent } from "./components/reset/reset.component";
import { VerifyAccountComponent } from "./components/verify-account/verify-account.component";
import { VerifyEmailComponent } from "./components/verify-email/verify-email.component";
import { LoginGoogleComponent } from "./components/login-google/login-google.component";
import { PendingInvitesComponent } from "./components/pending-invites/pending-invites.component";
import { InvitesLoaderComponent } from "./components/invites-loader/invites-loader.component";
import { ReverseGuardGuard } from "./guard/reverse-guard.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [ReverseGuardGuard],
    canActivateChild: [ReverseGuardGuard],
  },
  {
    path: "loginWithGoogle/:access_Token",
    component: LoginGoogleComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
    // canDeactivate:[AuthGuard]
  },
  {
    path: "resetPassword",
    component: ResetComponent,
  },
  {
    path: "forgotPassword",
    component: ForgotPasswordComponent,
  },

  {
    path: "verifyEmail",
    component: VerifyEmailComponent,
  },
  {
    path: "verifyAccount",
    component: VerifyAccountComponent,
  },
  {
    path: "pendingInvites/:email",
    component: PendingInvitesComponent,
  },
  {
    path: "invites",
    component: InvitesLoaderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
