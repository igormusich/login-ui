import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

import { LoginProfile} from '../model/login-profile';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeout'

@Injectable()
export class LoginService {

  public loginApi: string = environment.loginApi;

  constructor(private http: HttpClient) { }

  getLoginProfile(loginId: string) {
    //loginId = encodeURIComponent(loginId);
    
    let httpHeaders: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');

      let params = new HttpParams().set('loginId', loginId);

    let options: {} = {
      headers: httpHeaders,
      params: params
    };


    let observable: Observable<LoginProfile> =
      this.http.get(this.loginApi, options)
        .map((res: any) => {
          console.log('Data Recieved from login profile service:: ', res);
          return res;
        })
        .catch(this.handleError);

    return observable;

  }

  handleError(err: HttpErrorResponse): Observable<any> {
    let errResponseObj: any;

    console.error('Error Recieved from login profile service', err);

    return Observable.throw(err);
  }


}
