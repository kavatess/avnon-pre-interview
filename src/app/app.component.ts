import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'avnon-pre-interview';

  constructor(private readonly router: Router) {
    this.router.navigate(['form', 'builder']);
  }
}
