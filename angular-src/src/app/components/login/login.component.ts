import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(
    private authservice:AuthService,
    private router:Router,
    private flashmessage:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user ={
      username: this.username,
      password: this.password
    }
    this.authservice.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authservice.storeUserData(data.token,data.user);
        this.flashmessage.show('You are now login!',{
          cssClass: 'alert-success',
          timeout: 5000
        });
        this.router.navigate(['dashboard']);
      }else{
        this.flashmessage.show(data.msg,{
          cssClass: 'alert-danger',
          timeout: 5000
        });
        this.router.navigate(['login']);
      }
    });
  }
}
