import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    public loggingIn: boolean;
    public errorMsg: string;

    constructor(private socketConnection: SocketService, private router: Router) {
        this.loggingIn = false;
        this.socketConnection.on('LoginRequestDeniedMessage', this.onLoginRequestDeniedMessage.bind(this));
        this.socketConnection.on('LoginRequestAcceptedMessage', this.onLoginRequestAcceptedMessage.bind(this));
    }

    private login(e) {
        e.preventDefault();
        const username = e.target.elements[0].value;
        if (username.length > 0) {
            if (this.socketConnection.send('LoginRequestMessage', { username: username })) {
                this.loggingIn = true;
            }
        }
    }

    private onLoginRequestDeniedMessage(data) {
        switch (data.reason) {
            case 0:
                this.errorMsg = 'Invalid informations.';
                break;
            case 1:
                this.errorMsg = 'This username is already taken.';
                break;
        }

        this.loggingIn = false;
    }

    private onLoginRequestAcceptedMessage() {
        this.router.navigateByUrl('/players-list');
    }

}
