import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FirestoreService } from "src/app/common/service/firestore.service";
import { loadUserDetails, loadUserDetailsFailure, loadUserDetailsSuccess } from "./user-detail.action";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";

@Injectable()
export class UserDetailEffects {

    private actions$ = inject(Actions);
    private firestoreService = inject(FirestoreService);

    loadUserDetails$ = createEffect(() => this.actions$.pipe(
        ofType(loadUserDetails),
        switchMap(({uid}) => this.firestoreService.userInfo(uid)
            .pipe(
                map(userDetail => loadUserDetailsSuccess({ userDetail: userDetail })),
                catchError((error) => of(loadUserDetailsFailure({ error })))
            )
        )
    ));


}