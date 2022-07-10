import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioMedicoComponent } from './calendario-medico.component';

describe('CalendarioMedicoComponent', () => {
  let component: CalendarioMedicoComponent;
  let fixture: ComponentFixture<CalendarioMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
