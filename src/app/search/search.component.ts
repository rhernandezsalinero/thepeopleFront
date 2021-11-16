import { PeopleService } from './../services/people.service';
import { Person } from './../models/person.model';

import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  persons: Array<Person> = []
  nameSearch: string = ""
  dateStartSearch: string = ""
  dateEndSearch: string = ""

  constructor(private activeRoute: ActivatedRoute, private router: Router, private peopleService: PeopleService) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(value => {
      if (value.name != undefined) {
        this.nameSearch = value.name
      }
    })

    this.loadData()
  }

  // Cada vez que escribo esta funcion se llama
  onSearchChange(searchValue: any) {
    this.nameSearch = searchValue.target.value
    this.loadData()
  }

  startChange(data: any) {
    let mDate = moment(data.value).format("DD/MM/YYYY")
    this.dateStartSearch = mDate
  }

  endChange(data: any) {
    if (data.value != null) {
      let mDate = moment(data.value).format("DD/MM/YYYY")
      this.dateEndSearch = mDate
      this.loadData()
    }
  }

  loadData() {
    let start = moment(this.dateStartSearch,"DD/MM/YYYY").format("YYYY/MM/DD")
    let end = moment(this.dateEndSearch,"DD/MM/YYYY").format("YYYY/MM/DD")

    if (!this.dateStartSearch || !this.dateEndSearch){
      start= ""
      end = ""
    }
    this.peopleService.getProfiles(this.nameSearch, start, end).subscribe(
      (data) => {
        this.persons = data
        console.log(data)
      },
      error => {
        console.log("Error:", error);
      }
    );
  }

  formatDate(date?: string): string {
    return moment(date).locale('es').format("DD [de] MMMM [de] YYYY")
  }
}
