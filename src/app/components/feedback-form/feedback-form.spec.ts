import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackForm } from './feedback-form';

describe('FeedbackForm', () => {
  let component: FeedbackForm;
  let fixture: ComponentFixture<FeedbackForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedbackForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
