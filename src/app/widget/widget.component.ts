import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LdWidgetComponent } from '../ld-widget/ld-widget.component';


/**
 * WidgetComponent
 * This is a Smart Component. It handles router input and errors for errors.
 */
@Component({
  standalone: true,
  imports: [RouterModule, NgIf, LdWidgetComponent],
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent {

  error: string | null = null;
  sparqlTemplate = `
    PREFIX schema: <http://schema.org/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  
    SELECT $prefix ?result $suffix
    WHERE {
    ?canton a <https://schema.ld.admin.ch/Canton> ;
            schema:alternateName ?var;
            schema:name ?result .
      FILTER(langMatches(lang(?result), 'de'))
    }
  
    `;
  prefix = 'Kanton';
  suffix = 'cool';
  endpoint = 'https://lindas.admin.ch/query';
  targetClass = '';


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.error = null;
      this.endpoint = params.get('endpoint') ?? '';
      this.prefix = params.get('prefix') ?? '';
      this.suffix = params.get('suffix') ?? '';
      this.targetClass = params.get('targetClass') ?? '';

      if (this.endpoint.length < 1 || this.targetClass.length < 1) {
        this.error = `Not enough information to proceed: ${this.endpoint.length === 0 ? '\nendpoint missing' : ''} ${this.targetClass.length === 0 ? '\ntargetClass missing' : ''}`;
      }
    });
  }
}
