import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingInvitesComponent } from './pending-invites.component';

describe('PendingInvitesComponent', () => {
  let component: PendingInvitesComponent;
  let fixture: ComponentFixture<PendingInvitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingInvitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
