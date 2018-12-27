import { Component, OnInit } from '@angular/core';
import { WorkoutsApiService } from '../services/workouts-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

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
  public locations = ['Main gym', 'Home gym', 'Neighborhood 1 mile course', 'Neighborhood 3 mile course', 'Neighborhood 5 mile course', 'Smallville 20 mile course', 'Smallville 25 mile course', 'Smallville 30 mile course'];

  constructor(private router: ActivatedRoute, private nav: Router, private api: WorkoutsApiService) {
    const today = new Date();
    this.maxDate = NgbDate.from({year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()});
  }

  ngOnInit() {
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

  locationsSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),  // wait for user to stop typing for 200 ms.
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.locations.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  save() {
    this.loading = true;
    this.api.saveWorkout(this.workout).subscribe(data => {
      this.loading = false;
      this.nav.navigate(['/workouts']);
    });
  }
}
