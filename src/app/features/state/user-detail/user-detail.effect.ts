import { Injectable, inject } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { FirestoreService } from "src/app/common/service/firestore.service";
import { loadUserDetails, loadUserDetailsFailure, loadUserDetailsSuccess } from "./user-detail.action";
import { catchError, exhaustMap, map, of } from "rxjs";

@Injectable()
export class UserDetailEffects {

    private actions$ = inject(Actions);
    private firestoreService = inject(FirestoreService);

    loadUserDetails$ = this.actions$.pipe(
        ofType(loadUserDetails),
        exhaustMap(() => this.firestoreService.userInfo('')
            .pipe(
                map(userDetails => loadUserDetailsSuccess({ userDetails })),
                catchError((error) => of(loadUserDetailsFailure({ error })))
            )
        )
    )


}