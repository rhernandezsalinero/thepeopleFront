import { PeopleService } from './../services/people.service';
import { Person } from './../models/person.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cosas = "famosos"
  persons: Array<Person> = []
  pictures: any = []
  imgRandom: string = ""


  constructor(private router: Router, private peopleService: PeopleService) {
    this.loadData()
  }

  ngOnInit() {


  }

  search(searchValue: string){
    if(searchValue == "") {
      this.router.navigate(["/search"])
    } else {
      this.router.navigate(["/search"], { queryParams: { name: searchValue}})
    }
  }


  loadData() {

    this.peopleService.getProfiles("", "", "").subscribe(
      (data) => {
        this.persons = data
        this.persons.forEach(element => {
          this.pictures.push(element.picture)
        });
        this.imgRandom = this.pictures[Math.floor(Math.random()*this.pictures.length)]
        console.log(this.imgRandom)
        console.log(data)
      },
      error => {
        console.log("Error:", error);
      }
    );
  }

}
