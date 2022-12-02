import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LdWidgetConfigComponent } from './ld-widget-config.component';

describe('LdWidgetConfigComponent', () => {
  let component: LdWidgetConfigComponent;
  let fixture: ComponentFixture<LdWidgetConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LdWidgetConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LdWidgetConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
