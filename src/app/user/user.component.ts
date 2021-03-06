import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'app/Services/Authentification/authentification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'app/Model/Users';
import { NavbarService } from 'app/Services/navbar.service';
import { FooterService } from 'app/Services/footer.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm : FormGroup;
  submitted = false;
  hide = true;

  constructor(public footerService : FooterService, public navbarService : NavbarService, private authentificationService : AuthentificationService, private formBuilder : FormBuilder, public router : Router) 
  { }

  ngOnInit() 
  {
    // Validations
    this.userForm = this.formBuilder.group({
      email : [null, [Validators.required, Validators.maxLength(100)]],
      password : [null, [Validators.required, Validators.maxLength(60)]]
    });

    // this.authenticationService.logoutUser();

    // Cacher la navigation
    this.navbarService.hide();
    this.footerService.hide();
  }

  // Create new user
  user = new Users();

  formValue()
  {
    this.user.email = this.userForm.get('email').value;
    this.user.password = this.userForm.get('password').value;
  }

  login() 
  {
    this.formValue();
    this.submitted = true;
    this.authentificationService.loginUser(this.user)
    .subscribe(
      (result) => 
      {
        if (this.authentificationService.isLoggedIn == true )
        {
          this.goTo('dashboard')
        }
      }
    )
  }

  logout()
  {
    this.authentificationService.logoutUser();
  }
 

  goTo(path) : void
  {
    this.router.navigateByUrl(path);
  }

}
