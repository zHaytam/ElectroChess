import { Component, OnInit } from '@angular/core';
import { WsConnectionService } from '../ws-connection.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(private webSocketConnection: WsConnectionService) { }

  login(e) {
    e.preventDefault();
    const username = e.target.elements[0].value;
    console.log(this.webSocketConnection.login(username));
  }

}
