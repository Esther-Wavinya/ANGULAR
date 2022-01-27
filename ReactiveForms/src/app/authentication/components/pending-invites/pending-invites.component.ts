import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Iinvites } from '../../models/invites.model';
import { InvitesService } from '../../services/invites.service';


export enum inviteStatus {
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

@Component({
  selector: 'app-pending-invites',
  templateUrl: './pending-invites.component.html',
  styleUrls: ['./pending-invites.component.scss']
})

export class PendingInvitesComponent implements OnInit {
  invites: Iinvites[] = [];
  subscription = new Subscription();
  email: string = '';
  // invitesArr:any[] =[]
  errorMessage: string = '';
  constructor(
     private inviteService: InvitesService,
     private router: Router,
     private route: ActivatedRoute

) {
   }

  ngOnInit(): void {
    this.getInvites();
  }

  getInvites(): void {
    // this.email = this.route.snapshot.paramMap.get('email');
    this.email = this.route.snapshot.params.email;
    this.subscription.add(
      this.inviteService.getInvites({email: this.email}).subscribe((response) => {
        this.invites = response.result;
        if (this.invites.length === 0) {
          this.router.navigate(['/organization/select']);
        }
        this.errorMessage = '';
      })
    );
  }

  acceptInvite( invite: Iinvites) {
    const inviteArr = { inviteId: invite._id, status: inviteStatus.ACCEPTED};
    this.inviteService.acceptInvite(inviteArr)
      .subscribe((response) => {
        this.errorMessage = `Your are now  a member of ${invite.organization.name}`;
        setTimeout(this.getInvites, 4000);
        this.getInvites();

      }
      );
  }

  rejectInvite( invite: Iinvites) {
    const inviteArr = { inviteId: invite._id, status: inviteStatus.REJECTED};
    this.inviteService.rejectInvite(inviteArr)
    .subscribe((response) => {
      this.errorMessage = `Invite to ${invite.organization.name} rejected!`;
      setTimeout(this.getInvites, 4000 );
      this.getInvites();

    }
    );
  }
  viewStore() {
    this.router.navigate(['organization']);
  }
}
