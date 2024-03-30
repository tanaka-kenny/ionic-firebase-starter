# Ionic and Firebase Starter

## About
An Ionic and Firebase starter project with these features
* Authentication
* Profile

Each feature is independent, thus can be removed without effect if not needed.

### Techstack
This project is built with *Ionic/Angular and AngularFire (Auth, Firestore, Storage)*

### Enviroment setup
- Run ```nvm use```, to get use the right node version.
- Run ```npm install``` to install the require packages.
- Install Ionic CLI with ```npm i -g @ionic/cli@7.1.1```
- Install Firebase tools with ```npm i -g firebase-tools`@11.22.0```

### Resources
- [Ionic docs](https://ionicframework.com/docs/)
- [Angular 16 Docs](https://angular.io/docs)
- [AngularFire Docs](https://github.com/angular/angularfire)
- [Firebase Docs](https://firebase.google.com/docs/build)

## Firebase Setup
- Replace the ```firebase``` variable with your firebase config.

### Android
- Delete ```android``` folder.
- Replace the ```appId``` and ```appName``` inside ```capacitor.config.ts```.
- Add ```android``` folder again using ```npx cap add android```.
- Download ```google-services.json``` from Firebase and add it to ```android/app```.
- Add the following to ```android/app/build.gradle```: 
```
dependencies {
    // Omitted code 

    implementation(platform("com.google.firebase:firebase-bom:32.7.4"))
    implementation("com.google.firebase:firebase-auth")
    implementation("com.google.android.gms:play-services-auth:20.5.0")
}
```
