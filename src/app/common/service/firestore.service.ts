import { Injectable, inject } from '@angular/core';
import { Firestore, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';
import {Observable} from "rxjs";
import { UserDetail } from 'src/app/common/model/user-detail.model';

const USER_COLLECTION = 'users';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private readonly firestore: Firestore = inject(Firestore);

  saveUser(user: UserDetail) {
     return setDoc(doc(this.firestore, USER_COLLECTION, user.uid!), user);
  }

  updateUser(user: UserDetail) {
    return updateDoc(doc(this.firestore, USER_COLLECTION, user.uid!), {
      dateOfBirth: user.dateOfBirth,
      hasCompletedRegistration: user.hasCompletedRegistration,
      name: user.name,
      profileImageUrl: user.profileImageUrl,
      surname: user.surname,
      uid: user.uid
    });
 }
 
  userInfo(uuid: string) {
    return docData(doc(this.firestore, 'users/' + uuid)) as Observable<UserDetail>;
  }
}

