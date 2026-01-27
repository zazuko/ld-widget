import { Component, OnInit, signal } from '@angular/core';
import { LdWidgetConfigComponent } from '../ld-widget-config/ld-widget-config.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  imports: [LdWidgetConfigComponent, RouterModule],
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  endpoint = signal('');
  sparqlQuery = signal('');
  buttonLabel = signal('');
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.endpoint.set(params.get('e') ?? '');
      this.sparqlQuery.set(params.get('q') ?? '');
      this.buttonLabel.set(params.get('b') ?? '');
    });
  }




}
