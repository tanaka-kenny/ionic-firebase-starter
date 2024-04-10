import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";


export const selectUserDetailFeatureState = (state: AppState) => state.userDetailsState;

export const selectUserDetail = createSelector(
    selectUserDetailFeatureState, 
    (state) => state.userDetail
);