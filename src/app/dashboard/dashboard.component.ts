import {Component, OnInit, ViewChild} from '@angular/core';
import {WorkingGroup, WorkingGroupEndpointService, ActionPoint} from 'service';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  workingGroups: WorkingGroup[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private workingGroupService: WorkingGroupEndpointService) { }

  ngOnInit() {
      this.workingGroupService.getAllWorkingGroupsUsingGET().subscribe(workingGroups => this.workingGroups = workingGroups.content);
  }

}


