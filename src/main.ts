import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {PWNLoggerModule} from './app/logger.module';


platformBrowserDynamic().bootstrapModule(PWNLoggerModule)
  .catch(err => console.log(err));
