import { createAction, props } from '@ngrx/store';
import { UserDetail } from 'src/app/common/model/user-detail.model';

export const loadUserDetails = createAction(
    '[Authenticated Page Page] Load User Details',
    props<{ uid: string }>()
);

export const loadUserDetailsSuccess = createAction(
    '[Firestore Service] Load User Details Success',
    props<{ userDetail: UserDetail }>()
  );
  
export const loadUserDetailsFailure = createAction(
    '[Todo API] Load User Details Load Failure',
    props<{ error: string }>()
  );

export const updateUserDetails = createAction(
  '[Profile/ Reg Page] Update User Details',
  props<{ userDetail: UserDetail }>()
);

export const updateUserDetailsSuccess = createAction(
  '[Firestore Service] Update User Details Success'
);

export const updateUserDetailsFailure = createAction(
  '[Firestore Service] Update User Details Failure',
  props<{ error: string }>()
);