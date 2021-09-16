import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/impl/auth-service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message!: string;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  login(username: string, password: string): boolean {
    this.message = '';
    
    if (!this.authService.login(username, password)) {
      this.message = 'Login ou mot de passe incorrecte';
    }
    return false;
  }

  logout(): boolean {
    this.authService.logout();
    return false;
  }

}
