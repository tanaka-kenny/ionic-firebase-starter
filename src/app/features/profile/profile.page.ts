import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import { BackgroundComponent } from 'src/app/common/components/background/background.component';
import { UserDetailsComponent } from 'src/app/common/components/user-details/user-details.component';
import { UserDetail } from 'src/app/common/model/user-detail.model';
import { FirestoreService } from 'src/app/common/service/firestore.service';
import { AuthService } from 'src/app/common/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, BackgroundComponent, UserDetailsComponent]
})
export class ProfilePage implements OnInit{
  user!: Observable<UserDetail>;

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.authService.savedUserObservable$;
  }

  updateProfile(user: UserDetail) {
    this.firestoreService.saveUser(user)
      .then(() => this.router.navigate(['authenticated', 'home']));
  }
}
