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
              <button (click)="assignParticipants()">Assign People</button>
          </p>

          <section *ngIf="participants?.length > 0">
              <h2>Secret Santa Pairings</h2>
              <p></p>
              <ul>
                  <li *ngFor="let participant of participants">
                      <p>
                          <user [user]="participant"></user>
                          has been assigned
                          <participant [participant]="getByGuid(participant.assignedGuid)" [areAllParticipantsHidden]="areAllParticipantsHidden"></participant>
                      </p>
                  </li>
              </ul>
              
              <p>
                  <button (click)="toggleAllParticipants()">toggle all</button>
              </p>
          </section>

      </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    users: IUser[];
    participants: IParticipant[];
    areAllParticipantsHidden: boolean = true;

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

    assignParticipants(){
        const shuffled = this.shuffle(this.users),
            len = shuffled.length;

        this.participants = [];

        for(let i = 0; i < len; i++){
            const participant = {
                ...shuffled[i],
                assignedGuid: shuffled[(i+1) % len].guid,
                hidden: true
            };

            this.participants.push(participant)
        }
    }

    getByGuid(guid: string): IParticipant{
        const len = this.participants.length;

        for(let i = 0; i < len; i++){
            if(this.participants[i].guid === guid){
                return this.participants[i];
            }
        }
    }

    toggleAllParticipants(){
        this.areAllParticipantsHidden = !this.areAllParticipantsHidden;
        this.participants = this.participants.map(p => ({...p, hidden: this.areAllParticipantsHidden}));
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
