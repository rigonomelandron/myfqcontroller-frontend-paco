import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesMedicoComponent } from './ajustes-medico.component';

describe('AjustesMedicoComponent', () => {
  let component: AjustesMedicoComponent;
  let fixture: ComponentFixture<AjustesMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjustesMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjustesMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
