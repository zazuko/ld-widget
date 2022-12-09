import { Component, OnInit } from '@angular/core';
import { LdWidgetConfigComponent } from '../ld-widget-config/ld-widget-config.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [LdWidgetConfigComponent, RouterModule],
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  endpoint = '';
  sparqlQuery = '';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.endpoint = params.get('e') ?? '';
      this.sparqlQuery = params.get('q') ?? '';
    });
  }




}
