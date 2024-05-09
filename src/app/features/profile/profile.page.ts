import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {Router} from "@angular/router";
import { BackgroundComponent } from 'src/app/common/components/background/background.component';
import { UserDetailsComponent } from 'src/app/common/components/user-details/user-details.component';
import { UserDetail } from 'src/app/common/model/user-detail.model';
import { FirestoreService } from 'src/app/common/service/firestore.service';
import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';
import { updateUserDetails } from '../state/user-detail/user-detail.action';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, BackgroundComponent, UserDetailsComponent]
})
export class ProfilePage {

  constructor(
    private firestoreService: FirestoreService,
    private router: Router,
    private store: Store<AppState>) {
  }

  updateProfile(user: UserDetail) {
    this.store.dispatch(updateUserDetails({ userDetail: user }));
    this.router.navigate(['authenticated', 'home']);
  }
}
