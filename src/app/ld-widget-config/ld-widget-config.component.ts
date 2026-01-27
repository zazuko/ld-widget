import { Component, OnChanges, OnInit, input, SimpleChanges, linkedSignal, computed, inject, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-ld-widget-config',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './ld-widget-config.component.html',
  styleUrls: ['./ld-widget-config.component.scss']
})
export class LdWidgetConfigComponent implements OnInit, OnChanges {
  query = input('');
  endpoint = input('');
  buttonLabel = input('');

  queryValue = linkedSignal(this.query);
  endpointValue = linkedSignal(this.endpoint);
  buttonLabelValue = linkedSignal(this.buttonLabel);


  ldWidgetUrl = window.location.href.split('?')[0]?.replace('config', '') ?? '';

  sampleQuery = SAMPLE_SPARQL_QUERY;
  sampleEndpoint = SAMPLE_ENDPOINT;
  sampleValues = SAMPLE_VALUES;

  formControlNames: string[] = [];

  #destroyRef = inject(DestroyRef);

  widgetConfigForm = new FormGroup({
    endpoint: new FormControl<string>(this.endpointValue(), Validators.required),
    query: new FormControl<string>(this.queryValue(), Validators.required),
    buttonLabel: new FormControl<string>(this.buttonLabelValue()),
  });

  constructor() {
  }


  ngOnInit(): void {
    this.widgetConfigForm.valueChanges.pipe(
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe(fromValues => {
      const endpoint = fromValues.endpoint ?? '';
      const query = fromValues.query ?? '';
      const buttonLabel = fromValues.buttonLabel ?? '';
      this.endpointValue.set(endpoint.trim());
      this.queryValue.set(query.trim());
      this.buttonLabelValue.set(buttonLabel.trim());
    })
  }

  computedLink = computed<string>(() => {
    if (!this.computedIsLinkValid()) {
      return '';
    }

    const buttonLabel = this.buttonLabelValue().length > 0 ? `&b=${encodeURIComponent(this.buttonLabelValue())}` : '';

    return `${this.ldWidgetUrl}?e=${encodeURIComponent(this.endpointValue())}&q=${encodeURIComponent(this.queryValue())}${buttonLabel}`;
  });


  computedIsLinkValid = computed<boolean>(() => {
    const endpointError = this.endpointErrorMessage();
    const queryError = this.queryErrorMessage();
    if (endpointError.length > 0) {
      return false;
    }
    if (queryError.length > 0) {
      return false;
    }
    return true;
  });


  endpointErrorMessage = computed<string>(() => {
    const endpoint = this.endpointValue();
    if (endpoint.length === 0) {
      return 'Endpoint is required';
    }

    try {
      const url = new URL(endpoint);
      if (url.protocol === "http:" || url.protocol === "https:") {
        return '';
      }
      return 'Endpoint must be a valid HTTP(s) URL';
    } catch (_) {
      return 'Endpoint must be a valid URL';
    }
  });

  queryErrorMessage = computed<string>(() => {
    const query = this.queryValue();
    if (query.length === 0) {
      return 'SPARQL Query is required';
    }
    if (!query.includes('?varBind')) {
      return 'SPARQL Query must contain the ?varBind variable in a VALUES clause';
    }
    return '';
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['query']?.currentValue) {
      this.queryValue.set(changes['query']?.currentValue.trim());
      this.widgetConfigForm.get('query')?.setValue(this.queryValue());
    }
    if (changes['endpoint']?.currentValue) {
      this.endpointValue.set(changes['endpoint']?.currentValue.trim());
      this.widgetConfigForm.get('endpoint')?.setValue(this.endpointValue());
    }
    if (changes['buttonLabel']?.currentValue) {
      this.buttonLabelValue.set(changes['buttonLabel']?.currentValue.trim());
      this.widgetConfigForm.get('buttonLabel')?.setValue(this.buttonLabelValue());
    }
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