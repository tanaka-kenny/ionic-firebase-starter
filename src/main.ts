import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withComponentInputBinding } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideStorage, getStorage, connectStorageEmulator } from '@angular/fire/storage';
import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

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
  ],
});

defineCustomElements(window);
