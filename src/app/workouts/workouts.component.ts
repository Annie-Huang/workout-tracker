import { Component, OnInit } from '@angular/core';
import { WorkoutsApiService } from '../services/workouts-api.service';
import * as _ from 'lodash';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {
  public workouts = [];
  public loading = false;
  public perfTargets = {};

  constructor(private api: WorkoutsApiService, private modal: NgbModal) { }


  ngOnInit() {
    // this.loading = true;
    // this.api.getWorkouts().subscribe(data => {
    //   this.workouts = data;
    //   this.loading = false;
    // });
    forkJoin(
      this.api.getWorkouts(),
      this.api.getPerfTargets()
    ).subscribe(([workoutsResult, perfTargetsResult]) => {
      this.workouts = workoutsResult;
      this.perfTargets = perfTargetsResult;
      this.loading = false;
      console.log('**workouts', this.workouts, this.perfTargets);
    });
  }

  // deleteWorkout(id) {
  //   this.api.deleteWorkout(id).subscribe(data => _.remove(this.workouts, { id: id }));
  // }
  deleteWorkout(id, deleteModal) {
    const options: NgbModalOptions = { size: 'sm' };
    this.modal.open(deleteModal, options).result.then(result => {
      this.api.deleteWorkout(id).subscribe(data => _.remove(this.workouts, { id: id }));
    }, reason => console.log(`Dismissed: ${reason}`));
  }

}
