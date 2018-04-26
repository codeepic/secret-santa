import {Component, OnInit} from '@angular/core';
import {UsersService} from "./users-service/users.service";
import {IUser, IUsers} from "./models/users.model";

@Component({
  selector: 'app-root',
  template: `
      <div class="wrapper">
          <h1>Secret Santa application</h1>
          <p>Below is a list of the secret santa pairings.</p>
          
          
          <h2>Users</h2>
          <ol>
            <li *ngFor="let user of users">
               <xg-user [user]="user"></xg-user> 
            </li>
          </ol>
          
          <p><button (click)="generatePairs()">generate random pairs</button></p>
          <p><button (click)="shuffleArray()">shuffle users</button></p>
          
          <h2>Pairs</h2>
          <ol>
              <li *ngFor="let pair of pairs">
                  <p><xg-user [user]="pair.first"></xg-user></p>
                  <p><xg-user [user]="pair.second"></xg-user></p>
              </li>
          </ol>
          
          
      </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    users: IUser[];
    pairs: {first: IUser, second: IUser}[];

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

    generatePairs(){
        this.pairs = [];
        const numOfPairs = Math.floor(this.users.length / 2);

        //wrong
        for(let i = 0; i < numOfPairs; i++){
            const pair = {
                first: this.users[i],
                second: this.users[i + numOfPairs]
            };

            this.pairs.push(pair);
            console.log('PAIR:::: ', pair);
        }

        console.log(numOfPairs, '  sss   ', this.pairs);
    }

    shuffleArray(){
        let length = this.users.length,
            temp,
            i;

        while(length){
            i = Math.floor(Math.random() * length--);

            temp = this.users[length];
            this.users[length] = this.users[i];
            this.users[i] = temp;
        }
    }
}
