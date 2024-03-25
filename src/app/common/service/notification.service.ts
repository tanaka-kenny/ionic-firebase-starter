import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastController: ToastController) { }

  public presentToast(
    position: 'top' | 'middle' | 'bottom', 
    message: string,
    cssClass: string | string[] = 'toast-class') {
    this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      cssClass: cssClass,
      translucent: true
    }).then(toast => toast.present());
  }

}
