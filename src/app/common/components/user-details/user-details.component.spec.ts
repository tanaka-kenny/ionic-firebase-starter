import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserDetailsComponent } from './user-details.component';
import {FireStorageService} from "../../service/fire-storage.service";

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async () => {
    const fireStorageServiceSpy = jasmine.createSpyObj('FireStorageService', ['']);
    await TestBed.configureTestingModule({
      providers: [
        {provide: FireStorageService, useValue: fireStorageServiceSpy}
      ]
    }).compileComponents()
  })

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
