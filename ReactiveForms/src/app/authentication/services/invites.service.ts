import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IApiHTTPResponse } from '../../shared/models/api.response.model';
import { Iinvites } from '../models/invites.model';

@Injectable({
  providedIn: 'root'
})
export class InvitesService {

  constructor(private http: HttpClient) {}


  public getInvites({email:string}): Observable<IApiHTTPResponse<[]>> {
    return this.http.post<IApiHTTPResponse<[]>>(
      `${environment.server_Url}organization/invites`,{email:string}
    );
  }
  public acceptInvite(inviteArr): Observable<IApiHTTPResponse<[{inviteId:string,status:string}]>> {
    return this.http.post<IApiHTTPResponse<[{inviteId:string,status:string}]>>(
      `${environment.server_Url}organization/invites/action`,
      inviteArr
    );
  }
  public rejectInvite(inviteArr: any): Observable<IApiHTTPResponse<Iinvites>> {
    return this.http.post<IApiHTTPResponse<Iinvites>>(
      `${environment.server_Url}organization/invites/action`,
      inviteArr
    );
  }
}
