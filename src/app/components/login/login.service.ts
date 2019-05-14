import { Injectable } from '@angular/core';


@Injectable()
export class LoginService {
  isLoggedIn: boolean;

  getUserName() {
    return 'Darth Vader';
  }
}
