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
  @Input() buttonLabel = '';

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
    buttonLabel: new FormControl<string>(this.buttonLabel),
  });

  constructor() {
  }


  ngOnInit(): void {
    this.widgetConfigForm.valueChanges.pipe(
      takeUntil(this.destroy$)).subscribe(fromValues => {
        const endpoint = fromValues.endpoint ?? '';
        const query = fromValues.query ?? '';
        const buttonLabel = fromValues.buttonLabel ?? '';
        this._createLinkIfValid(endpoint, query, buttonLabel);
      })
  }

  private _createLinkIfValid(endpoint: string, query: string, buttonLabel: string) {
    this.isLinkValid = this._checkIfLinkValid(endpoint, query);
    if (this.isLinkValid) {
      let buttonQueryParam = '';
      debugger
      if (buttonLabel.length > 0) {
        buttonQueryParam = `&b=${encodeURIComponent(buttonLabel)}`;
      }

      this.link = `${this.ldWidgetUrl}?e=${encodeURIComponent(endpoint)}&q=${encodeURIComponent(query)}${buttonQueryParam}`;
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
    this._createLinkIfValid(this.endpoint, this.query, this.buttonLabel);
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
const SAMPLE_ENDPOINT = 'https://lindas.admin.ch/query';
const SAMPLE_SPARQL_QUERY = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
SELECT ?resultString FROM <https://lindas.admin.ch/fsvo/rabies> WHERE {
  ?s <https://agriculture.ld.admin.ch/foen/rabies/dimension/identifier> ?varBind;
  	 <https://agriculture.ld.admin.ch/foen/rabies/dimension/quantitativeresult> ?value ;
     <https://agriculture.ld.admin.ch/foen/rabies/dimension/result> ?result ;
     <https://agriculture.ld.admin.ch/foen/rabies/dimension/date> ?date;
  	 <https://agriculture.ld.admin.ch/foen/rabies/dimension/unitcode> ?unit .
     BIND ( IF ( ?result = <https://agriculture.ld.admin.ch/foen/rabies/dimension/result/positiv>, "Sufficient", "Insufficient" ) AS ?v )
  	 BIND(CONCAT("Microchip number: ",?varBind, " | ", ?v, " | ",  "Quantitative Result: ", str(?value), " ", ?unit, " | Date of blood sampling: ", str(?date))  AS ?resultString ) 
} ORDER BY ?date LIMIT 1
`;

const SAMPLE_VALUES = `VALUES ?varBind { '990000002998969' }`;