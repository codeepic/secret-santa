import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {UsersService} from "./users-service/users.service";
import { UserComponent } from './user/user/user.component';


@NgModule({
    declarations: [
        AppComponent,
        UserComponent
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
