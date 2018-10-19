import {Component, Input, OnInit} from '@angular/core';
import {ActionPoint, ActionPointEndpointService, Note, NoteEndpointService, WorkingGroup, WorkingGroupEndpointService} from '../../service';
import {finalize} from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-action-detail',
  templateUrl: './action-detail.component.html',
  styleUrls: ['./action-detail.component.scss']
})
export class ActionDetailComponent implements OnInit {

  status = ['UNSTARTED', 'STARTED', 'FINISHED'];
  @Input() actionPoint: ActionPoint;
  @Input() workingGroupId;
  listOfNotes: Note[] = [];
  comment: Note = new Note();

  constructor(private actionPointService: ActionPointEndpointService, private workingGroupService: WorkingGroupEndpointService,
              private noteEndpointService: NoteEndpointService) { }
    showNotification(messageBody, messagetype) {
        const type = ['', 'info', 'success', 'warning', 'danger'];

        const color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: 'notifications',
            message: messageBody

        }, {
            type: type[1],
            timer: 4000,
            placement: {
                from: 'bottom',
                align: 'left'
            },
            template:
                '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                '<i class="material-icons" data-notify="icon">notifications</i> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
        });
    }

  ngOnInit() {
      this.actionPoint.listOfNotes.forEach(noteId => {
          this.noteEndpointService.getNoteUsingGET(noteId)
              .subscribe(note => this.listOfNotes.push(note))
      })
  }

  update() {

      if (this.actionPoint.id !== undefined) {
          this.actionPointService.updateActionPointUsingPUT(this.actionPoint.id, this.actionPoint)
              .pipe(finalize(() => this.showNotification('Action Point ' + this.actionPoint.id + ' updated', 'info')))
              .subscribe(actionPoint => this.actionPoint = actionPoint);
      } else {
          this.actionPointService.createActionPointUsingPOST(this.actionPoint)
              .subscribe(actionPoint => {
                  this.actionPoint = actionPoint;
                  this.addActionPointToWorkingGroup(actionPoint.id, this.workingGroupId);
              });
      }

  }

    addActionPointToWorkingGroup(actionId, workingId) {
        this.workingGroupService.addActionPointUsingPOST(actionId, workingId)
            .pipe(finalize(() => this.showNotification('Action point created', 'success')))
            .subscribe()
    }


    addComment() {
        this.noteEndpointService.createNoteUsingPOST(this.comment)
            .subscribe(comment => {
                this.comment = comment;
                this.addCommentToActionPoint(comment)
            })
    }

    addCommentToActionPoint(note: Note) {
        this.actionPoint.listOfNotes.push(note.id);
        this.actionPointService.updateActionPointUsingPUT(this.actionPoint.id, this.actionPoint)
            .pipe(finalize(() => {
                this.showNotification('Comment added', 'info');
                this.comment = new Note();
            }))
            .subscribe(actionPoint => {
                this.listOfNotes = [];
                this.actionPoint = actionPoint;
                this.actionPointService.getNotesFromActionPointUsingGET(actionPoint.id)
                    .subscribe(notes => this.listOfNotes = notes.content)
            })
    }


}
