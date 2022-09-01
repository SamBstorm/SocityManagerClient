import { ILoginApiResult } from './../../models/ilogin-api-result';
import { ILoginForm } from './../../models/ilogin-form';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url : string = "http://localhost:5157/api/Auth/";

  constructor(private _http : HttpClient) { }

  public login(login : ILoginForm) : Observable<ILoginApiResult>{
    return this._http.post<ILoginApiResult>(this._url, login);
  }
}
