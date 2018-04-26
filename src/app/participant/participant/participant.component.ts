import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {IParticipant} from "../../models/users.model";

@Component({
  selector: 'participant',
  template: `
      <div class="participant">
          <button (click)="toggle()">{{btnLabel}}</button>
          <em [class.hidden]="participant.hidden">
              {{participant.name.first}} {{participant.name.last}}
          </em>
      </div>
  `,
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnChanges{
    @Input() participant: IParticipant;
    @Input() areAllParticipantsHidden: boolean;
    btnLabel = 'show';

    ngOnChanges( changes: SimpleChanges){
        for(let prop in changes){
            if(prop === 'areAllParticipantsHidden'){
                this.areAllParticipantsHidden = changes[prop].currentValue;

                this.btnLabel = this.areAllParticipantsHidden ? 'show' : 'hide';
            }
        }
    }

    toggle(){
        this.participant.hidden = !this.participant.hidden;
        this.btnLabel = this.btnLabel === 'show' ? 'hide' : 'show';
    }
}
