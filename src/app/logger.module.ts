import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoggerConfig, PWNLogger} from './logger.services';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, HttpModule
  ],
  exports: [],
  providers: [PWNLogger],
})

export class PWNLoggerModule {
  static forRoot(config: LoggerConfig | null | undefined): ModuleWithProviders {
    return {
      ngModule: PWNLoggerModule,
      providers: [
        {provide: LoggerConfig, useValue: config || {}},
      ]
    };
  }
}
