import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-invites-loader',
  templateUrl: './invites-loader.component.html',
  styleUrls: ['./invites-loader.component.scss']
})
export class InvitesLoaderComponent implements OnInit {

  errorMessage: string;
  email: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.errorMessage = 'Please wait as we process your invite';
    this.getParams();
  }

  getParams() {
    let isInvited: boolean;
    let hasAccount: string;
    let email: string;

    this.route.queryParams.subscribe(

      (param) => {
        isInvited =   Boolean(param.isInvited);
        hasAccount = (param.hasAccount);
        email = param.email;
        console.log("you should be here"+param);

      }
    );


    if (isInvited) {
      if (hasAccount === 'true') {
        if (this.authService.isLoggedIn) {
          this.router.navigate(['auth/pendingInvites']);
        } else {
          this.router.navigate([`auth/login/`]);
        }

      } else {
        this.email = this.route.snapshot.paramMap.get('email');
        // this.email = this.route.snapshot.params.email;
        this.router.navigate(['auth/register']);
      }

    } else {
      this.router.navigate(['/organization/select']);
    }

  }
}
