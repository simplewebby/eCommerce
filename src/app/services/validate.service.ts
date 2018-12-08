import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }


  validateRegister(user) {
// tslint:disable-next-line:triple-equals
if (  user.name == undefined ||
   // tslint:disable-next-line:triple-equals
    user.username == undefined ||
    // tslint:disable-next-line:triple-equals
     user.email == undefined ||
    // tslint:disable-next-line:triple-equals
    user.password == undefined ) {
      return false;
  } else {
    return true;
  }
}

validateEmail(email) {
     const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
     return re.test(email);
  }
}
