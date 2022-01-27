import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  subscription = new Subscription();
  emailValidatorPattern =
    '[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)' +
    '*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?';
  errorMessage: {
    title: string;
    message: string;
  };
  registeredSuccessfullyMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute

  ) {
    if (this.authService.isLoggedIn()) {
      const redirectUrl = this.authService.redirectUrl || '/organization';
      this.router.navigateByUrl(redirectUrl);
    }


  }


  ngOnInit(): void {

    this.getParams();
    if (this.authService.registeredSuccessfully) {
      this.registeredSuccessfullyMessage = `You have being successfully registered, please login in with your credentials.`;
    }
    this.LoginFormFunc();

    // console.log(localStorage.getItem("email"))

  }
  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  LoginFormFunc(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  // Get form field to validator form with
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  submitLoginDetails(): void {
    this.registeredSuccessfullyMessage = undefined;
    const userDetails = this.loginForm.value;
    this.subscription.add(
      this.authService
        .login(userDetails.username, userDetails.password)
        .subscribe({
          next: () => {
            this.errorMessage = undefined;
            this.router.navigate([`/auth/pendingInvites/${userDetails.username}`]);
          },
          error: (err) => {
            this.errorMessage = {
              title: 'We couldn\'t sign you in.',
              message: err.error.message,

            };
          },
        })
    );
  }

  // invites

  getParams() {
    let isInvited: boolean;
    let hasAccount: string;
    let email: string;

    this.route.queryParams.subscribe(

      (param) => {
        isInvited =   Boolean(param.isInvited);
        hasAccount = (param.hasAccount);
        email = param.email;
      }
    );


    if (isInvited) {
      if (hasAccount === 'true') {
        this.router.navigate(['auth/pendingInvites']);
      } else {
        this.router.navigate(['auth/register']);
      }

    } else {
      this.router.navigate(['/organization']);
    }

  }
}
