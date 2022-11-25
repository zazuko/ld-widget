import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LdWidgetComponent } from './ld-widget.component';

describe('LdWidgetComponent', () => {
  let component: LdWidgetComponent;
  let fixture: ComponentFixture<LdWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LdWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LdWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
