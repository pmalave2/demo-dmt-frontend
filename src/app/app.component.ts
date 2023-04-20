import { Component, OnInit } from '@angular/core';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Prueba Técnica DMT';

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe((loginResponse: LoginResponse) => {
      const { isAuthenticated, userData, accessToken, idToken, configId } = loginResponse;

      if (!isAuthenticated)
        this.oidcSecurityService.authorize();
      else
        this.messageService.add(`isAuthenticated: ${isAuthenticated} / accessToken: '${accessToken}'`);
    });
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
  }
}
