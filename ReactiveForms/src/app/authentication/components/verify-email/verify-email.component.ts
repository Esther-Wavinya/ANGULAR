import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DeviceInfo, DeviceDetectorService } from "ngx-device-detector";
import { Subscription } from "rxjs";
import { AuthType } from "../../models/auth.const";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.scss"],
})
export class VerifyEmailComponent implements OnInit {
  isVerified: boolean;
  isLoaded: boolean;
  errorMessage: string = "";
  successMessage: string = "";
  subscription = new Subscription();
  deviceInfo: DeviceInfo;
  url: string =
    "intent://pos.westus2.cloudapp.azure.com/#Intent;scheme=https;package=com.sibasi.pointofsale.android;end";
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private deviceDetectorService: DeviceDetectorService
  ) {}
  verifyDetails: {
    verificationCode: string;
    value: string;
    authType: string;
  } = {
    verificationCode: "",
    value: "",
    authType: AuthType.EMAIL,
  };
  ngOnInit(): void {
    this.isVerified = false;
    this.isLoaded = false;
    this.getQueryParams();
    this.deviceInfo = this.deviceDetectorService.getDeviceInfo();
   // console.log(this.deviceInfo);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getQueryParams() {
    this.subscription.add();
    this.activatedRoute.queryParams.subscribe({
      next: (queryParam) => {
        const OTP = queryParam.otp;
        const email = queryParam.email;
        this.verifyEmailDetails(OTP, email);
      },
    });
  }
  verifyEmailDetails(vOTP, vEmail) {
    this.verifyDetails = {
      verificationCode: vOTP,
      value: vEmail,
      authType: AuthType.EMAIL,
    };
    //console.log(this.verifyDetails);
    this.authService.verifyEmail(this.verifyDetails).subscribe({
      next: (res) => {
       // console.log(res);
        this.isVerified = true;
        this.isLoaded = true;
        this.successMessage = "Your email has been verified successfully";
      },
      error: (err) => {
        this.isVerified = false;
        this.isLoaded = true;
        if (err.error.statusCode === 422) {
         // console.log(err.error.statusCode);
          this.isVerified = true;
          this.isLoaded = true;
          this.successMessage = "This account is already  verified.";
        } else {
          this.errorMessage =
            "There was an error while  verifying  your account. Check your internet connection ";
        }
      },
    });
  }

  openApp() {
    if (this.deviceInfo.os === "android") {
      window.location.replace(this.url);
     // console.log("yeah");
    } else {
      window.location.replace(
        "https://pos.westus2.cloudapp.azure.com/#/auth/login"
      );
     // console.log("ah");
    }
  }
}
