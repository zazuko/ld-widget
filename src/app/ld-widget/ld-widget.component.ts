import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { SafeValue } from '@angular/platform-browser';

interface SafeSparqlValue extends SafeValue { }

@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, NgIf, NgFor],
  selector: 'ld-widget',
  templateUrl: './ld-widget.component.html',
  styleUrls: ['ld-widget.component.scss'],
})
export class LdWidgetComponent implements OnChanges {
  @Input() sparqlTemplate = ``;
  @Input() endpoint = '';
  @Input() buttonLabel: string | null = 'Search';
  result: string[] = [];
  error = '';

  constructor(private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['buttonLabel']) {
      this.buttonLabel = changes['buttonLabel'].currentValue ?? 'Search';
    }
  }


  public sparqlVariableForm = new FormGroup({
    variable: new FormControl<string>('', Validators.required),
  });

  public onSubmit(): void {
    if (!this.sparqlVariableForm.valid) {
      return;
    }

    const variable = this._escapeSparql(
      this.sparqlVariableForm.controls['variable'].value ?? ''
    );

    this._executeQuery(variable);
  }

  private _executeQuery(variable: SafeSparqlValue) {
    if (!this.endpoint || this.endpoint.length === 0) {
      console.error('Endpoint is invalid', this.endpoint);
      return;
    }
    if (!this.sparqlTemplate || this.sparqlTemplate.length === 0) {
      console.error('SPARQL Template is invalid', this.sparqlTemplate);
      return;
    }

    const query = `
    ${this.sparqlTemplate}
    ${this.getValues(variable)}
`;

    const body = new HttpParams().set('query', query);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Accept', 'application/sparql-results+json');

    this.error = '';

    this.http
      .post<ResultTable>(this.endpoint, body.toString(), {
        headers,
        observe: 'response',
      })
      .subscribe({
        next: (response) => {
          const contentType = response.headers.get('Content-Type');
          if (!contentType?.startsWith('application/sparql-results+json')) {
            // this can happen because stardog is returning a http 200 ok on sparql error
            this.result = [];
            this.error = JSON.stringify(response, null, 4);
            return;
          }

          const keys = response.body?.head.vars ?? [];

          const table =
            response.body?.results.bindings.map((binding) => {
              const row: string[] = [];
              keys.forEach((key) => {
                row.push(binding[key]?.value ?? '');
              });
              return row;
            }) ?? [];
          this.result = table.map((row) => row.join(' '));
        },
        error: (error) => {
          // this can happen because stardog is returning a http 200 ok on sparql error
          this.result = [];
          this.error = JSON.stringify(error, null, 4);
        }
      }
      );
  }

  getValues(variable: SafeSparqlValue): string {
    return `VALUES ?varBind { '${variable}' }`;
  }

  private _escapeSparql(input: string): SafeSparqlValue {
    return input
      .replace(/[|\\{}()[\]^$+*?.]/g, '\\\\$&')
      .replace(/-/g, '\\\\x2d') as SafeSparqlValue;
  }
}

interface ResultTable {
  head: ResultHead;
  results: Results;
}

interface ResultHead {
  vars: string[];
}

interface Results {
  bindings: Binding[];
}

interface Binding {
  [key: string]: ResultVar;
}

interface ResultVar {
  'xml:lang'?: string;
  type?: string;
  value: string;
}