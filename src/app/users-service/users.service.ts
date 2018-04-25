import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {IUsers} from "../models/users.model";

@Injectable()
export class UsersService {

    constructor(private http: HttpClient) { }

    getJSON(): Observable<IUsers>{
        return this.http.get<IUsers>('./assets/users.json');
    }
}
