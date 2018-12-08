import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username: String;
    password: String;

   // needto inject it as depen
  constructor(
    private authService: AuthService,
    private router: Router,
    private _flashMessagesService: FlashMessagesService

  ) { }

  ngOnInit() {
  }
onLoginSubmit() {
  const user = {   // creating an object
    username: this.username,
    password: this.password
    // tslint:disable-next-line:semicolon
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this._flashMessagesService.show('You are logged in', { cssClass: 'alert-success' } );
        this.router.navigate(['/profile']);
      } else {
       this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger' } );
        this.router.navigate(['/login']);
      }
    });
  }
}
