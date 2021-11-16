import { Login } from './../models/login.model';
import { UsersService } from './../services/users.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  sForm: FormGroup
  isValid = false
  constructor(private router: Router, private fb: FormBuilder, private usersService: UsersService) {
    this.sForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(8)]] /* Validators.pattern(/^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{4,30}$/) */
    })
  }

  ngOnInit() {
  }

  signup() {
    this.router.navigate(["/register"])
  }

  get f(): any {
    return this.sForm.controls
  }

  saveData() {
    this.isValid = true

    if (this.sForm.invalid) {
      console.log("Error, el formulario esta mal")
      return
    }

    const login: Login = new Login()
    login.email = this.f.email.value
    login.password = this.f.password.value


    this.usersService.login(login).subscribe(data => {
      localStorage.setItem("token", data.access_token)
      this.router.navigate(["/dashboard"])
      console.log(data)
    },
      error => {
        console.log("Error:", error);
      })

  }
}
