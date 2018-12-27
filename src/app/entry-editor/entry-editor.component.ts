import { Component, OnInit } from '@angular/core';
import { WorkoutsApiService } from '../services/workouts-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

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

  save() {
    this.loading = true;
    this.api.saveWorkout(this.workout).subscribe(data => {
      this.loading = false;
      this.nav.navigate(['/workouts']);
    });
  }
}
