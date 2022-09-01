import { ILoginApiResult } from './../models/ilogin-api-result';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  constructor() { }

  private set(key: string, value: any){
    sessionStorage.setItem(key, JSON.stringify(value))
  }

  private get(key: string) : any | null{
    return JSON.parse(sessionStorage.getItem(key) ?? 'null');
  }

  public getCurrentUser() : ILoginApiResult{
    return this.get('user');
  }

  public setCurrentUser(loginResult : ILoginApiResult){
    this.set('user',loginResult);
  }

  public clearCurrentUser(){
    sessionStorage.removeItem('user');
  }
}
