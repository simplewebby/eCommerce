import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from "../services/auth.service";


@Injectable()
export class AuthGuard {
  constructor(public auth: AuthService, private router: Router) {}

canActivate(){
    if (!this.auth.loggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
