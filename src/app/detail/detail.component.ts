import { Person } from './../models/person.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../services/people.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  person: Person = new Person()
  idSearch: string = ""

  constructor(private activeRoute: ActivatedRoute, private router: Router, private profileService: PeopleService) {
      this.router.events.subscribe(route => {

        if (route instanceof NavigationEnd) {
          if (route.url.includes("detail")) {
            this.idSearch = this.activeRoute.snapshot.paramMap.get("id") || ""
          }
        }

      })
  }

  ngOnInit() {
    this.profileService.getProfile(this.idSearch).subscribe((data) => {
      console.log(data)
      this.person = data
    },
      error => {
        console.log("Error:", error);
      }
    );
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
}
