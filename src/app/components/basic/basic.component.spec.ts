import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { click } from 'src/app/testing.utils';
import { BasicComponent } from './basic.component';

describe('actually testing a component', () => {
  let component: BasicComponent;
  let fixture: ComponentFixture<BasicComponent>;
  let deMessage: DebugElement;
  let elMessage: HTMLElement;
  let deButton: DebugElement;

  beforeEach(() => {

    // create a "fake" module for the component to exist within.
    TestBed.configureTestingModule({
      declarations: [ BasicComponent ]
    }).compileComponents();

    // tell that module to create an instance of that component
    fixture = TestBed.createComponent(BasicComponent);  // app component selector

    // get the instancce of the created component
    component = fixture.componentInstance;
    // console.log(component.message);
    // get a reference to the UI Elements that we need to look at or interact with
    deMessage = fixture.debugElement.query(By.css('[data-basic-message]'));
    elMessage = deMessage.nativeElement;

    deButton = fixture.debugElement.query(By.css('[data-basic-button]'));
    fixture.detectChanges();
    // fixture.autodDetectChanges();
  });

  it('has the right default message', () => {
    expect(elMessage.textContent).toBe('Hello, World!');
  });
  describe('clicking the button changes the message', () => {
    beforeEach(() => {
      // how to click the button?
      // it depends.  Is it a debug element, or an html element.  TODO: fix this.
      click(deButton);
      // deButton.triggerEventHandler('click', {}); // awkward.
      fixture.detectChanges();
    });
    it('should have the correct message', () => {
      expect(elMessage.textContent).toBe('Thanks!');
    });
  });

});

xdescribe('Testing the class directly', () => {
  let component: BasicComponent;

  beforeEach(() => {
    component = new BasicComponent();
  });

  it('should have a default message', () => {
    expect(component.message).toBe('Hello, World!');
  });

  describe('clicking the button', () => {
    beforeEach(() => {
      component.changeMessage();
    });
    it('should change the message', () => {
      expect(component.message).toBe('Thanks!');
    });
  });

});
