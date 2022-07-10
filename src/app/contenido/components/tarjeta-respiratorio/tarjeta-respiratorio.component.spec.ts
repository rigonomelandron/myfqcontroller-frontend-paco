import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaRespiratorioComponent } from './tarjeta-respiratorio.component';

describe('TarjetaRespiratorioComponent', () => {
  let component: TarjetaRespiratorioComponent;
  let fixture: ComponentFixture<TarjetaRespiratorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaRespiratorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaRespiratorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
