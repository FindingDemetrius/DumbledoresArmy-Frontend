import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class SessionService {

  public accessToken: string;
  public username: String;

  constructor() { }

  public destroy() {
    this.accessToken = null;
  }
}
