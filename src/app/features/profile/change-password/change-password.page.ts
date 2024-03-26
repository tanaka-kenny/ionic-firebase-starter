import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BackgroundComponent } from 'src/app/common/components/background/background.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, BackgroundComponent, ReactiveFormsModule, ]
})
export class ChangePasswordPage implements OnInit {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder) { 
      this.formGroup = this.createForm();
    }

  ngOnInit() {
  }

  private createForm() {
    return this.formBuilder.group({
      oldPasswordControl: ['',
        [Validators.required, Validators.email]
      ],
      password: ['',
        [ Validators.required, Validators.minLength(6)]
      ],
      confirmPassword: ['',
        [Validators.required, Validators.min(6)]
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

  get passwordControl() {
    return this.formGroup.get('password');
  }

  get confirmPasswordControl() {
    return this.formGroup.get('confirmPassword');
  }

  get oldPasswordControl() {
    return this.formGroup.get('oldPasswordControl')
  }

}
