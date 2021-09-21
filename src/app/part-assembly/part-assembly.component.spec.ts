import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartAssemblyComponent } from './part-assembly.component';

describe('PartAssemblyComponent', () => {
  let component: PartAssemblyComponent;
  let fixture: ComponentFixture<PartAssemblyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartAssemblyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartAssemblyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
