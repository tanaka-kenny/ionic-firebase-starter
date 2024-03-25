import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.page.html',
  styleUrls: ['./profile-options.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfileOptionsPage {
  profileOptions: ProfileOption[];

  constructor(private router: Router) { 
    this.profileOptions = [
      { option: 'Edit profile', url: 'profile', icon: 'person-circle-outline'},
      { option: 'Change password', url: '', icon: 'build-outline'}
    ];
  }


  onTapOption(option: ProfileOption) {
    this.router.navigate(['authenticated', option.url]);
  }

}

export interface ProfileOption {
  option: string; 
  url: string; 
  icon?: string;
}
