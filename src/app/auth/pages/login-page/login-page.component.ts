import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent implements OnInit {
  
  constructor(
    private authService:AuthService,
    private router:Router
  ){}
  onLogin():void{
    this.authService.login('user@user.com','1234')
    .subscribe(user=>{
      this.router.navigate(['/'])
    })
  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
