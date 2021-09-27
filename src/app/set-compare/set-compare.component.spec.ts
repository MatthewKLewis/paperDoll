import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCompareComponent } from './set-compare.component';

describe('SetCompareComponent', () => {
  let component: SetCompareComponent;
  let fixture: ComponentFixture<SetCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetCompareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
