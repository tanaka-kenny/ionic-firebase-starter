import { enableProdMode, importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withComponentInputBinding } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideStorage, getStorage, connectStorageEmulator } from '@angular/fire/storage';
import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { userDetailReducer } from './app/features/state/user-detail/user-detail.reducer';
import { UserDetailEffects } from './app/features/state/user-detail/user-detail.effect';

import { IonicStorageModule } from '@ionic/storage-angular';
import { provideStoreDevtools } from '@ngrx/store-devtools';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({})),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => {
        const auth = getAuth();
        environment.useEmulators ? connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true }) : '';
        return auth;

      }),
      provideFirestore(() => {
        const firestore = getFirestore();
        environment.useEmulators ? connectFirestoreEmulator(firestore, 'localhost', 8080) : '';
        return firestore
      }),
      provideStorage(() => {
        const storage = getStorage();
        environment.useEmulators ? connectStorageEmulator(storage, 'localhost', 9199) : '';
        return storage
      })
    ),
    provideRouter(routes, withComponentInputBinding()),
    provideStore(),
    provideEffects(UserDetailEffects),
    provideState(
      { name: 'userDetailsState', reducer: userDetailReducer }
    ),
    provideStoreDevtools({
      name: 'DevTools & Debugging in NgRx',
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    importProvidersFrom(IonicStorageModule.forRoot())
  ],
});

defineCustomElements(window);
