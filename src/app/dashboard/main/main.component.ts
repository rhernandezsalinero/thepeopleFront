import { PeopleService } from './../../services/people.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Person } from './../../models/person.model';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  persons: Array<Person> = []
  nameSearch: string = ""

  constructor(private router: Router, private activeRoute: ActivatedRoute, private peopleService: PeopleService) {

  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(value => {
      if (value.name != undefined) {
        this.nameSearch = value.name
      }
    })
    this.loadData()
  }

  onSearchChange(searchValue: any) {
    this.nameSearch = searchValue.target.value
    this.loadData()
  }

  addPerson() {
    this.router.navigate(["/dashboard/persona/new"])
  }

  editPerson(id: any) {

    this.router.navigate(["/dashboard/persona/" + id + "/edit"])
  }


  deletePerson(id: any) {
    this.peopleService.deleteProfile(id).subscribe(data => {
      console.log(data)
      this.loadData()
    },
      error => {
        console.log("Error:", error);
      }
    );
  }

  loadData() {
    this.peopleService.getProfiles(this.nameSearch,"","").subscribe(
      (data: Person[]) => {
        this.persons = data
        console.log(data)
      },
      error => {
        console.log("Error:", error);
      }
    );
  }
}
