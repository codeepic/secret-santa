import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {UsersService} from "./users-service/users.service";


@NgModule({
    declarations: [
        AppComponent
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
