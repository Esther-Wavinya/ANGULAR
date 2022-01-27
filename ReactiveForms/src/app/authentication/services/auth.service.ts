import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router, RouterStateSnapshot } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { IApiHTTPResponse } from "../../shared/models/api.response.model";
import { catchError, map } from "rxjs/operators";
import { Location } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private TOKEN_KEY = "auth_token";
  private jwtHelper = new JwtHelperService();
  private BEARER_KEY = "bearer";
  registeredSuccessfully = false;
  redirectUrl: string;
  userStatus: boolean = true;
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenDecoder: JwtHelperService,
    private location: Location
  ) {
    // this.redirectUrl=state.url ? state.url:""
  }

  login(
    email: string,
    password: string
  ): Observable<IApiHTTPResponse<{ access_token: string }>> {
    return this.http
      .post<IApiHTTPResponse<{ access_token: string }>>(
        `${environment.server_Url}user/loginWithEmail`,
        { email, password }
      )
      .pipe(
        map((res) => {
          const token = res.result.access_token;
          localStorage.setItem(this.TOKEN_KEY, token);
          const encodedToken = localStorage.getItem("auth_token");
          const userToken = this.jwtHelper.decodeToken(encodedToken);
          localStorage.setItem("role", userToken.roles[0]);
          localStorage.setItem(
            "userStatus",
            JSON.stringify(userToken.hasVerifiedAuthItem)
          );
          const redirectUrl = this.redirectUrl || "/organization";
          this.router.navigateByUrl(redirectUrl);
          return res;
        })
      );
  }

  loginGoogle(access_Token) {
    const token = access_Token;
    localStorage.setItem(this.TOKEN_KEY, token);
    const redirectUrl = this.redirectUrl || "/organization";
    this.router.navigateByUrl(redirectUrl);
  }

  register(
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    name: string
  ): Observable<
    IApiHTTPResponse<{ access_token: string; verified: boolean }> | unknown
  > {
    return this.http
      .post<IApiHTTPResponse<{ access_token: string; verified: boolean }>>(
        `${environment.server_Url}user/signup`,
        { username, firstname, lastname, email, password, name }
      )
      .pipe(
        map((res) => {
          this.registeredSuccessfully = true;
          const token = res.result.access_token;
          this.userStatus = res.result.verified;
          localStorage.setItem(this.TOKEN_KEY, token);
          const encodedToken = localStorage.getItem("auth_token");
          const userToken = this.jwtHelper.decodeToken(encodedToken);
          localStorage.setItem(
            "userStatus",
            JSON.stringify(userToken.hasVerifiedAuthItem)
          );
          // const redirectUrl = "organization";
          // this.router.navigateByUrl(this.redirectUrl);
          return res;
        })
      );
  }

  verifyEmail(verifyEmailDetails): Observable<IApiHTTPResponse<{}>> {
    return this.http.post<IApiHTTPResponse<{}>>(
      `${environment.server_Url}user/verifyAccount`,
      verifyEmailDetails
    );
  }

  forgotPasswordEmail(email: string): Observable<IApiHTTPResponse<string>> {
    return this.http.post<IApiHTTPResponse<string>>(
      `${environment.server_Url}user/forgotPassword`,
      email
    );
  }

  resetPassword(resetDetails): Observable<IApiHTTPResponse<string>> {
    return this.http.post<IApiHTTPResponse<string>>(
      `${environment.server_Url}user/resetPassword`,
      resetDetails
    );
  }

  public getAuthToken(): string {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const isTokenExpired = this.tokenDecoder.isTokenExpired(token);
    if (!isTokenExpired) {
      return token ? token : undefined;
    } else {
      return undefined;
    }
  }

  getDecodedToken(): { roles: string[] } {
    const decodedToken = this.tokenDecoder.decodeToken(this.getAuthToken());
    return decodedToken;
  }

  isUserAllowedToView(allowedUsers: any): boolean {
    if (allowedUsers === "all") {
      return true;
    }
    const userRoles = this.getDecodedToken().roles;

    let found = false;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < allowedUsers.length; i++) {
      if (userRoles.indexOf(allowedUsers[i]) > -1) {
        found = true;
        break;
      }
    }
    return found ? true : false;
  }

  isLoggedIn(): boolean {
    return this.getAuthToken() ? true : false;
  }

  logout() {
    localStorage.clear();
    const redirectUrl = "/auth/login";
    this.router.navigateByUrl(redirectUrl);
  }

  // when user tries to register with an existing email,
  // he/she should verify their email
  generateOTP(value: string, authType: string) {
    const generateOTPInfo = { value, authType };
    return this.http.post<IApiHTTPResponse<string>>(
      `${environment.server_Url}user/sendOTP`,
      generateOTPInfo
    );
  }
}
