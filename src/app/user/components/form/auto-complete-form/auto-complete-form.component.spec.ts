import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteFormComponent } from './auto-complete-form.component';

describe('AutoCompleteFormComponent', () => {
  let component: AutoCompleteFormComponent;
  let fixture: ComponentFixture<AutoCompleteFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoCompleteFormComponent]
    });
    fixture = TestBed.createComponent(AutoCompleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
