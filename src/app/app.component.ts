import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    users: IUser[];

    constructor(private http: HttpClient){
        this.getJSON()
            .subscribe((data: IUsers) => {
                this.users = data.users;
                console.error('%c users fetched ', 'background: green; color: white', this.users)
            }, error => {
                console.error('%c something went wrong ', 'background: red; color: white', error)
            })
    }

    getJSON(): Observable<IUsers>{
        return this.http.get<IUsers>('./assets/users.json');
    }

}

interface IUsers {
    users: IUser[]
}

interface IUser{
    guid: string,
    name: {
        first: string,
        last: string
    },
    email: string,
    phone: string
}
