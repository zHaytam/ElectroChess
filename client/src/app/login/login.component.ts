import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';
import Player from '../services/player';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    public loggingIn: boolean;
    public alert: any;

    constructor(private socketService: SocketService, private router: Router) {
        this.loggingIn = false;
        this.alert = {
            type: undefined,
            content: undefined,
            visible: false
        };
        this.socketService.on('LoginRequestDeniedMessage', this.onLoginRequestDeniedMessage.bind(this));
        this.socketService.on('LoginRequestAcceptedMessage', this.onLoginRequestAcceptedMessage.bind(this));
    }

    private login(e) {
        e.preventDefault();
        const username = e.target.elements[0].value;

        if (username.length > 0 && this.socketService.send('LoginRequestMessage', { username: username }, false)) {
            this.loggingIn = true;
        }
    }

    private onLoginRequestDeniedMessage(data) {
        switch (data.reason) {
            case 0:
                this.alert.content = 'Invalid informations.';
                break;
            case 1:
                this.alert.content = 'This username is already taken.';
                break;
        }

        this.alert.type = 'danger';
        this.alert.visible = true;
        this.loggingIn = false;

        setTimeout(() => {
            this.alert.visible = false;
        }, 3000);
    }

    private onLoginRequestAcceptedMessage(data) {
        this.socketService.player = new Player(data.id, data.name);
        this.alert.content = 'Successfully connected.';
        this.alert.type = 'success';
        this.alert.visible = true;
        setTimeout(() => {
            this.router.navigateByUrl('/players-list');
        }, 2000);
    }

}
