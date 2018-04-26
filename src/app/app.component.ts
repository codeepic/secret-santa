import {Component, OnInit} from '@angular/core';
import {UsersService} from "./users-service/users.service";
import {IParticipant, IUser, IUsers} from "./models/users.model";

@Component({
  selector: 'app-root',
  template: `
      <div class="wrapper">
          <h1>Secret Santa application</h1>
          <p>Below is a list of the secret santa pairings.</p>


          <h2>Secret Santa Participants</h2>
          <ol>
              <li *ngFor="let user of users">
                  <user [user]="user"></user>
              </li>
          </ol>

          <p>
              <button (click)="assignPeople()">Assign People</button>
          </p>

          <section *ngIf="participants?.length > 0">
              <h2>Secret Santa Pairings</h2>
              <ul>
                  <li *ngFor="let participant of participants">
                      <p>
                          <user [user]="participant"></user>
                          has been assigned
                          <user [user]="getUserByGuid(participant.assignedGuid)"></user>
                      </p>
                  </li>
              </ul>
          </section>

      </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    users: IUser[];
    participants: IParticipant[];

    constructor(private usersService: UsersService){}

    ngOnInit(){
        this.getJSON();
    }

    getJSON(){
        this.usersService.getJSON()
            .subscribe((data: IUsers) => {
                this.users = data.users;
            }, error => {
                console.error('%c something went wrong ', 'background: red; color: white', error)
            })
    }

    assignPeople(){
        const shuffledUsers = this.shuffle(this.users),
            len = shuffledUsers.length;

        this.participants = [];

        for(let i = 0; i < len; i++){
            const assignedUser = {
                ...shuffledUsers[i],
                assignedGuid: shuffledUsers[(i+1) % len].guid
            };

            this.participants.push(assignedUser)
        }
    }

    getUserByGuid(guid: string){
        const len = this.users.length;

        for(let i = 0; i < len; i++){
            if(this.users[i].guid === guid){
                return this.users[i];
            }
        }
    }

    shuffle(arrParam: any[]): any[]{
        let arr = arrParam.slice(),
            length = arr.length,
            temp,
            i;

        while(length){
            i = Math.floor(Math.random() * length--);

            temp = arr[length];
            arr[length] = arr[i];
            arr[i] = temp;
        }

        return arr;
    }
}
