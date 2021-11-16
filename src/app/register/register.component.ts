import { Login } from './../models/login.model';
import { UsersService } from './../services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  sForm: FormGroup
  isValid = false
  constructor(private router: Router, private fb: FormBuilder, private usersService: UsersService) {
    this.sForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(8)]] /*  Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{4,30}$/) */
    })
  }

  ngOnInit() {
  }

  login() {
    this.router.navigate(["/login"])
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
    login.name = this.f.name.value

    this.usersService.singup(login).subscribe(data => {
      this.router.navigate(["/login"])
    },
      error => {
        console.log("Error:", error);
      })

  }
}
