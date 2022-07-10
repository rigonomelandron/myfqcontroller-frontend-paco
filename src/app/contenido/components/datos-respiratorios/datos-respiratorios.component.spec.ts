import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosRespiratoriosComponent } from './datos-respiratorios.component';

describe('DatosRespiratoriosComponent', () => {
  let component: DatosRespiratoriosComponent;
  let fixture: ComponentFixture<DatosRespiratoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosRespiratoriosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosRespiratoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
