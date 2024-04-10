import { createAction, props } from '@ngrx/store';
import { UserDetail } from 'src/app/common/model/user-detail.model';

export const loadUserDetails = createAction(
    '[Home Page] Load User Details'
);

export const loadUserDetailsSuccess = createAction(
    '[Firestore Service] Load User Details Success',
    props<{ userDetails: UserDetail }>()
  );
  
export const loadUserDetailsFailure = createAction(
    '[Todo API] Load User Details Load Failure',
    props<{ error: string }>()
  );