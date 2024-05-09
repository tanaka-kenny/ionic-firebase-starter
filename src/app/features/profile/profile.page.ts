import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {Router} from "@angular/router";
import { BackgroundComponent } from 'src/app/common/components/background/background.component';
import { UserDetailsComponent } from 'src/app/common/components/user-details/user-details.component';
import { UserDetail } from 'src/app/common/model/user-detail.model';
import { FirestoreService } from 'src/app/common/service/firestore.service';

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
    private router: Router) {
  }

  updateProfile(user: UserDetail) {
    // TODO: Use ngrx store to update user details
    this.firestoreService.updateUser(user)
      .then(() => this.router.navigate(['authenticated', 'home']));
  }
}
