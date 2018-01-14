# PWNLogger

PWNLogger is a logging module for Angular(v5) project. It Provides following features.

  - Browser console logging
  - Server Logging
  - To enable logging only to a dedicated user 
  - Option to control logging level

## Usage
Install the package using below command
```sh
$ npm install PWNlogger --save
```
Import Angular Logger module to the main module(For e.g., AppModule)
```sh
import {LoggerModule} from './logger.module';
```
Pass configuration to initialize logger module
```sh
@NgModule ({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, LoggerModule.forRoot ({
      serverLoggingUrl: 'http://serveraddress/modulename/v1/log',
      serverLogLevel: 'OFF',
      consoleLogLevel: 'ALL',
      httpParams: {
        'client_id': 'xxxxxxxxxxxxxxxxxxxxxx',
        'client_secret': 'xxxxxxxxxxxxxxxxxxxxxx',
        'Authorization': 'Bearer xxxxxxxxxxxxxxxxxxxxxx'
      },
      userParams: sessionStorage.getItem ('USER_LOG')
    })
    , HttpModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

## Usage

Import logger in your typescript files and call one of the logging method

```sh
import {Component} from '@angular/core';
import {RossLogger} from './logger.service';

@Component ({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})

export class AppComponent {
  title = 'app';
  constructor(private logger: RossLogger) {
    this.logger.fatal ('This is a priority level 1 FATAL message...');
    this.logger.error ('This is a priority level 2 ERROR message...');
    this.logger.warn ('This is a priority level 3 WARNING message...');
    this.logger.log ('This is a priority level 4 LOG message...');
    this.logger.info ('This is a priority level 5 INFO message...');
    this.logger.debug ('This is a priority level 6 DEBUG message...');
    this.logger.trace ('This is a priority level 7 TRACE message...');
  };
}
```

## Dependencies
Following dependencies are needed for logger module
  - @angular/common
  - @angular/core
  - @angular/http

## Configuration Option

| Param Name | Allowed Values | Description |
| ------ | ------ | ------ |
| ConsoleLogLevel | ALL,TRACE,DEBUG,INFO,LOG,WARN,ERROR,FATAL,OFF | Only sends logs to the browser console for the level specified or higher
| ServerLogLevel | ALL,TRACE,DEBUG,INFO,LOG,WARN,ERROR,FATAL,OFF | Only sends logs to the server for the level specified or higher
| ServerLoggingUrl |  |  server URL to POST the log messages
| httpParams |  | Any additional HTTP Header parameter to invoke ServerLoggingUrl
| userParams | ALL,TRACE,DEBUG,INFO,LOG,WARN,ERROR,FATAL,OFF |To enable logging for a dedicated user 

## Enable Logging to a Dedicated User
There may be a situation when a single user will be facing the issue and want to enable additional logging for that user without redeploying the application. userParams parameter makes it possible to enable this.

Add ‘USER_LOG’ as key and value as required log level to debug user issue in Google Chrome session store and refresh the user session in the same browser session 

#### Session Storage
Open developer tools by pressing F12 (or Ctrl + Shift + i) then go to the Application tab in google chrome(storage tab in Firefox). In this tab, section expand session storage. Select your application and add key/value pair.

on OS X use: + ⌘ + i  to open developer tools

##### In Google Chrome
[![N|Solid](
https://programmingwithnaveen.files.wordpress.com/2018/01/2018-01-11_17-47-50.png)](https://programmingwithnaveen.files.wordpress.com/2018/01/2018-01-11_17-47-50.png)

##### In Firefox
[![N|Solid](
https://programmingwithnaveen.files.wordpress.com/2018/01/firefox_sessionstorage.png)](https://programmingwithnaveen.files.wordpress.com/2018/01/firefox_sessionstorage.png)



#### Sample Output Format
[![N|Solid](https://programmingwithnaveen.files.wordpress.com/2018/01/sampleoutput1.png)](https://programmingwithnaveen.files.wordpress.com/2018/01/sampleoutput1.png)

#### Additional Details

##### LogLevel

ALL < TRACE < DEBUG < INFO < LOG < WARN < ERROR < FATAL < OFF

| Log Level |  Description |
| ------ | ------ |
| ALL |  The ALL has the lowest possible rank and is intended to turn on all logging.
| TRACE |  The TRACE Level designates fine-grained informational events than the DEBUG.
| DEBUG |  The DEBUG Level designates fine-grained informational events that are most useful to debug an application.
| INFO |  The INFO level designates informational messages that highlight the progress of the application at coarse-grained level.
| LOG |  The LOG Level designates information message that highlight the progress of the application at the coarse-grained level and to log exception flows.
| WARN |  The WARN level designates potentially harmful situations.
| ERROR | The ERROR level designates error events that might still allow the application to continue running.
| FATAL | The FATAL level designates very severe error events that will presumably lead the application to abort.
| OFF | The OFF has the highest possible rank and is intended to turn off logging.





License
----

MIT

Contact Me
----
For any questions or concern please contact me https://programmingwithnaveen.com/contact/




