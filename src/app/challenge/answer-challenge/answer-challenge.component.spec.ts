import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerChallengeComponent } from './answer-challenge.component';

describe('AnswerChallengeComponent', () => {
  let component: AnswerChallengeComponent;
  let fixture: ComponentFixture<AnswerChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
