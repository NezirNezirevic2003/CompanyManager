import { Component, Input } from '@angular/core';
import { LoaderService } from './loader/loader.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
declare const gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @Input()
  bodyText!: string;

  constructor(public loader: LoaderService, private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd));
  }
}
