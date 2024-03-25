import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticatedPage } from './authenticated.page';
import { provideRouter } from '@angular/router';
import { AuthService } from 'src/app/common/service/auth.service';
import { FirestoreService } from 'src/app/common/service/firestore.service';

describe('AuthenticatedPage', () => {
  let component: AuthenticatedPage;
  let fixture: ComponentFixture<AuthenticatedPage>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['']);
    const firestoreSpy = jasmine.createSpyObj('AuthService', ['']);
    await TestBed.configureTestingModule({
      imports: [AuthenticatedPage],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authSpy},
        { provide: FirestoreService, useValue: firestoreSpy}
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AuthenticatedPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
