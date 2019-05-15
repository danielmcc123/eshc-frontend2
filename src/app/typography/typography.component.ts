import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  rocket;

  constructor(domsanatizer: DomSanitizer) {
    this.rocket = domsanatizer.bypassSecurityTrustResourceUrl('http://localhost:3000/channel/general')
  }

  ngOnInit() {
  }

}
