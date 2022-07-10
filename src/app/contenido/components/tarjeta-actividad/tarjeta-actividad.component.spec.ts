import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaActividadComponent } from './tarjeta-actividad.component';

describe('TarjetaActividadComponent', () => {
  let component: TarjetaActividadComponent;
  let fixture: ComponentFixture<TarjetaActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaActividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
