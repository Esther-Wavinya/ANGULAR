import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  forgotForm: FormGroup;
  forgotPassword: boolean;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.forgotPassword = false;
    this.formFields();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  formFields() {
    this.forgotForm = new FormGroup({
      email: new FormControl("", Validators.required),
    });
  }

  submitForgotDetails(formDetails: any) {
    this.subscription.add(
      this.authService
        .forgotPasswordEmail(formDetails.value)
        .subscribe((res) => {
          this.forgotPassword = true;
        })
    );
  }

  get email() {
    return this.forgotForm.get("email");
  }
}
