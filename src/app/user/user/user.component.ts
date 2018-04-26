import {Component, Input, OnInit} from '@angular/core';
import {IUser} from "../../models/users.model";

@Component({
  selector: 'xg-user',
  template: `
      <p>
          {{user.name.first}} {{user.name.last}}
      </p>
      <p>{{user.email}}</p>
  `,
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    @Input() user: IUser;

    constructor() { }

    ngOnInit() {
    }

}
