import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartCatalogComponent } from './part-catalog.component';

describe('PartCatalogComponent', () => {
  let component: PartCatalogComponent;
  let fixture: ComponentFixture<PartCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
