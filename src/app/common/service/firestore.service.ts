import { Injectable, inject } from '@angular/core';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
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

  userInfo(uuid: string) {
    return docData(doc(this.firestore, 'users/' + uuid)) as Observable<UserDetail>;
  }
}

