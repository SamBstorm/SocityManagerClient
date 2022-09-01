import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionManagerService } from '../services/session-manager.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _session: SessionManagerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let user = this._session.getCurrentUser();
    console.log(user);
    if(!user) 
      return next.handle(request);
    if (request.url != "http://localhost:5157/api/Auth") {
      let newRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      });
      return next.handle(newRequest);
    }
    return next.handle(request); 
  }
}
