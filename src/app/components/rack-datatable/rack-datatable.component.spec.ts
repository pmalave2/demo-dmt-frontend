import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RackDatatableComponent } from './rack-datatable.component';

describe('RackDatatableComponent', () => {
  let component: RackDatatableComponent;
  let fixture: ComponentFixture<RackDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RackDatatableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RackDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
