import { Component } from '@angular/core';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { LdWidgetComponent } from '../ld-widget/ld-widget.component';


/**
 * WidgetComponent
 * This is a Smart Component. It handles router input and errors for errors.
 */
@Component({
  standalone: true,
  imports: [RouterModule, LdWidgetComponent],
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent {

  error: string | null = null;

  sparqlQuery = '';
  endpoint = '';
  buttonLabel: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.error = null;
      this.endpoint = params.get('e') ?? '';
      this.sparqlQuery = params.get('q') ?? '';
      this.buttonLabel = params.get('b') ?? null;
      if (this.endpoint.length < 1 || this.sparqlQuery.length < 1) {
        this.error = `Not enough information to proceed: ${this.endpoint.length === 0 ? '\nendpoint missing' : ''} ${this.sparqlQuery.length === 0 ? '\nsparql query missing' : ''}`;
      }
    });
  }
}
