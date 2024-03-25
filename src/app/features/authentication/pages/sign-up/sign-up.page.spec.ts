import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SignUpPage } from './sign-up.page';
import { AuthService } from 'src/app/common/service/auth.service';

describe('SignUpPage', () => {
  let component: SignUpPage;
  let fixture: ComponentFixture<SignUpPage>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('StorageService', ['']);
    await TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: authServiceSpy}],
    }).compileComponents();
  });

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(SignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
