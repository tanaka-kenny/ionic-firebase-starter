import {Component, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import { BackgroundComponent } from '../../../../common/components/background/background.component';
import { FirestoreService } from 'src/app/common/service/firestore.service';
import {UserDetailsComponent} from '../../../../common/components/user-details/user-details.component';
import {AuthService} from '../../../../common/service/auth.service';
import {Observable, switchMap} from "rxjs";
import { UserDetail } from 'src/app/common/model/user-detail.model';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, RouterModule, BackgroundComponent, UserDetailsComponent]
})
export class RegisterComponent implements OnInit {
  user!: Observable<UserDetail>;

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.user = this.authService.savedUserObservable$;
  }

  saveUser(user: UserDetail) {
    this.firestoreService.updateUser(user)
      .then(() => this.router.navigate(['authenticated', 'home']));
  }
}
