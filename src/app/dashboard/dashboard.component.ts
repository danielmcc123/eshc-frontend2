import {Component, OnInit, ViewChild} from '@angular/core';
import {WorkingGroup, WorkingGroupEndpointService, ActionPoint} from 'service';
import {Router} from '@angular/router';
import {MatPaginator, MatTabChangeEvent} from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedWorkingId;
  actionPoint: ActionPoint;
  workingGroups: WorkingGroup[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private workingGroupService: WorkingGroupEndpointService) { }

  ngOnInit() {
      this.workingGroupService.getAllWorkingGroupsUsingGET().subscribe(workingGroups => this.workingGroups = workingGroups.content);
  }

    setActionPointToNull() {
    console.log(this.actionPoint);
    this.actionPoint = null;
    console.log(this.actionPoint);
    }

    goBack() {
    this.actionPoint = null;
    }

    tabChanged(tabChangedEvent: MatTabChangeEvent) {
      this.selectedWorkingId = this.workingGroups[tabChangedEvent.index].id;

    }

}


