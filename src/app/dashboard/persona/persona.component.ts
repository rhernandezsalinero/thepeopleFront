import { PeopleService } from './../../services/people.service';
import { Person } from './../../models/person.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit {

  idSearch: string = ""
  person: Person = new Person()
  isEditMode = false
  formatDate: string = ""


  constructor(private router: Router, private activateRoute: ActivatedRoute, private profileService: PeopleService) {
    this.router.events.subscribe(route => {

      if (route instanceof NavigationEnd) {
        if (route.url.includes("edit")) {
          this.isEditMode = true
          this.idSearch = this.activateRoute.snapshot.paramMap.get("id") || ""
        } else {
          this.isEditMode = false
        }
      }
    })
  }

  ngOnInit() {
    if (this.isEditMode) {
      this.profileService.getProfile(this.idSearch).subscribe((data) => {
        this.person = data
        if(this.person.date != undefined){
          this.formatDate =  this.person.date?.split('T')[0]
        }
      },
        error => {
          console.log("Error:", error);
        }
      );
    } else {
      console.log("Estamos creando un personaje")
    }
  }

  getProfile() {
    this.profileService.getProfile(this.idSearch).subscribe(data => {
      this.person = data
      console.log(data)
    },
      error => {
        console.log("Error:", error);
      }
    );


  }

  updateProfile() {
    this.profileService.updateProfile(this.person).subscribe(data => {
      console.log(data)
    },
      error => {
        console.log("Error:", error);
      }
    );
  }

  createProfile() {
    console.log(this.person)
    this.profileService.saveProfile(this.person).subscribe((data) => {
      console.log(data)
    },
      error => {
        console.log("Error:", error);
      }
    );
  }

}
/* 'DD [de] MMMM [de] YYYY' */
