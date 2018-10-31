import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class SessionService {

  public accessToken: string;
  public userName: string;
  public name: string;

  constructor() { }

  public destroy() {
    this.accessToken = null;
    this.userName = null;
    this.name = null;
  }
}
