import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
name: String;
img: String;
address: String;
username: String;
email: String;
password: String;


  constructor(private validateService: ValidateService,
              private authService: AuthService,
              private router: Router,
              private _flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }

onRegisterSubmit() {
 /* console.log(this.name);
 console.log(this.username);
 console.log(this.email);
 console.log(this.password); */
 // create obj
 const user = {
 name: this.name,
 username: this.username,
 email: this.email,
 password: this.password
 // tslint:disable-next-line:semicolon
 }
 // Required fields
 if (!this.validateService.validateRegister(user)) {
 this._flashMessagesService.show('Fill out all fields!', { cssClass: 'alert-danger' } );
  return false;
      }

    // validate email
 if (!this.validateService.validateEmail(user.email)) {
  this._flashMessagesService.show('Enter valid email!', { cssClass: 'alert-danger' } );
  return false;
 }

// Register User
this.authService.registerUser(user).subscribe(data => {
  if (data.success) {
     this._flashMessagesService.show('Success!', { cssClass: 'alert-success' } );
    this.router.navigate(['/login']);
  } else {
   this._flashMessagesService.show('Oops, something went wrong!', { cssClass: 'alert-danger' } );
    this.router.navigate(['/register']);
  }
});


  }
}
