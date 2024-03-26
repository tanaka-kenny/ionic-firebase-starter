import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { FirestoreService } from 'src/app/common/service/firestore.service';
import { AuthService } from 'src/app/common/service/auth.service';
import { switchMap } from 'rxjs';
import { UserDetail } from 'src/app/common/model/user-detail.model';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.page.html',
  styleUrls: ['./authenticated.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule]
})
export class AuthenticatedPage implements OnInit {
  user!: UserDetail;

  menuOptions: { option: string, url: string }[];

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private router: Router) {
    this.menuOptions = [
      { option: 'Profile', url: 'profile/options'}
    ];
  }

  ngOnInit(): void {
    this.authService.currentUserObservable$
    .pipe(switchMap(
      currentUser => this.firestoreService.userInfo(currentUser!.uid)))
    .subscribe(user => {
      this.user = user
      user.profileImageUrl = user.profileImageUrl

    });
  }

  onTapOption(url: string) {
    this.router.navigateByUrl(url)
  }

}
