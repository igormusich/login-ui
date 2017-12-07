import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-global-footer',
  templateUrl: './global-footer.component.html',
  styleUrls: ['./global-footer.component.css']
})
export class GlobalFooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  securityHref(): string {
    return environment.securityFooterEN;
  }

  legalHref(): string {
    return environment.legalFooterEN;

  }

  accessibilityHref(): string {
    return environment.accessibilityFooterEN;
  }

}
