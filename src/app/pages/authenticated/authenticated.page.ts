import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/common/service/auth.service';
import { UserDetail } from 'src/app/common/model/user-detail.model';
import { Store } from '@ngrx/store';
import { selectUserDetail } from 'src/app/features/state/user-detail/user-detail.selector';
import { AppState } from 'src/app/features/state/app.state';
import { loadUserDetails } from 'src/app/features/state/user-detail/user-detail.action';
import { Observable } from 'rxjs';

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
  user$: Observable<UserDetail>;

  menuOptions: { option: string, url: string }[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private readonly store: Store<AppState>) {
    this.menuOptions = [
      { option: 'Profile', url: 'profile/options'}
    ];
    
    this.user$ = this.store.select(selectUserDetail);
  }

   ngOnInit(){
    this.authService.getUid()?.then(uid => {
      this.store.dispatch(loadUserDetails({ uid }));
      this.user$.subscribe(user => this.user = user);
    })
  }

  onTapOption(url: string) {
    this.router.navigateByUrl(url)
  }

}
