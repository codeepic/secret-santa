import {Component, Input, OnInit} from '@angular/core';
import {IParticipant, IUser} from "../../models/users.model";

@Component({
  selector: 'user',
  template: `
      <em>{{user.name.first}} {{user.name.last}}</em>
  `,
  styleUrls: ['./user.component.scss']
})
export class UserComponent{
    @Input() user: IUser | IParticipant;
}
