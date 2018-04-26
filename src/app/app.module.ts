import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {UsersService} from "./users-service/users.service";
import { UserComponent } from './user/user/user.component';
import { ParticipantComponent } from './participant/participant/participant.component';


@NgModule({
    declarations: [
        AppComponent,
        UserComponent,
        ParticipantComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        UsersService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
