import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  bgWhite = false

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit() {
    this.router.events.subscribe(route => {

      if (route instanceof NavigationEnd) {
        if (route.url == "/") {
          this.bgWhite = false
        } else {
          this.bgWhite = true
        }
      }

    })
  }

  ngAfterContentInit() {
    this.bgWhite = true
  }

  upload() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/dashboard/persona/new'])
    } else {
      this.router.navigate(['/login'])
    }
  }
  //cuando pulsemos en subir nuevo comprobar si estoy logeado
  //si si redirigir a dashboard
  //si no redirigir a login

}
