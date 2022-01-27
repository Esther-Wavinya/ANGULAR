import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-reset",
  templateUrl: "./reset.component.html",
  styleUrls: ["./reset.component.scss"],
})
export class ResetComponent implements OnInit {
  errorMessage = "";
  emailValidatorPattern =
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)" +
    "*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";

  resetForm: FormGroup;
  resetLink: string = "";

  resetPasswordSuccessfully = false;
  passwordMinLength = 6;
  subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.resetFormFunc();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  resetFormFunc(): void {
    this.resetForm = this.formBuilder.group(
      {
        password: ["", Validators.required],
        passwordRepeat: ["", Validators.required],
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

  getQueryParams(password: string): void {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe({
        next: (queryParam) => {
          const value = queryParam.email;
          const verificationCode = queryParam.otp;
          const resetDetails = {
            password,
            verificationCode,
            value,
          };
         // console.log(resetDetails);
          this.subscription.add(
            this.authService.resetPassword(resetDetails).subscribe({
              next: (res) => {
                this.resetPasswordSuccessfully = true;
              },
              error: (err) => {
                this.resetPasswordSuccessfully = false;
                if (err.error.statuscode == 401) {
                  this.errorMessage =
                    "Please verify your email account before proceeding";
                  this.resetLink = `${environment.server_Url}user/sendOTP`;
                }
                this.errorMessage =
                  "There was an error when trying to reset your password. Please try again";
              },
            })
          );
        },
      })
    );
  }

  get password() {
    return this.resetForm.get("password");
  }

  get passwordRepeat() {
    return this.resetForm.get("passwordRepeat");
  }

  submitResetDetails(): void {
    const password = this.resetForm.value.password;
    this.getQueryParams(password);
  }
}
