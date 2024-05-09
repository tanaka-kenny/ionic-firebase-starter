import {Component} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import { BackgroundComponent } from '../../../../common/components/background/background.component';
import { FirestoreService } from 'src/app/common/service/firestore.service';
import {UserDetailsComponent} from '../../../../common/components/user-details/user-details.component';
import {Observable} from "rxjs";
import { UserDetail } from 'src/app/common/model/user-detail.model';
import { AppState } from 'src/app/features/state/app.state';
import { Store } from '@ngrx/store';
import { selectUserDetail } from 'src/app/features/state/user-detail/user-detail.selector';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, RouterModule, BackgroundComponent, UserDetailsComponent]
})
export class RegisterComponent {
  user$: Observable<UserDetail>;

  constructor(
    private firestoreService: FirestoreService,
    private router: Router,
    store: Store<AppState>) {
      this.user$ = store.select(selectUserDetail);
  }

  saveUser(user: UserDetail) {
    // TODO: Use ngrx store to update user details
    this.firestoreService.updateUser(user)
      .then(() => this.router.navigate(['authenticated', 'home']));
  }
}
