import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { filter, Subject, takeUntil } from 'rxjs';
import { UrlSegment } from '@angular/router';
import { isNgContainer } from '@angular/compiler';

@Component({
  selector: 'app-ld-widget-config',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, NgIf, NgFor],
  templateUrl: './ld-widget-config.component.html',
  styleUrls: ['./ld-widget-config.component.scss']
})
export class LdWidgetConfigComponent implements OnInit, OnDestroy, OnChanges {
  @Input() query = '';
  @Input() endpoint = '';

  ldWidgetUrl = window.location.href.split('?')[0]?.replace('config', '') ?? '';
  link = '';
  isLinkValid = false;
  sampleQuery = SAMPLE_SPARQL_QUERY;
  sampleEndpoint = SAMPLE_ENDPOINT;
  sampleValues = SAMPLE_VALUES;

  formControlNames: string[] = [];

  private destroy$ = new Subject<void>();

  public widgetConfigForm = new FormGroup({
    endpoint: new FormControl<string>(this.endpoint, Validators.required),
    query: new FormControl<string>(this.query, Validators.required),
  });

  constructor() {
  }


  ngOnInit(): void {
    this.widgetConfigForm.valueChanges.pipe(
      takeUntil(this.destroy$)).subscribe(fromValues => {
        const endpoint = fromValues.endpoint ?? '';
        const query = fromValues.query ?? '';
        this._createLinkIfValid(endpoint, query);
      })
  }

  private _createLinkIfValid(endpoint: string, query: string) {
    this.isLinkValid = this._checkIfLinkValid(endpoint, query);
    if (this.isLinkValid) {
      this.link = `${this.ldWidgetUrl}?e=${encodeURIComponent(endpoint)}&q=${encodeURIComponent(query)}`;
    } else {
      this.link = '';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['query']?.currentValue) {
      this.query = changes['query']?.currentValue.trim();
      this.widgetConfigForm.get('query')?.setValue(this.query);
    }
    if (changes['endpoint']?.currentValue) {
      this.endpoint = changes['endpoint'].currentValue.trim();
      this.widgetConfigForm.get('endpoint')?.setValue(this.endpoint);
    }
    this._createLinkIfValid(this.endpoint, this.query);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }



  private _checkIfLinkValid(endpoint: string, query: string): boolean {
    return (this._checkEndpoint(endpoint) && this._checkQuery(query));
  }

  private _checkEndpoint(endpoint: string): boolean {
    let url;
    try {
      url = new URL(endpoint);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }


  private _checkQuery(query: string): boolean {
    return query.includes('?varBind');
  }
}

const SAMPLE_ENDPOINT = 'https://ld.zazuko.com/query/';
const SAMPLE_SPARQL_QUERY = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
SELECT ?resultString FROM <https://lindas.admin.ch/fsvo/rabies> WHERE {
  ?s <https://agriculture.ld.admin.ch/foen/rabies/identifier> ?varBind;
     <https://agriculture.ld.admin.ch/foen/rabies/quantitativeresult> ?value ;
     <https://agriculture.ld.admin.ch/foen/rabies/result> ?result ;
     <https://agriculture.ld.admin.ch/foen/rabies/date> ?date;
     <https://agriculture.ld.admin.ch/foen/rabies/unitcode> ?unit .
     BIND ( IF ( ?result = <https://agriculture.ld.admin.ch/foen/rabies/dimension/result/positiv>, "Positive", "Negative" ) AS ?v )
     BIND(CONCAT(?v, " | ",  "Quantitative Result: ", str(?value), " ", ?unit, " | ", str(?date))  AS ?resultString ) 
} ORDER BY ?date LIMIT 1
`;

const SAMPLE_VALUES = `VALUES ?varBind { '990000002998969' }`;