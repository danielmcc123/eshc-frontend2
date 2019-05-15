import {Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

import {WorkingGroup, WorkingGroupEndpointService, ActionPoint} from 'service';

@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.scss']
})
export class ActionListComponent implements OnInit {
    @Input() workingGroup: WorkingGroup;
    @Output() event: EventEmitter<ActionPoint> = new EventEmitter();
    selectedActionPoint: ActionPoint;
    actionPoints: ActionPoint[];
    displayedColumns: string[] = ['id', 'title', 'updated', 'status', 'leadContributor', 'tasks'];
    dataSource = new MatTableDataSource(this.actionPoints);
    @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private workingGroupService: WorkingGroupEndpointService) {
  }

    listActionPoints(id: number) {
        this.workingGroupService.getActionPointsUsingGET1(id)
            .subscribe(actionPoints => {
                this.actionPoints = actionPoints.content;
                this.dataSource =  new MatTableDataSource(actionPoints.content);
                this.dataSource.paginator = this.paginator;
            })
    }

  ngOnInit() {
    this.listActionPoints(this.workingGroup.id)
  }

  sendActionSelectedEvent(passedActionPoint?) {
      if (passedActionPoint) {
          this.event.emit(passedActionPoint);
      } else {
          const ap = new ActionPoint();
          console.log('ap = ' + ap.id)
          this.event.emit(ap)
      }
  }

}
