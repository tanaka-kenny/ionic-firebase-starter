import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";


export const selectUserDetailState = (state: AppState) => state.userDetailsState;

export const selectUserDetail = createSelector(
    selectUserDetailState, 
    (state) => state.userDetail
);