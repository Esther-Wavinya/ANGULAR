import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthType } from "../../models/auth.const";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-verify-account",
  templateUrl: "./verify-account.component.html",
  styleUrls: ["./verify-account.component.scss"],
})
export class VerifyAccountComponent implements OnInit {
  accountForm: FormGroup;
  verifyAccount: boolean;
  errorMessage: string = "";

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.verifyAccount = false;
    this.formFields();
  }

  formFields() {
    this.accountForm = new FormGroup({
      email: new FormControl("", Validators.required),
    });
  }
  submitDetails(formDetails: any) {
   // console.log(formDetails.value.email);
    this.authService
      .generateOTP(formDetails.value.email, AuthType.EMAIL)
      .subscribe(
        (res) => {
         // console.log(res);
          this.verifyAccount = true;
          this.accountForm.reset();
          this.authService.logout();
        },
        (err) => {
          if (err.error.statusCode === 422) {
            this.errorMessage =
              "Your email has already been verified.Proceed to log in";
            this.verifyAccount = true;
          } else if (err.error.statusCode === 400) {
            this.verifyAccount = true;
            this.errorMessage = "Kindly register this email ";
            this.accountForm.reset();
          } else {
            this.errorMessage =
              "You email can't be verified.Check your internet connection";
          }
        }
      );
  }

  get email() {
    return this.accountForm.get("email");
  }
}
