import { createReducer, on } from "@ngrx/store";
import { UserDetail } from "src/app/common/model/user-detail.model";
import { loadUserDetails, loadUserDetailsFailure, loadUserDetailsSuccess } from "./user-detail.action";

export interface UserDetailState {
    userDetail: UserDetail;
}

const initialState: UserDetailState = {
    userDetail: { uid: '' }
};

export const userDetailReducer = createReducer(
    initialState,
    on(loadUserDetails, (state) => state),
    on(loadUserDetailsSuccess, (state, { userDetails }) =>({ ...state, userDetail: userDetails })),
    on(loadUserDetailsFailure, (state, { error }) => state)
);