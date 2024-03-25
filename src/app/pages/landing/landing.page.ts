import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BackgroundComponent } from 'src/app/common/components/background/background.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, BackgroundComponent]
})
export class LandingPage implements OnInit {
  timeleft = 2;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.redirect();
  }

  private redirect() {
    let downloadTimer = setInterval(() => {
      if(this.timeleft === 1){
        clearInterval(downloadTimer);
        this.router.navigate(['authenticated', 'home']);
      }
      this.timeleft -= 1;
    }, 1000);
  }

}
