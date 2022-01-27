import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitesLoaderComponent } from './invites-loader.component';

describe('InvitesLoaderComponent', () => {
  let component: InvitesLoaderComponent;
  let fixture: ComponentFixture<InvitesLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitesLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitesLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
