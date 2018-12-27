import { Component, OnInit } from '@angular/core';
import { WorkoutsApiService } from '../services/workouts-api.service';
import * as _ from 'lodash';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {
  public workouts = [];
  public loading = false;

  constructor(private api: WorkoutsApiService, private modal: NgbModal) { }


  ngOnInit() {
    this.loading = true;
    this.api.getWorkouts().subscribe(data => {
      this.workouts = data;
      this.loading = false;
    });
  }

  // deleteWorkout(id) {
  //   this.api.deleteWorkout(id).subscribe(data => _.remove(this.workouts, { id: id }));
  // }
  deleteWorkout(id, deleteModal) {
    let options: NgbModalOptions = { size: 'sm' };
    this.modal.open(deleteModal, options).result.then(result => {
      this.api.deleteWorkout(id).subscribe(data => _.remove(this.workouts, { id: id }));
    }, reason => console.log(`Dismissed: ${reason}`));
  }

}
