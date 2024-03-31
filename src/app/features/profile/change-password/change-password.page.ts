import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BackgroundComponent } from 'src/app/common/components/background/background.component';
import { AuthService } from 'src/app/common/service/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, BackgroundComponent, ReactiveFormsModule]
})
export class ChangePasswordPage {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService) { 
      this.formGroup = this.createForm();
    }

  private createForm() {
    return this.formBuilder.group({
      oldPassword: ['',
        [Validators.required, Validators.minLength(6)]
      ],
      password: ['',
        [ Validators.required, Validators.minLength(6)]
      ],
      confirmPassword: ['',
        [Validators.required]
      ]
    },{ validator: this.matchPassword( 'password', 'confirmPassword' ) });
  }

  matchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl)
        return;

      if ( confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch'] )
        return ;

      if (passwordControl.value !== confirmPasswordControl.value)
        confirmPasswordControl.setErrors({ passwordMismatch: true });

      return;
    };
  }

  changePassword() {
      const oldPassword = this.oldPasswordControl?.value as string;
      const newPassword = this.passwordControl?.value as string;
      
      this.authService.changePassword(oldPassword, newPassword);
  }

  get passwordControl() {
    return this.formGroup.get('password');
  }

  get confirmPasswordControl() {
    return this.formGroup.get('confirmPassword');
  }

  get oldPasswordControl() {
    return this.formGroup.get('oldPassword')
  }

}
