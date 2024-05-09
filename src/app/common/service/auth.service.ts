import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  user, User, signInWithCredential, signOut, reauthenticateWithCredential, EmailAuthProvider,
   updatePassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {Observable, map, switchMap, take} from 'rxjs';
import { NotificationService } from './notification.service';
import {FirestoreService} from './firestore.service';
import { UserDetail } from '../model/user-detail.model';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { Storage } from '@ionic/storage-angular';

const UID_KEY = 'uuid'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);
  private router = inject(Router);
  private alertService = inject(NotificationService)
  private firestoreService = inject(FirestoreService);
  private notificationService = inject(NotificationService);
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public googleAuth() {

    FirebaseAuthentication.signInWithGoogle()
      .then((result) => {
        const idToken = result.credential?.idToken;
        const credential = GoogleAuthProvider.credential(idToken);

        signInWithCredential(this.auth, credential)
        .then((authUser) => {

        const {user} = authUser;
        this._storage?.set(UID_KEY, user.uid);

        if (result.additionalUserInfo?.isNewUser) {
          let userObject = this.constructUserFromAuthUser(user);

          this.firestoreService.saveUser(userObject);
          this.router.navigate(['register']);
        } else {
          // If user found, check registration status and route accordingly
          this.firestoreService.userInfo(user?.uid!)
            .pipe(take(1)).subscribe(savedUser => {
              if (savedUser && savedUser.hasCompletedRegistration) {
                this.router.navigate(['authenticated', 'home']);
              } else {
                this.router.navigate(['register']);
              }
            })
        }
         })
          .catch(error => {
            console.log(error.message);
          })
      }).catch(err => console.log(err)
      )
  }
  emailAndPasswordAuth(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        this._storage?.set(UID_KEY, result.user.uid);
        this.firestoreService.userInfo(result.user.uid).pipe(take(1)).subscribe(user => {
          if (user && user.hasCompletedRegistration) {
            this.router.navigate(['authenticated', 'home']);
          } else {
            this.router.navigate(['register']);
          }
        })
      }).catch(() => {
        this.alertService.presentToast(
          'middle',
          'Please enter valid login details!',
          'toast-class-error');
      })
  }

  emailAndPasswordRegistration(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.currentUserObservable$.subscribe(user => {
          if (user) {
            const userObject = this.constructUserFromAuthUser(user);
            this.firestoreService.saveUser(userObject);
            this.router.navigate(['register'])
          }
        });
      }).catch(error => {
        if ( error.code === 'auth/email-already-in-use') {
          this.alertService.presentToast(
            'middle',
            'The email you provided is already in use!',
            'toast-class-error');
        } else if ( error.code === 'auth/weak-password') {
          this.alertService.presentToast(
            'middle',
            'Please enter a password with at least 6 characters!',
            'toast-class-error');
        }
      })
  }

  public signOut() {
    this._storage?.remove(UID_KEY);

    FirebaseAuthentication.signOut()
      .then(() => {
        signOut(this.auth);
        this.router.navigate(['login'])
      });
  }

  public changePassword(oldPassword: string, newPassword: string) {
    const user = this.auth.currentUser;
    
    if (user) {
      const credential = EmailAuthProvider.credential(user.email!, oldPassword);
      reauthenticateWithCredential(user, credential)
        .then(() => {
          console.log('Successfully re-authenticated user, now updating the password!');

          updatePassword(user, newPassword)
            .then(() => {
              console.log('Successfully updated the user password')
              this.notificationService.presentToast('top', 'You have sucessfully update your password!', 'toast-class-error')
            })
          
        }).catch(error => {
          if (error.code == 'auth/invalid-login-credentials') {
            this.notificationService.presentToast('top', 'Please enter a valid password!')
          }
        })
    }
  }

  get currentUserObservable$() { // todo: use savedUserObservable instead
    return user(this.auth);
  }

  getUid() {
    return this._storage?.get(UID_KEY);
  }

  get savedUserObservable$(): Observable<UserDetail>{ // TODO: Chat to Migal about using ngrx for this
    return this.currentUserObservable$.pipe(switchMap(user => {
      return this.firestoreService.userInfo(user?.uid!)
    }));
  }

  private constructUserFromAuthUser(user: User): UserDetail {
    return {
      uid: user.uid,
      email: user.email ? user.email : '',
      name: user.displayName ? user.displayName?.split(' ')[0] : '',
      surname: user.displayName ? user.displayName?.split(' ')[1] : '',
      profileImageUrl: user.photoURL ? user.photoURL : '',
      hasCompletedRegistration: false
    }
  }
}
