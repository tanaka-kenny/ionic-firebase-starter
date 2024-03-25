import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackgroundComponent } from "../../../../common/components/background/background.component";
import { AuthService } from 'src/app/common/service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, BackgroundComponent, ReactiveFormsModule]
})
export class LoginComponent {
 formGroup!: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router) {
      this.formGroup = this.createForm();
  }
  signInWithGoogle(){
    this.authService.googleAuth();
  }

  onRegister() {
    this.router.navigate(['sign', 'up']);
  }

  loginEmailAndPassword(){

    this.authService.emailAndPasswordAuth(
      this.formGroup.get('email')?.value,
      this.formGroup.get('password')?.value)
  }

  private createForm() {
    return new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

}
