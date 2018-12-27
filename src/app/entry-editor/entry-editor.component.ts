import { Component, OnInit } from '@angular/core';
import { WorkoutsApiService } from '../services/workouts-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-entry-editor',
  templateUrl: './entry-editor.component.html',
  styleUrls: ['./entry-editor.component.css']
})
export class EntryEditorComponent implements OnInit {
  public workout: any = {};
  public loading = false;
  public startDate: any;
  public maxDate: NgbDateStruct;
  // public locations = ['Main gym', 'Home gym', 'Neighborhood 1 mile course', 'Neighborhood 3 mile course', 'Neighborhood 5 mile course',
  //   'Smallville 20 mile course', 'Smallville 25 mile course', 'Smallville 30 mile course'];
  public locations = [];

  constructor(private router: ActivatedRoute, private nav: Router, private api: WorkoutsApiService) {
    const today = new Date();
    this.maxDate = NgbDate.from({year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()});
  }

  ngOnInit() {
    // Client side flitering
    this.api.getLocations().subscribe(data => this.locations = data);

    this.router.params.subscribe(params => {
      if (params.id !== 'new') {
        this.loading = true;
        this.api.getWorkout(params.id).subscribe(data => {
          this.workout = data;
          const d = new Date(this.workout.date);
          this.startDate = {year: d.getFullYear(), month: d.getMonth() + 1};
          this.loading = false;
        });
      }
    });
  }

  // // Client side flitering
  // locationsSearch = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),  // wait for user to stop typing for 200 ms.
  //     distinctUntilChanged(),
  //     map(term => term.length < 2 ? []
  //       : this.locations.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  //   );

  // Server side flitering
  // Useful when the list is huge, then better to client side flitering
  locationsSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => this.loading = true),   // meaning the next thing i want you to do is to set loading = true.
      switchMap(term => this.api.searchLocations(term)),
      // Do a map for name property, otherwise it will save the entire object of {"id": 3, "name": "Neighborhood 1 mile course"}
      // when user clicks save
      map(locations => _.map(locations, 'name')),
      tap(() => this.loading = false)   // once it's completing i want you to set loading = false
    );

  locationsFormatter = (result) => result.name;

  save() {
    this.loading = true;
    this.api.saveWorkout(this.workout).subscribe(data => {
      this.loading = false;
      this.nav.navigate(['/workouts']);
    });
  }
}
