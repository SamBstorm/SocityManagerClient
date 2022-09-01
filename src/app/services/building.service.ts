import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  private _url : string = "http://localhost:5157/api/Building";
  constructor(private _http : HttpClient) { }

  public get() : Observable<any>{
    return this._http.get(this._url);
  }
}
