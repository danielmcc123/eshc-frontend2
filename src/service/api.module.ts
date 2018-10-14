import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Configuration } from './configuration';

import { ActionPointEndpointService } from './api/actionPointEndpoint.service';
import { MemberEndpointService } from './api/memberEndpoint.service';
import { NoteEndpointService } from './api/noteEndpoint.service';
import { TaskEndpointService } from './api/taskEndpoint.service';
import { WorkingGroupEndpointService } from './api/workingGroupEndpoint.service';

@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [],
  exports:      [],
  providers: [
    ActionPointEndpointService,
    MemberEndpointService,
    NoteEndpointService,
    TaskEndpointService,
    WorkingGroupEndpointService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        }
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import your base AppModule only.');
        }
    }
}
