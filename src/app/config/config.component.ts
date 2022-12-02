import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LdWidgetConfigComponent } from '../ld-widget-config/ld-widget-config.component';

@Component({
  standalone: true,
  imports: [LdWidgetConfigComponent],
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent {

}
