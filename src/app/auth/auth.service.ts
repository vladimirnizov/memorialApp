import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class AuthServices {
    authChange = new Subject<boolean>();
    private user;
    private isAuthenticated = false;

    constructor(private router: Router, private afAuth: AngularFireAuth, private snackbar: MatSnackBar) {}

    registerUser(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(
         authData.email,
         authData.password
        ).then(result => {
            this.authSuccessfully();
        })
        .catch(error => {
            this.snackbar.open(error.message, null,  {
                duration: 4000
            });
        });

    }

    getUserEmail(): string {
        const user = this.afAuth.auth.currentUser;
        if (user) {
            return user.email;
        }
    }

    login(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
           ).then(result => {
               this.authSuccessfully();
               // livdok haim yesh records be pending
           })
           .catch(error => {
            this.snackbar.open(error.message, null, {
                duration: 4000
           });
        });
    }

    logout() {
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
    }

    isAuth() {
        return this.isAuthenticated;
    }
    setUser(user) {
        this.user = user;
    }
    getUser() {
        return this.user;
    }

    authSuccessfully() {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/']);
    }
}
