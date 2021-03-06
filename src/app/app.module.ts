import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {ActionPointEndpointService, CommentEndpointService, TaskEndpointService, WorkingGroupEndpointService} from 'service';
import { HttpClientModule } from '@angular/common/http';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import { initializer } from '../utils/app-init';
import { SafePipe } from '../pipes/youtube';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    KeycloakAngularModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    SafePipe
  ],
  providers: [WorkingGroupEndpointService,
      ActionPointEndpointService,
      CommentEndpointService,
      TaskEndpointService,
      {
          provide: APP_INITIALIZER,
          useFactory: initializer,
          multi: true,
          deps: [KeycloakService]
      },
      SafePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
