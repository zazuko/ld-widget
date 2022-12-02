import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { filter, Subject, takeUntil } from 'rxjs';
import { UrlSegment } from '@angular/router';

@Component({
  selector: 'app-ld-widget-config',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, NgIf, NgFor],
  templateUrl: './ld-widget-config.component.html',
  styleUrls: ['./ld-widget-config.component.scss']
})
export class LdWidgetConfigComponent implements OnInit, OnDestroy {
  ldWidgetUrl = window.location.href.replace('config', '');
  link = '';
  isLinkValid = false;

  formControlNames: string[] = [];

  private destroy$ = new Subject<void>();



  public widgetConfigForm = new FormGroup({
    endpoint: new FormControl<string>('https://ld.zazuko.com/query', Validators.required),
    query: new FormControl<string>('', Validators.required),
  });

  constructor() {



  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.widgetConfigForm.valueChanges.pipe(
      takeUntil(this.destroy$)).subscribe(fromValues => {
        const endpoint = fromValues.endpoint ?? '';
        const query = fromValues.query ?? '';
        
        this.isLinkValid = this._checkIfLinkValid(endpoint, query)
        if(this.isLinkValid) {
          this.link = `${this.ldWidgetUrl}?e=${encodeURIComponent(endpoint)}&q=${encodeURIComponent(query)}`
        } else {
          this.link = '';
        }
      })
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
