import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SocketService } from './services/socket.service';
import { GameService } from './services/game.service';
import { PlayersListComponent } from './players-list/players-list.component';
import { GameComponent } from './game/game.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'players-list', component: PlayersListComponent },
    { path: 'game', component: GameComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        PlayersListComponent,
        GameComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [SocketService, GameService],
    bootstrap: [AppComponent]
})
export class AppModule { }
