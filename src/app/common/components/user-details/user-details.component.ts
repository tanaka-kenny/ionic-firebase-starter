import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BackgroundComponent} from '../background/background.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {DatePipe, NgIf, TitleCasePipe} from '@angular/common';
import { UserDetail } from 'src/app/common/model/user-detail.model';
import {Observable} from "rxjs";
import { PhotoService } from 'src/app/common/service/photo.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  imports: [
    BackgroundComponent,
    FormsModule,
    IonicModule,
    NgIf,
    ReactiveFormsModule,
    TitleCasePipe,
    DatePipe
  ],
  standalone: true
})
export class UserDetailsComponent {
  @Input()
  headerText = '';
  @Input()
  saveButtonText = '';
  @Input()
  user!: Observable<UserDetail>;
  @Output()
  saveDetails = new EventEmitter<UserDetail>();
  uid!: string;
  isModalOpen = false;
  dateOfBirth: Date | undefined;
  today = new Date().toISOString();
  formGroup: FormGroup;

  constructor(
    private photoService: PhotoService) {
    this.formGroup = this.createForm();
  }

  ngOnInit() {
    this.user?.subscribe(user => {
      this.uid = user.uid!;

      this.setFormWithExistingUserState(user);

      if (user.dateOfBirth) {
        this.dateOfBirth = new Date(user.dateOfBirth);
      }

    });
  }

  selectImage() {
    this.photoService.takePhoto()
      .then(photo => {
        this.profilePhotoUrlControl?.patchValue(photo.dataUrl)
      })
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setDateOfBirth(date: any) {
      this.dateOfBirth = new Date(date.detail.value);
      this.formGroup.patchValue({
        dateOfBirth: this.dateOfBirth
      });
  }

  async saveUserDetails() {
    const user: UserDetail = {
      uid: this.uid,
      name: this.formValue.name,
      surname: this.formValue.surname,
      profileImageUrl: this.formValue.profilePhoto,
      dateOfBirth: this.dateOfBirth?.toString(),
      hasCompletedRegistration: true
    }

    this.saveDetails.emit(user)
  }



  get profilePhotoUrlControl() {
    return this.formGroup.get('profilePhoto');
  }

  private get formValue() {
    return this.formGroup.value;
  }

  private createForm() {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      profilePhoto: new FormControl('')
    });
  }

  private setFormWithExistingUserState(user: UserDetail) {
    this.formGroup.get('name')?.patchValue(user.name)
    this.formGroup.get('surname')?.patchValue(user.surname)
    this.formGroup.get('profilePhoto')?.patchValue(user.profileImageUrl)

    if (user.dateOfBirth) {
      this.formGroup.get('dateOfBirth')?.patchValue(user.dateOfBirth)
      this.dateOfBirth = new Date(user.dateOfBirth);
    }
  }
}
