import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServices } from '../auth.service';
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'ngx-angular-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor( private socialAuthService: AuthService, private auth: AuthServices ) {
    }

    ngOnInit() {
    }

    onSubmit(form: NgForm) {
        this.auth.login({
            email: form.value.email,
            password: form.value.password
        });
    }

    checkIfPending() {
        // go to db and check if there are any documents of this user with pending array in it
        // worj with pendingg service
    }


    public socialSignIn(socialPlatform: string) {
        let socialPlatformProvider;
        if (socialPlatform === 'facebook') {
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        } else if (socialPlatform === 'google') {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }

        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {
                this.auth.setUser(userData);
              this.auth.authSuccessfully();
                console.log(socialPlatform + ' sign in data : ', userData);
                // Now sign-in with userData
            }
        );
    }
}
// login with facebook first step

// <script>
//   window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '{your-app-id}',
//       cookie     : true,
//       xfbml      : true,
//       version    : '{api-version}' //v3.2
//     });

//     FB.AppEvents.logPageView();

//   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "https://connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));
// </script>
