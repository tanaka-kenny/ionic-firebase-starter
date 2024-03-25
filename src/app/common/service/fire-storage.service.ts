import { Injectable, inject } from '@angular/core';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { AuthService } from './auth.service';
import { Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  private readonly storage: Storage = inject(Storage);
  private readonly authService: AuthService = inject(AuthService);
  private uuid!: string;

  constructor() {
    this.authService.currentUserObservable$.subscribe(user => this.uuid = user!.uid);
  }

  async uploadPhoto(photo: Photo, uid: string) {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    const storageRef = ref(this.storage, `${uid}/profile_img`);

    await uploadBytes(storageRef, blob);

    return storageRef;
  }

  async saveProfilePhoto(photo: Photo, uid: string) {
    const path = this.uploadPhoto(photo, uid);
    return getDownloadURL(await path);
  }
}
