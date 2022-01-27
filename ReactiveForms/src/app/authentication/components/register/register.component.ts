import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthType } from '../../../shared/models/authType.enum';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Iinvites } from '../../models/invites.model';
import { InvitesService } from '../../services/invites.service';

export enum userMessageType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  loginOrGenerateOtp: Boolean;
  formFields = {
    email: "",
    password: "",
    repeatPassword: "",
  };
  registrationDetails: {};

  registerForm: FormGroup;
  emailValidatorPattern =
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)" +
    "*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
  userMessage: {
    type: userMessageType;
    message: string;
  };
  passwordMinLength = 6;
  userMessageType = userMessageType;

  invites: Iinvites[] = [];
  errorMessage: string = '';
  userDetails: {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private location: Location,
    private inviteService: InvitesService,

  ) {}

  ngOnInit() {
    this.registerFormFunc();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



  registerFormFunc() {
    this.registerForm = this.fb.group(
      {
        username: [""],
        firstname: ["", Validators.required],
        lastname: ["", Validators.required],
        email: [
          "",
          Validators.compose([
            Validators.pattern(this.emailValidatorPattern),
            Validators.minLength(3),
            Validators.maxLength(600),
          ]),
        ],
        password: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(this.passwordMinLength),
            Validators.maxLength(75),
          ]),
        ],
        passwordRepeat: ["", Validators.compose([Validators.required])],
      },
      {
        validator: this.mustMatch("password", "passwordRepeat"),
      }
    );
  }

  mustMatch(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey];
      const passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }
  get username() {
    return this.registerForm.get("username");
  }

  get lastname() {
    return this.registerForm.get("lastname");
  }
  get firstname() {
    return this.registerForm.get("lastname");
  }
  get email() {
    return this.registerForm.get("email");
  }
  get password() {
    return this.registerForm.get("password");
  }
  get passwordRepeat() {
    return this.registerForm.get("passwordRepeat");
  }

  submitRegisterDetails() {
    this.userDetails = this.registerForm.value;
 
     this.subscription.add(
       this.authService
         .register(
           this.userDetails.username,
           this.userDetails.firstname,
           this.userDetails.lastname,
           this.userDetails.email,
           this.userDetails.password,
           AuthType.USERNAME
         )
         .subscribe(
           (res) => {
             this.userMessage = {
               type: userMessageType.SUCCESS,
               message:
                 "You have registered successfully. A link was sent to your email to verify your account.",
             };
               this.getInvites(this.userDetails.email);
             this.registerForm.reset();
 
 
             // this.router.navigate(['/auth/login']);
           },
           (err) => {
             this.userMessage = {
               type: userMessageType.ERROR,
               message:
                 err?.error?.statusCode === 400
                   ? err.error.message
                   : "There was an issue when try to register you. Please try again",
             };
             this.registerForm.reset();
           }
         )
     );
   }
 
  getInvites(email: string): void {
    this.subscription.add(
      this.inviteService.getInvites({email}).subscribe((response) => {
        this.invites = response.result;
        if (this.invites.length !== 0) {
          this.router.navigate([`/auth/pendingInvites/${email}`]);
        } else {
          this.router.navigate(['/organization/']);

        }
      })
    );
  }

  getOTP() {
    const generateOtpObject = this.registerForm.value;
    this.subscription.add(
      this.authService
        .generateOTP(generateOtpObject.email, AuthType.EMAIL)
        .subscribe(
          (res) => {
          },
          (err) => {}
        )
    );
  }

  goBack(): void {
    this.location.back();
  }
}
