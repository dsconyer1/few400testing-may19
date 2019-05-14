import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoginComponent } from 'src/app/components/login/login.component';
import { LoginService } from './login.service';

describe('the login component', () => {
  describe('with a logged in user', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let deMessage: DebugElement;
    let elMessage: HTMLElement;
    let stubbedLoginService: LoginService;

    beforeEach(() => {

      stubbedLoginService = {
        isLoggedIn: true,
        getUserName: () => 'Ben Solo'
      };

      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        providers: [{provide: LoginService, useValue: stubbedLoginService }]
      }).compileComponents();

      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      deMessage = fixture.debugElement.query(By.css('[data-login-message]'));
      elMessage = deMessage.nativeElement;
      fixture.detectChanges();
    });
    it('should display the non-logged in message', () => {
      expect(elMessage.textContent).toBe('Welcome, Ben Solo');
    });
  });
  describe('with a non-logged in user', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let deMessage: DebugElement;
    let elMessage: HTMLElement;
    let stubbedLoginService: LoginService;

    beforeEach(() => {

      stubbedLoginService = {
        isLoggedIn: false,
        getUserName: () => 'Ben Solo'
      };

      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        providers: [{provide: LoginService, useValue: stubbedLoginService }]
      }).compileComponents();

      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      deMessage = fixture.debugElement.query(By.css('[data-login-message]'));
      elMessage = deMessage.nativeElement;
      fixture.detectChanges();
    });
    it('should display the non-logged in message', () => {
      expect(elMessage.textContent).toBe('You are not logged in');
    });
  });
});
