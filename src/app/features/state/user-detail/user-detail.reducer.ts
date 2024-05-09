import { createReducer, on } from "@ngrx/store";
import { UserDetail } from "src/app/common/model/user-detail.model";
import { loadUserDetails, loadUserDetailsFailure, loadUserDetailsSuccess, updateUserDetails, updateUserDetailsFailure, updateUserDetailsSuccess } from "./user-detail.action";

export interface UserDetailState {
    userDetail: UserDetail;
    error: string;
    status: 'pending' | 'loading' | 'error' | 'success'
}

const initialState: UserDetailState = {
    userDetail: { uid: '' },
    error: '',
    status: 'pending'
};

export const userDetailReducer = createReducer(
    initialState,
    on(loadUserDetails, (state) => ({...state, status: <const> 'loading' })),
    on(loadUserDetailsSuccess, (state, { userDetail }) =>({ 
        ...state, 
        userDetail: userDetail, 
        error: '', 
        status: <const>'success'
    })
    ),
    on(loadUserDetailsFailure, (state, { error }) => ({...state, error: error})),
    on(updateUserDetails, (state) => ({...state, status: <const> 'loading'})),
    on(updateUserDetailsSuccess, (state, userDetail) =>({ ...state, status: <const>'success'})),
    on(updateUserDetailsFailure, (state, { error }) => ({...state, error: error}))
);