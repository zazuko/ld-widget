import { Component } from '@angular/core';
import { bootstrapApplication,  } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    RouterOutlet
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}

bootstrapApplication(AppComponent);
