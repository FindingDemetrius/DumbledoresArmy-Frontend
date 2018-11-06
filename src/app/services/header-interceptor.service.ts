import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Session } from 'protractor';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService,
    private sessionService: SessionService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isSignedIn()) { // e.g. if token exists, otherwise use incomming request.
      return next.handle(req.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + this.sessionService.accessToken,
          'Content-Type': 'application/json'
        }
      }));
    } else {
      return next.handle(req);
    }
  }
}
