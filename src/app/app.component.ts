import {Component, OnInit} from '@angular/core';
import {UsersService} from "./users-service/users.service";
import {IUser, IUsers} from "./models/users.model";

@Component({
  selector: 'app-root',
  template: `
      <div class="wrapper">
          <h1>Secret Santa application</h1>
          <p>Below is a list of the secret santa pairings.</p>
          
          <ol>
            <li *ngFor="let user of users">
               <xg-user [user]="user"></xg-user> 
            </li>
          </ol>
      </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    users: IUser[];

    constructor(private usersService: UsersService){}

    ngOnInit(){
        this.getJSON();
    }

    getJSON(){
        this.usersService.getJSON()
            .subscribe((data: IUsers) => {
                this.users = data.users;
                console.error('%c users fetched ', 'background: green; color: white', this.users)
            }, error => {
                console.error('%c something went wrong ', 'background: red; color: white', error)
            })
    }



}
