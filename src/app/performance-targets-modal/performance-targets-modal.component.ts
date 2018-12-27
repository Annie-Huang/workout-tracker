import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-performance-targets-modal',
  templateUrl: './performance-targets-modal.component.html',
  styleUrls: ['./performance-targets-modal.component.css']
})
export class PerformanceTargetsModalComponent implements OnInit {
  public perfTargets: any = {};

  constructor() { }

  ngOnInit() {
  }

}
